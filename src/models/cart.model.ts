import mongoose , { Schema, model ,Types } from 'mongoose';


const cartSchema = new Schema( {
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

    items: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        }
      ],

 
} , { timestamps:true } );



export const Cart = model("Cart",cartSchema);