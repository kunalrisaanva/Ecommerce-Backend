import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response, NextFunction } from "express";
import { IRequest } from "./auth.middleware.js";


export const isAdmin = asyncHandler( async(
    req:IRequest,
    res:Response,
    next:NextFunction
    )=> {
       

        if(!req.userId) return next( new ApiError(401,"please provide your id "));
       
        const user = await User.findById(req.userId).select("-password -refreshtoken");

        if(!user) return next(new ApiError(404,"admin not found with your given id"));

        if(user.role !== "admin") return next(new ApiError(403,"only admin have permision "));
       
        next()

    })

