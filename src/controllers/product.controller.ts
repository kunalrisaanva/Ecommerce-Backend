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
import { nodeCache } from '../app.js';




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

    const { productId } = req.params;

    const singleProducuct = await Product.findById(productId).select("")
    



    return res
    .status(200)
    .json(
        new ApiResponse(200,singleProducuct,"product")
    )
        
})


const getAdminProducts = asyncHandler( async (req,res) => {
    // TO Do: get products created by admin  


    
})


const updateProduct = asyncHandler( async (req,res) => {
    // TO Do: update single product details 
    const { productId } = req.params
    

    const {name , description , productImage ,stock , } = req.body


    const updatedProduct = await Product.findByIdAndUpdate()


    return res
    .status(200)
    .json( new ApiResponse(200,{},"letest product list"))

    
})


const deleteProductAdmin = asyncHandler( async (req,res) => {
    // TO Do: delete product 
    const {productId} = req.params
    
    const product = await Product.findById(productId);

    if(!product) throw new ApiError(404,"there is no products found with giveen id");


    await Product.findByIdAndDelete(productId);
    
    return res
    .status(200)
    .json( new ApiResponse(200,{}," product deleted "))
    
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
    const products = await Product.find();

    const chacheProduct =  nodeCache.set("products",products)

    

    return res
    .status(200)
    .json( new ApiResponse(200,products ? products : chacheProduct ,"product list Fetched"))

    
})


const serachProduct = asyncHandler( async(req,res) => {
    //Todo: get product by search 

    const { searchTerm } = req.query
    const searchedProduct = await Product.find(
        {
            $or:[
                { name: { $regex:searchTerm}},
                { description:{ $regex:searchTerm}}
            ]

            
        }
    );

    if(!searchedProduct) throw new ApiError(404,"item not found");

    return res
    .status(200)
    .json(
        new ApiResponse(200,searchedProduct,"here is the product you have searched")
    )
})




// genreate product 3.05

export {
   addProduct,
   getSingleProduct,
   getAllProducts,
   getAdminProducts,
   deleteProductAdmin,
   getLetestProduct,
   updateProduct,
   serachProduct
}





