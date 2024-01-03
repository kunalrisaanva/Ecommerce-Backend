import { asyncHandler } from "../utils/asyncHandler.js"


const test = asyncHandler(async(req,res)=>{
    res.json({
        msg:"hello there"
    })
})


export { test }