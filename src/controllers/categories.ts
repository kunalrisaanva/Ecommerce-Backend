import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from "../models/product.models.js";
import { Category } from  "../models/categories.models.js" 
import { isValidObjectId } from 'mongoose';
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

    const { name } = req.body

    const createdCategory = await Category.create({
        name
    })


    return res
    .status(200)
    .json(
        new ApiResponse(200,createdCategory, " categegory is successfully created ") 
    )

})



const editCategory = asyncHandler( async(req,res) => {
 // Todo: edite category oonly admin 

    const categoryId = req.params

    if(! isValidObjectId(categoryId)) throw new ApiError(400,"invalid category Id");
     
    const name = req.body
    const category = await Category.findByIdAndUpdate({_id:categoryId},{
        $set:{
            name
        }
    },{new:true})

    return res
    .status(200)
    .json(
        new ApiResponse(200,category,"updated category successfully") 
    )
})


const deleteCategory = asyncHandler( async(req,res) => {
 // Todo: delete category oonly admin 
  const categoryId = req.params

  const isCategoryExisted = await Category.findById(categoryId);

  if(!isCategoryExisted) throw new ApiError(404,"category does't exists")

    await Category.findByIdAndDelete(categoryId)

        return res
        .status(200)
        .json(
            new ApiResponse(200,{}," categories is deleted successfully") 
        )
})

const searchCategory = asyncHandler( async(req,res) => {


    const { category } = req.query

    
    const searchCategory = await Category.find({ name:{ $regex:category , $options:"i"}  })

    if(!searchCategory) throw new ApiError(404," there is not category exist in This site")


    return res
    .status(200)
    .json(
       new ApiResponse(200,searchCategory," categories is deleted successfully") 
    )
})

export {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory,
    searchCategory
}