// import mongoose , { Schema, model ,Types } from 'mongoose';



// const orderItemSchema = new Schema( {
//    productId:{
//       type:Types.ObjectId,
//       ref:"Product"
//    },
//    quantity:{
//     type:Number,
//     required:true
//    }
// } )

// const orderSchema = new Schema( {
    
//     orderPrice:{
//         type:Number,
//         required:true
//     },

//     customer:{
//         type:Types.ObjectId,
//         ref:"User",
//         required:true
//     },

//     orderItem :{
//         type: [orderItemSchema]
//     },

//     address:{
//         type:String,
//         requried:true
//     },

//     status:{
//         type:String,
//         enum:['PENDING',"CANCELED", 'DELIVERD'],   // choices
//         default:'PENDING',
//         requried:true
//     },

// } , { timestamps:true } );



// export const Order = model("Model",orderSchema);