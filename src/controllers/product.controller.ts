import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { User } from '../models/user.models.js';
import { ProductRequestBody } from '../types/types.js';
import { NextFunction, Request, Response } from"express"
import mongoose, { ObjectId, Schema } from 'mongoose';
import { CustomRequest } from '../types/types.js';
import { IRequest } from '../middlewares/auth.middleware.js';
import { cloudinaryUploader } from '../utils/cloudinary.js';


const addProduct = asyncHandler( async (
    req:IRequest,
    res:Response,
    next:NextFunction
    ) => {
    // TO Do: add product only admin can.

    const { name, description , productImage, category, price, stock,  } = req.body;




    // url clodinary add it later 
       
        const createdProduct = await Product.create({
            name,
            description,
            productImage:"kunal.jpg",
            category:"",
            price,
            stock,
            // owner: req.userId ? new mongoose.Types.ObjectId(req.userId) : ""
            owner:req.userId ? req.userId : ""
        })
    
    return res
    .status(200)
    .json(
        new ApiResponse(201,createdProduct,"product created successfully")
    )

})


const getSingleProduct = asyncHandler( async (req,res) => {
    // TO Do: get single product details 

    const { id } = req.params;

    const singleProducuct = await Product.findById(id).select("")
    



    return res
        
})


const getAdminProducts = asyncHandler( async (req,res) => {
    // TO Do: update single product details 
    
})


const updateProduct = asyncHandler( async (req,res) => {
    // TO Do: update single product details 
    const { product_id } = req.params
    
})


const deleteProductAdmin = asyncHandler( async (req,res) => {
    // TO Do: delete product 
    const {product_id} = req.params
    
})


const getLetestProduct = asyncHandler( async (req,res) => {
    // TO Do: get letest product  

    const products = await Product.find().sort({createdAt:-1}).limit(5);

    return res
    .status(200)
    .json( new ApiResponse(200,products,"letest product list"))
})


const getAllProducts = asyncHandler( async (req,res) => {
    // TO Do: get all products 
    // 2.44
    // node cache 3.12
    
})





// genreate product 3.05

export {
   addProduct
}





