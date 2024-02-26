import { ExistingObjectReplicationStatus } from "@aws-sdk/client-s3";
import { NumberLengthBetween12And19 } from "aws-sdk/clients/paymentcryptographydata.js";
import {Request , Response , NextFunction} from "express"
import { ObjectId, Schema } from "mongoose";



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


export interface BaseQuery {
    name?: {
      $regex: string;
      $options: string;
    };
    price?: { $lte: number };
  }
  


export type SearchRequestQuery = {
        search?:string;
        price?:number;
        category?:string;
        sort?:string;
        page?:string;
        description?:string;
}

// export type OrderItemType = {
//     productId:string;
//     quantity:number
// }

// export interface NewOrderRequestBody {
//     orderPrice:number;
//     customer:string;
//     orderItem: OrderItemType[] ;
//     address:string;
//     status:'PENDING'| "CANCELED" | 'DELIVERD'
// }