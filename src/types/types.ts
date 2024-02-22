import {Request , Response , NextFunction} from "express"
import { Schema } from "mongoose";



export interface NewUserRequestBody {
    // _id?:Schema.Types.ObjectId;
    username: string;
    lastName: string;
    email: string;
    password: string;
    gender?:"male" | "female" | "other "
}

export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => Promise<void | Response<any, Record<string, any>>>


export interface LoginRequestBody {
    email:string; 
    username:string; 
    password:string;
}    


export interface ProductRequestBody {
    name:string; 
    description:string; 
    productImage:string;
    category:string;
    price:number;
    stock:number; 
    owner:Schema.Types.ObjectId
}

export interface CustomRequest extends Request  {
   
    user?: {
        _id:string
    }
    
}


export type SearchRequestQuery = {
        search?:string;
        price?:number;
        category?:string;
        sort?:string;
        page?:string;
        description?:string;
}
