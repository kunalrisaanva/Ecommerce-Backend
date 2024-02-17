import {Request , Response, NextFunction} from "express"
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import  { 
    NewUserRequestBody,
    LoginRequestBody,
    
} from "../types/types.js"
// import { uploadMiddleWare } from "../utils/upload.S3Buket.js"
import { cloudinaryUploader } from '../utils/cloudinary.js'
import { CustomRequest } from "../types/types.js"
// import  { mailSender as sendMail }  from '../utils/nodeMailer.js'
// import { fileUpload, fileUpload as uploadFile } from "../utils/uploadS3.js" 
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../models/user.models.js"
import crypto from "crypto"

const genrateAccessTokenAndRefreshToken = async (user_id:string) => {
    try {
        const user = await User.findById(user_id)
        const accessToken = await user!.genrateAccessToken() 
        const refreshToken = await user!.genrateRefreshToken()

        user!.refreshToken = refreshToken

        await user!.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, ' something went wrong while genrating tokens ')
    }
}


const registerUser = asyncHandler( async (
    req:Request<{},{},NewUserRequestBody>, 
    res:Response,
    next:NextFunction
    ) => {  
    const { username , lastName , email , password , gender } = req.body


    if ([username, email, password].some(fields => fields?.trim() === '' || undefined )) {
        throw new ApiError(400, ' All Fields Are Required !! ')
    }

    const existedUser = await User.findOne({
        $or: [
            {
                username,
            },
            {
                email,
            },
        ],
    })

    if (existedUser) {
        throw new ApiError(400, ' User is Already Exists in Db ')
    }
 
    let userImageUrl

    if (req.file && req.file?.path) {
        const userImagePath = req.file.path
        userImageUrl = await cloudinaryUploader(userImagePath)
    }
  
    const createdUser = await User.create({
        username: username?.toLowerCase(),
        lastName: lastName?  lastName.toLowerCase() : "" ,
        email,
        password,
        gender,
        userImage: userImageUrl?.url || '',
    })

    const user = await User.findOne(createdUser?._id).select(
        ' -password -refreshToken'
    )

    if (!user) {
        throw new ApiError(
            500,
            ' Something went wrong while registering a User '
        )
    }

    return res
        .status(200)
        .json(new ApiResponse(201, user, ' User created Successfully '))
})


const logInUser = asyncHandler(async (
    req:Request<{},{},LoginRequestBody>,
    res:Response,
    next:NextFunction
    ) => {
    const { email, username, password, } = req.body
    
    if (!(email || password)) {
        throw new ApiError(400, 'All fields are required ')
    }

    const user = await User.findOne({
        $or: [
            {
                email,
            },
            {
                username,
            },
        ],
    })

    if (!user) {
        throw new ApiError(400, ' This user does not exists')
    }

    const isMatch = await user.comparePassword(password)
    
    if (!isMatch) {
        throw new ApiError(400, ' Invalid User credientals ')
    }

    const { accessToken, refreshToken } =
        await genrateAccessTokenAndRefreshToken(user?.id)

    const loggedInUser = await User.findById(user?._id).select(
        ' -password -refreshToken '
    )

    const cookieOptions = {
        httpOnly: true,
        // secure:true
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, {
                loggedInUser,
                refreshToken,
                accessToken,
            })
        )
})


const logOutUser = asyncHandler(async (
    req:CustomRequest,
    res:Response,
    next:NextFunction
    ) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        { new: true }
    )

    const cookieOptions = {
        httpOnly: true,
    }

    res.status(200)
        .clearCookie('accessToken', cookieOptions)
        .clearCookie('refreshToken', cookieOptions)
        .json(new ApiResponse(200, {},' user logged out '))
})



const refreshToken = asyncHandler(async (req, res) => {
    
    const headers = req.headers as { [key: string]: string | string[] | string | undefined };
    const authorizationHeader = headers['authorization'];
    const incomingRefreshToken = 
    typeof authorizationHeader === 'string' ? authorizationHeader.replace('Bearer', '').trim() : undefined || 
    req.cookies?.refreshToken || req.body?.refreshToken
        
    
    if (!incomingRefreshToken) {
        throw new ApiError(401, ' Unauthorized request ')
    }

    const decodeToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY!
    ) as JwtPayload

    const user = await User.findById(decodeToken?._id);

    if (!user) {
        throw new ApiError(401, ' Invlid RefreshToken ');
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401, ' Refresh Token is Expired or Used ')
    }

    const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(user?.id)

    const newRefreshToken = refreshToken;

    const cookieOptions = {
        httpOnly: true,
        //  secure:true
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', newRefreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                'token has been refreshed '
            )
        )
})


