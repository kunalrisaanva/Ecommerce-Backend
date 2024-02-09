import {Request , Response , NextFunction} from "express"

export interface NewUserRequestBody {
    username: string;
    lastName: string;
    email: string;
    password: string;
    gender:"male" | "female" | "other "
}

export type ControllerType = (
    req: Request<{},{},NewUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => Promise <void | Response<any,Record<string, any>>>
