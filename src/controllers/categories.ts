import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { Category } from  "../models/categories.models.js"   // type fix leter spelling 




const getAllCategories = asyncHandler(async (req,res)=> {

    //ToDo:get all category 



})

const  addCategory = asyncHandler( async(req,res) => {

    // Todo: add category oonly admin 

})



const editCategory = asyncHandler( async(req,res) => {
 // Todo: edite category oonly admin 
})


const deleteCategory = asyncHandler( async(req,res) => {
 // Todo: delete category oonly admin 
})



export {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory
}