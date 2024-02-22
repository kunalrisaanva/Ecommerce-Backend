import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { Category } from  "../models/categories.models.js"   // type fix leter spelling 
import { nodeCache } from '../app.js';




const getAllCategories = asyncHandler(async (req,res)=> {

    
    let categories;

    if(nodeCache.has("categories"))
    
    categories = JSON.parse(nodeCache.get("categories")!)

    else{
        const categories = await Category.distinct("name");
        nodeCache.set("categories",JSON.stringify(categories) as string );

    }


    if(!categories) throw new ApiError(404,"something went wrong while collecting categories");



    return res
    .status(200)
    .json(
        new ApiResponse(200,categories,"all categories Fached successfully") 
    )


})

const  addCategory = asyncHandler( async(req,res) => {

    // Todo: add category oonly admin 

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"all categories Fached successfully") 
    )

})



const editCategory = asyncHandler( async(req,res) => {
 // Todo: edite category oonly admin 

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"all categories Fached successfully") 
    )
})


const deleteCategory = asyncHandler( async(req,res) => {
 // Todo: delete category oonly admin 

 return res
 .status(200)
 .json(
    new ApiResponse(200,{},"all categories Fached successfully") 
 )
})



export {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory
}