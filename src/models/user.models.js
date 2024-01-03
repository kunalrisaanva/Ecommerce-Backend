import mongoose , { Schema, model } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema( {

    username:{

        type:String,
        required:true,
        unique:true,
        lowercase:true

    },

    email:{

        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    password:{

        type:String,
        required:true,

    },


} , { timestamps:true });


userSchema.pre("save",async function(next){

    if (!this.isModified("password")) return next() ;

    this.password = await bcrypt.hash(this.password , 10)
    return next()
});


// userSchema.genreteAccessToken(){

// }

export const User = model("User",userSchema);