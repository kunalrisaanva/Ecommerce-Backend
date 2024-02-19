import { IUser, User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request , Response , NextFunction } from "express"
import jwt , { JwtPayload } from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";
import { Schema } from "mongoose";


export interface IRequest extends Request {
  userId?: Schema.Types.ObjectId;
}


const verifyJwt =  async(req:IRequest,res:Response,next:NextFunction) => {

    try {
 
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
      
      if(!token){
        throw  new ApiError(401,"Unauthorized request ")
      }
  
      const decodeToken  = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY! ) as JwtPayload
      
      const user:IUser =  await User.findById(decodeToken?._id).select('-password -refreshToken ' );
      
      if(!user){
          throw new ApiError(401,"Invalid AccessToken");
      }
  
      req.userId = user._id; 
      
      next()
    } catch (error:any) {
      throw new ApiError(401,error?.message || "Invlid access token ")
    }
 
 }





export { verifyJwt }