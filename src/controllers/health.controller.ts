import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const healthCheck = asyncHandler( async (req,res,next) => {
    //ToDo: simple server health check api which is return ok  
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"ok")
    )
})


export {
    healthCheck
}