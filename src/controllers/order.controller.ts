import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
// import { NewOrderRequestBody } from '../types/types.js';
import { isValidObjectId } from 'mongoose';
import { Order } from '../models/order.models.js';
import { Request, Response } from 'express';





const addNewOrder = asyncHandler( async(
    req:Request,
    res:Response
    ) => {
    //Todo: create order 

    const { productId, quantity} = req.params
    const {customer , orderItem ,orderPrice, address ,status } = req.body

    if([customer,orderItem,orderPrice,address,status].some( fields => fields === "" || undefined )){
        throw new ApiError(400," please provide all fields")
    }

    const createdOrder = await Order.create({
        customer,
        orderItem,
        orderPrice,
        address,
        status,
        quantity,
        productId
    })
 
    return res
    .status(200)
    .json(
        new ApiResponse(200,createdOrder," order is created ")
    )
});



const getAllOrder = asyncHandler(async (req,res)=> {

    //ToDo:get all order 

    const order = await Order.find();


    if(!order) throw new ApiError(404,"order not found")
    
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,order,"order is feched ")
    )


})



const getSingleOrder = asyncHandler( async(req,res) => {
    //Todo: get single order 

    const { orderId } = req.params

    if(!isValidObjectId(orderId)) throw new ApiError(400," order id is Invalid ")

    const isExistedOrder = await Order.exists({_id:orderId});

    if(!isExistedOrder) throw new ApiError(404,"product not found");

    const order = await Order.findById(orderId)

    if(!order) throw new ApiError(404,'order not found')


    return res
    .status(200)
    .json(
        new ApiResponse(200,order," single order is feched ")
    )
});


const deleteOrder = asyncHandler( async(req,res) => {

    const {orderId} = req.params;


    if(!isValidObjectId(orderId)) throw new ApiError(400," order id is Invalid ");

    const isExistedOrder = await Order.exists({_id:orderId});

    if(!isExistedOrder) throw new ApiError(404,"product not found");


    await Order.findByIdAndDelete(orderId);


    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"order has been deleted ")
    )


})


export {
    addNewOrder,
    getAllOrder,
    getSingleOrder,
    deleteOrder
}