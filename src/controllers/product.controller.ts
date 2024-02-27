import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { User } from '../models/user.models.js';
import { ProductRequestBody, SearchRequestQuery } from '../types/types.js';
import { NextFunction, Request, Response } from"express"
import mongoose, { ObjectId, Schema , isValidObjectId } from 'mongoose';
import { BaseQuery } from '../types/types.js';
import { IRequest } from '../middlewares/auth.middleware.js';

import { cloudinaryUploader } from '../utils/cloudinary.js';
import { nodeCache } from '../app.js';
import { Category } from '../models/categories.models.js';




const addProduct = asyncHandler( async (
    req:IRequest,
    res:Response,
    next:NextFunction
    ) => {
    // TO Do: add product only admin can.

    const { name, description  , price, stock,  } = req.body;
    
    const {categoryId} = req.params

    if(! isValidObjectId(categoryId)) throw new ApiError(400,"invalid Category Id")

    const isExisted = Category.exists({_id:categoryId});

    if(!isExisted) throw new ApiError(404,"category does't exist ")

    let productImage;

    if(req.file && req.file !== undefined){
        let localPathOfProductImage = req.file.path
        productImage = await cloudinaryUploader(localPathOfProductImage)
    }
    
    if([name,description,price,stock].some( fields => fields?.trim() === "" || undefined )){
        throw new ApiError(400, ' All Fields Are Required !! ');
    }
    

       
        const createdProduct = await Product.create({
            name,
            description,
            productImage: productImage ? productImage.url : "",
            category:categoryId,
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

    const { ownerId } = req.params

    if(!isValidObjectId(ownerId)) throw new ApiError(400," owner id is Invalid ")
    
    let products;

    if(nodeCache.has("All-products"))
    products = JSON.parse(nodeCache.get("All-products") as string)

    else{
        products = await Product.find({owner:ownerId});
        nodeCache.set("All-products",JSON.stringify(products)) 

    }

    return res
    .status(200)
    .json( new ApiResponse(200,products,"admin product list feched successfully"))

    
})


const updateProduct = asyncHandler( async (req,res) => {
    // TO Do: update single product details 
    const { productId } = req.params
    
    if(!isValidObjectId(productId)) throw new ApiError(400," Product id is Invalid ")

    const {name , description , stock , } = req.body

    if([name,description,stock].some(fields => fields?.trim() === "" || undefined)){
        throw new ApiError(400,"plesase provide all fields ")
    } 


    const updatedProduct = await Product.findByIdAndUpdate(productId,{
        $set:{
            name,
            description,
            stock
        }
    },{new:true});

    if(!updateProduct) throw new ApiError(404,"product not found")


    return res
    .status(200)
    .json( new ApiResponse(200,updatedProduct,"letest product list"))

    
})


const updateProductImage = asyncHandler( async(req,res) => {
    //Todo: update product image

    const {productId} = req.params;

    if(!isValidObjectId(productId)) throw new ApiError(400," Product id is Invalid ")

    const existProdcut = await Product.exists({_id:productId});

    if(!existProdcut) throw new ApiError(404,"product not found")

    if(!req.file) throw new ApiError(400,"please provide image to update")

    const productImage = req.file
   

    const prodcutImageUrl = await cloudinaryUploader(productImage.path)
   

    await Product.findByIdAndUpdate(productId,{
        $set:{
            productImage:prodcutImageUrl?.url ? prodcutImageUrl.url : ""
        }
    })

    return res
    .status(200)
    .json( new ApiResponse(200,{}," product image updated successfully "))
    
})



const deleteProductAdmin = asyncHandler( async (req,res) => {
    
    
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
  

    let products;

    if(nodeCache.has("Products")) 
    products = JSON.parse(nodeCache.get("Products")!) 

    else{
       products = await Product.find()
       console.log("before",products);
       nodeCache.set("Products",JSON.stringify(products));
       console.log("after",products);
    }



    if(products.length > 0) throw new ApiError(404," something wrong while fecthing products ")

    

    return res
    .status(200)
    .json( new ApiResponse(200, products ,"product list Fetched"))

    
})


const serachProduct = asyncHandler( async(req:Request<{},{},{},SearchRequestQuery>,res) => {
    //Todo: get product by search 

    const { search , sort , category, price , description} = req.query
    console.log(description);

    const page = Number(req.query?.page) || 1
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8
    const skip = (page - 1) * limit

 

    const baseQuery: BaseQuery = {};

    
    if(search) {
        baseQuery.name = {
            $regex: search,
            $options: "i",
        }
    }

    if(description) {
        baseQuery.name = {
            $regex: description,
            $options: "i",
        }
    }


    if(price) {
        baseQuery.price = {
           $lte: Number(price)
        }
    }


    const searchedProduct = await Product.find(baseQuery).sort
    (sort ? { price:sort === "asc" ? 1 : -1 } : undefined)
    .limit(limit)
    .skip(skip)

 
    
    
    if(searchedProduct.length <= 0 || undefined ) throw new ApiError(404,"item not found");

    return res
    .status(200)
    .json(
        new ApiResponse(200,searchedProduct,"here is the product you have searched")
    )
})






export {
   addProduct,
   getSingleProduct,
   getAllProducts,
   getAdminProducts,
   deleteProductAdmin,
   getLetestProduct,
   updateProduct,
   serachProduct,
   updateProductImage
}





