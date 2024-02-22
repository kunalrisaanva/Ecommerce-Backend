import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { User } from '../models/user.models.js';
import { ProductRequestBody, SearchRequestQuery } from '../types/types.js';
import { NextFunction, Request, Response } from"express"
import mongoose, { ObjectId, Schema , isValidObjectId } from 'mongoose';
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

    const { name, description  , price, stock,  } = req.body;
    
    const productImage = req.file /// comes from req.files 
    
    if([name,description,price,stock].some( fields => fields?.trim() === "" || undefined )){
        throw new ApiError(400, ' All Fields Are Required !! ');
    }
    

       
        const createdProduct = await Product.create({
            name,
            description,
            productImage:"kunal.jpg",
            category:"65d2e033f466cc7b3aad3a25",
            price,
            stock,
            owner: req.userId ? req.userId : ""
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

    if(!isValidObjectId(productId)) throw new ApiError(400," Product id is Invalid ")

    let singleProducuct;

    if(nodeCache.has("single-products"))

    singleProducuct = JSON.parse(nodeCache.get("single-products") as string) 
    else{
    
    singleProducuct = await Product.findById(productId)    
    nodeCache.set("single-products",JSON.stringify(singleProducuct))
    }
    
    if(!singleProducuct) throw new ApiError(404,"somethig went wrong while collecting product");

    return res
    .status(200)
    .json(
        new ApiResponse(200,singleProducuct,"product")
    )
        
})


const getAdminProducts = asyncHandler( async (req,res) => {
    // TO Do: get products created by admin  
    
    let products;

    if(nodeCache.has("All-products"))
    products = JSON.parse(nodeCache.get("All-products") as string)

    else{
        products = await Product.find();
        nodeCache.set("All-products",JSON.stringify(products)) 

    }

    return res
    .status(200)
    .json( new ApiResponse(200,{},"admin product list feched successfully"))

    
})


const updateProduct = asyncHandler( async (req,res) => {
    // TO Do: update single product details 
    const { productId } = req.params
    
    if(!isValidObjectId(productId)) throw new ApiError(400," Product id is Invalid ")

    const {name , description , stock , } = req.body

    if([name,description,stock].some(fields => fields?.trim() === "" || undefined)){
        throw new ApiError(400,"plesase provide all fields ")
    } 


    // update prodcut images

    const updatedProduct = await Product.findByIdAndUpdate(productId);

    if(!updateProduct) throw new ApiError(404,"product not found")


    return res
    .status(200)
    .json( new ApiResponse(200,{},"letest product list"))

    
})


const deleteProductAdmin = asyncHandler( async (req,res) => {
    // TO Do: delete product 
    const {productId} = req.params
    
    if(!isValidObjectId(productId)) throw new ApiError(400," Product id is Invalid ")

    const product = await Product.findById(productId);

    if(!product) throw new ApiError(404,"there is no products found with giveen id");


    await Product.findByIdAndDelete(productId);
    
    return res
    .status(200)
    .json( new ApiResponse(200,{}," product deleted "))
    
})


const getLetestProduct = asyncHandler( async (req,res) => {
    // TO Do: get letest product  

    let products;

    if(nodeCache.has("letest-Products")) 
    products = JSON.parse(nodeCache.get("letest-Products")!) 

    else{
       products = await Product.find().sort({createdAt:-1}).limit(5);
       nodeCache.set("letest-Products",JSON.stringify(products));
    }



    if(!products) throw new ApiError(404," something wrong while fecthing products ")



    return res
    .status(200)
    .json( new ApiResponse(200,products,"letest product list"))
})


const getAllProducts = asyncHandler( async (req,res) => {
    // TO Do: get all products 
    // 2.44
    // node cache 3.12
    // 

    const products = await Product.find();

    const chacheProduct =  nodeCache.set("products",products)

    

    return res
    .status(200)
    .json( new ApiResponse(200,products ? products : chacheProduct ,"product list Fetched"))

    
})


const serachProduct = asyncHandler( async(req:Request<{},{},{},SearchRequestQuery>,res) => {
    //Todo: get product by search 

    const { search , sort , category, price , description} = req.query

    const page = Number(req.query?.page) || 1
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8
    const skip = (page - 1) * limit


    const searchedProduct = await Product.find(
       {
        $or:[
            { name: { $regex:search }},
            { description: { $regex:description }},
            { price: { $lt: Number(price)}},
        ]
       }
    ).sort(
        sort ? { price:sort === "asc" ? 1 : -1 } : undefined
    ).limit(limit)
     .skip(skip)

    


    // const searchedProduct = await Product.find(
    //     {
    //         $or:[
    //             { name: { $regex:searchTerm}},
    //             { description:{ $regex:searchTerm}}
    //         ]

            
    //     }
    // );
    
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





