import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.models.js";
import { IRequest } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.models.js";



const addToCart = asyncHandler(async (req:IRequest,res) => {
  
    //TOdo: add to cart product

    const { productId } = req.params
    
    if(!isValidObjectId(productId)) throw new ApiError(400,"please provide valid productId");

    const isExistedProduct = await Product.findById(productId);

    if(!isExistedProduct) throw new ApiError(404,"product not found to add into cart ");

    const isUserExist = await User.findById(req.userId);

    if(!isUserExist) throw new ApiError(404," user not found ")

    const isCartExist = await Cart.exists({userId:"65d2e033f466cc7b3aad3a25"});
   
    let createdCart;

    if(!isCartExist){
        createdCart = await Cart.create({
                    userId:"65d2e033f466cc7b3aad3a25",
                    items:productId
                })
    }else{
        createdCart = await Cart.findOneAndUpdate({userId:"65d2e033f466cc7b3aad3a25"},{
                    $push:{
                        items:productId
                    }
                })
    }
    

    if(!createdCart) throw new ApiError(404,"cart not found ");

    return res
    .status(201)
    .json(
        new ApiResponse(201,createdCart," item has been added to cart ")
    )


})


const deleteAllPoducIntoCarts = asyncHandler(async (req:IRequest,res) => {
    //TOdo: clear all products

    const deleteCart = await Cart.findOneAndDelete({userId:req.userId});

    if(!deleteCart) throw new ApiError(404,"cart dosn't exist")

    return res
    .status(201)
    .json(
        new ApiResponse(201,{}," cart all items has been clear ")
    )

})


const removeToCartProdcuts = asyncHandler(async (req:IRequest,res) => {
    
    //ToDo: remove products into cart

    const {productId} = req.params

    const isExistedIntoCart = await Cart.findById(productId);

    if(!isExistedIntoCart) throw new ApiError(404,"product not found to delete");

    const updatedCart =  await Cart.updateOne({userId:req.userId},{
        $pull:{
            productId:productId
        }
    },{new:true});


    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedCart, "prodcut remove into cart sucessfuly ")
    )


})


const getCartProducts = asyncHandler( async(req,res) => {
    //ToDo: get all the product exists in cart model 
})




export {
    addToCart,
    deleteAllPoducIntoCarts,
    removeToCartProdcuts,
    getCartProducts
}