const chageCurrentPassword = asyncHandler( async(
    req:CustomRequest,
    res:Response
    )=>{
  
    const { password , newPassword  } = req.body
  
  
  // edite it later 

    if(!( password === newPassword )){
        throw new ApiError(400," your password does not match ");

    }

    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{
        password:newPassword
        }
    },{new:true}).select(" -password ")


    return res
    .status(200)
    .json(
        new ApiResponse(
        200,
        {
            user
        },
        " Password has been changed "
        )
    )

});




const forgetPassword = asyncHandler( async(req,res)=>{

       const { email } = req.body
    
       const user = await User.findOne({email});

       if(!user){
        throw new ApiError(404)," User not found "
       }
       const resetToken = await user.getResetToken();
       await user.save({validateBeforeSave:false});
       const url = `${process.env.Fronted_Url}/resetPassword/${resetToken}`;
       const message = `Click on the link To Reset Your Password. ${url}. If you have Not Reqested Then Please Ignore `
       // sent token via email
       console.log(user.email)
       let userEmail = user.email
    //    sendMail(userEmail,message);
       
       return res
       .status(200) 
       .json(
        new ApiResponse(
            200,
            {},
            `Reset Token has been sent to ${user.email} `

        )
       )

      

});



// const resetPassword = asyncHandler( async(req,res)=>{

//    const {token } = req.params;  
   
   
//    const resetPasswordToken = crypto
//    .createHash("sha256")
//    .update(token)
//    .digest("hex");

//    const user = await User.findOne(
//     {
//         resetPasswordToken,
//         resetPasswordExpire:{
//             $gt:Date.now()
//         }
//     }
//    )

//    if(!user){
//      throw new ApiError(400," Invalid Token Or Has Been expired ")
//    }

//    user.password = req.body.password;

//    user.resetPasswordToken = undefined;
//    user.resetPasswordExpire = undefined;

//    await user.save({validateBeforeSave:false});

//    return res
//    .status(200)
//    .json(
//     new ApiResponse(200,{},"Password changed successfully")
//    )

// })


// const updateAccountDetails = asyncHandler( async(
//     req:CustomRequest,
//     res:Response
//     )=> {

//     const { username , email , lastName } = req.body;

//     if(
//       [username,email,lastName].some(fields => fields?.trim() === "" || undefined )
//     ){
//       throw new ApiError(400," Fields Should be not empty");
//     }

//     const _id = req.user?._id

//     const user = await User.findByIdAndUpdate(_id,
//       {
//         $set:{
//             username,
//             email,
//             lastName
//         }
//       },{
//         new:true
//       }).select(" -password ");

//     return res
//     .status(200)
//     .json(
//         200,
//         new ApiResponse(200,{},"user detials update successfully ")
//     )
    
    
// })



// const updateProfileImage = asyncHandler(async (req, res) => {

//     let userImage

//     if (req.file && req.file?.path) {
//         userImage = req.file?.path
//     }

//     if (!userImage) {
//         throw new ApiError(400, ' Please Provide your image First ')
//     }

//     const response = await cloudinaryUploader(userImage);
//         // to do
//     //  { 
//      // cloudinary.v2.api
//      // .delete_resources(['user cover image'], 
//      //   { type: 'upload', resource_type: 'image' })
//      // .then(console.log);}


//     const user = await User.findByIdAndUpdate(req.user?._id, {
//         $set: {
//             userImage: response? response.url : '',
//         },
//     }).select(" -password -refreshToken -resetPasswordToken -resetPasswordExpire");

//     if (!user) {
//       throw new ApiError(404," User not found ")
//     }

//     return res
//     .status(200).
//     json(
//       new ApiResponse(
//         200, 
//         { newUrl: response.url }, 
//         ' User Profile has been Updated '
//         )
//     )
// })


const getCurrentUser = asyncHandler( async(
    req:CustomRequest,
    res:Response
    )=>{


    if(req.user){

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "User Details",
                true
            )
        )
    }

    return res .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "User not found something went wrong",
            true
        )
    )

}) 


// const test = asyncHandler(async(req,res)=>{
//     const file =  req.file
//     // console.log(file)
//     const data =  fileUpload(file.path)
//     console.log(data);
// })
// // to do 
// // when getting user profile enter almost product




export { 
      
  registerUser,
  logInUser,
  logOutUser,
  refreshToken,
  chageCurrentPassword,
  getCurrentUser,
//   updateProfileImage,   // const data =  fileUpload(file)
//   // console.log(data);
//   updateAccountDetails,
//   forgetPassword,
//   resetPassword,
//   test

   }
