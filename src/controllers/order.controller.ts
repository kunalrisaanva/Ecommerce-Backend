import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { Order } from '../models/order.models.js';




const getAllOrder = asyncHandler(async (req,res)=> {

    //ToDo:get all order 

    const order = await Order.find();
    
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"order is feched ")
    )


})


const getMyOrder = asyncHandler( async( req,res) => {
    //ToDo: get order indivisualy 

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"order is feched ")
    )
})


const getSingleOrder = asyncHandler( async(req,res) => {
    //Todo: get single order 


    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"order is feched ")
    )
});






export {
    getAllOrder,
    getMyOrder,
    getSingleOrder
}