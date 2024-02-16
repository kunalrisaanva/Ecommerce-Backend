import {Request , Response , NextFunction} from "express"

export interface NewUserRequestBody {
    username: string;
    lastName: string;
    email: string;
    password: string;
    gender:"male" | "female" | "other "
}

export type ControllerType = (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => Promise <void | Response<any,Record<string, any>>>


export interface LoginRequestBody {
    email:string; 
    username:string; 
    password:string;
}    


export interface CustomRequest extends Request {
    user?: { _id: string }; // Assuming _id is of type string
}