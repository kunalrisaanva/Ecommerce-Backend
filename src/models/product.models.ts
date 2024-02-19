import mongoose , { Schema, model ,Types } from 'mongoose';

const productSchema = new Schema( {

    description:{
        type:String,
        required:true
    },
    
    name:{
        type:String,
        required:true
    },

    productImage:{
        type:String,
        required:[true, "Product image required "]
    },

    price:{
        type:Number,
        default:0,
        required:true
    },

    stock:{
        type:Number,
        default:0,
        required:[true,"stock is required "]
    },

    category:{
        type:Types.ObjectId ,
        ref:"Category",
        required:true
    },

    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },

} , {timestamps:true} );


export const Product = model("Product",productSchema)