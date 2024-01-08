import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js" 
import { cloudinaryUploader } from "../utils/cloudinary.js"



const genrateAccessTokenAndRefreshToken = async(user_id) => {
   
    try {
       const user = await User.findById(user_id);
       const accessToken =  await user.genrateAccessToken()
       const refreshToken = await user.genrateRefreshToken()
      
       user.refreshToken =   refreshToken;
  
       await user.save({validateBeforeSave:false});
  
      return { accessToken , refreshToken }
    } catch (error) {
      throw new ApiError(500," something went wrong while genrating tokens ")
    }
   
}


const registerUser = asyncHandler(async(req,res)=>{

    const { username , lastName ,email, password } = req.body
    
    if(
      [username,email,password].some(
        (fields) => fields?.trim() === ""
      )
    ){
      throw new ApiError(400," All Fields Are Required !! ")
    }
 
    const existedUser = await User.findOne(
      {
        $or:[ {
           username 
        } , {
            email
        }]
      }
    );
    
    if(existedUser){
        throw new ApiError(400," User is Already Exists in Db ");
    }
    
    let userImageUrl;
    
    if(req.file && req.file?.path){
      const userImagePath = req.file.path
      userImageUrl = await cloudinaryUploader(userImagePath);
     
    }
    
    const createdUser = await User.create(
      {
        username:username.toLowerCase(),
        lastName:lastName.toLowerCase(),
        email,
        password,
        userImage: userImageUrl?.url || ""
      }
    );
    
    const user = await User.findOne(createdUser?._id).select(" -password -refreshToken")

    if(!user){
      throw new ApiError(500," Something went wrong while registering a User ")
    }

    console.log(createdUser.fullName);

   return res
    .status(200)
    .json(
      new ApiResponse(201,user," User created Successfully ")
    )

  } 
)




const logInUser = asyncHandler(async(req,res)=>{

  const { email , username , password } = req.body

  if(!(email || password)){
    throw new ApiError(400,"All fields are required ");
  }

  const user = await User.findOne(
    {
      $or:[
        {
            email
        },
        {
            username
        }
      ]
    }
  )


  if(!user){
    throw new ApiError(400," This user does not exists")
  };

  const isMatch = user.isPasswordCorrect(password);

  if(!isMatch){
    throw new ApiError(400," Invalid User credientals ")
  }


  const { accessToken , refreshToken } =  await genrateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user?._id).select(" -password -refreshToken ")
  
  const cookieOptions = {
    httpOnly:true,
    // secure:true
  }

  return res
  .status(200)
  .cookie("accessToken",accessToken,cookieOptions)
  .cookie("refreshToken",refreshToken,cookieOptions)
  .json(
    new ApiResponse(200,
      {
        loggedInUser,
        refreshToken,
        accessToken
      }
      )
  )
});


const logOutUser = asyncHandler(async(req,res)=>{
      
})



const refreshToken = asyncHandler(async(req,res)=>{
  
})


export {
  registerUser,
  logInUser,
  logOutUser,
  refreshToken
}

