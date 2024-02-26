import {Request , Response , NextFunction} from "express"
import { ControllerType } from "../types/types.js"

const asyncHandler = (passedFuntion:ControllerType) => (req:Request,res:Response,next:NextFunction) =>{
     
    Promise.resolve(passedFuntion(req,res,next)).catch(next);

    
}



export { asyncHandler }