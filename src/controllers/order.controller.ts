import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
// import { NewOrderRequestBody } from '../types/types.js';
import { isValidObjectId } from 'mongoose';
import { Order } from '../models/order.models.js';
import { User } from '../models/user.models.js';
import { Request, Response } from 'express';
import { nodeCache } from '../app.js';
import { IRequest } from '../middlewares/auth.middleware.js';



const addNewOrder = asyncHandler( async(
    req:IRequest,
    res:Response
    ) => {
    //Todo: create order 
   
    const { productId, quantity} = req.params
    const {  address  } = req.body

    if([address].some( fields => fields === "" || undefined )){
        throw new ApiError(400," please provide all fields");
    }

    const productDetails = await Product.findById(productId);

    if(!productDetails) throw new ApiError(404,"product not found ")

    const isUserExist = await User.find({_id:req.userId});
   
    if(!isUserExist) throw new ApiError(404,"user not found")
    
    const createdOrder = await Order.create({
        customer:req.userId || "",
        orderItem:{productId:productId,quantity:quantity},
        orderPrice:productDetails.price,
        address,
        quantity,
    })
 
    return res
    .status(200)
    .json(
        new ApiResponse(200,createdOrder," order is created ")
    )
});



const getAllOrder = asyncHandler(async (req,res)=> {

    //ToDo:get all order 
  
    let orders

    if(nodeCache.has("All-orders"))
    orders = JSON.parse(nodeCache.get("All-orders") as string)

   else{
       orders = await Order.find();
       nodeCache.set("All-order",JSON.stringify(orders)) 

   }

    if(!orders) throw new ApiError(404,"order not found")
    
    return res
    .status(200)
    .json(
        new ApiResponse(200,orders,"order is feched ")
    )


})


const getSingleOrder = asyncHandler( async(req,res) => {
    //Todo: get single order 

    const { orderId } = req.params

    if(!isValidObjectId(orderId)) throw new ApiError(400," order id is Invalid ")

    const isExistedOrder = await Order.exists({_id:orderId});

    if(!isExistedOrder) throw new ApiError(404,"product not found");

    let order

     if(nodeCache.has("All-order"))
     order = JSON.parse(nodeCache.get("All-order") as string)

    else{
        order = await Order.find({_id:orderId});
        nodeCache.set("All-order",JSON.stringify(order)) 

    }

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