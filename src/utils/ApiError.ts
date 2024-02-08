
class ApiError extends Error{
    data: null;
    success:boolean;

    constructor(public statusCode:number ,public message = " Something went Wrong ", public errors = [] ,public stack = "" ){
            super(message);
            this.statusCode = statusCode,
            this.success = false,
            this.errors = errors
            this.data = null

            if(stack){
                this.stack = stack
            }else{
                Error.captureStackTrace(this,this.constructor);
            }
    }
}


export { ApiError }