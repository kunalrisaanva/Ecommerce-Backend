import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
import crypto from "crypto";


interface IUser extends Document {
    
    username:string;
    lastName:string;
    email:string;
    password:string;
    userImage?:string;
    gender?:string;
    refreshToken?:string;
    resetPasswordToken?:string,
    resetPasswordExpire?:string,
    comparePassword(candidatePassword: string): Promise<boolean>; // Define method in interface
}

const userSchema: Schema<IUser> = new Schema(
    {
     
        username: {
            type: String,
            required: [true, "username is Required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        lastName:{
            type:String,
            default:""
        },

        email: {
            type: String,
            required: [true, "E-mail is Required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "password is Required"],
        },

        userImage: {
            type:String
        },

        gender: {
           type:String,
           enum: ["male", "female", "other"],
           default: "male",
           required:[true, "Gender is Required"]
        },

        refreshToken: {
            type: String,
        },

        
        resetPasswordToken:String,
        resetPasswordExpire:String
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    return next()
    
})

userSchema.methods.comparePassword = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password,this.password)
}

userSchema.virtual("fullName").get(function(){
       return this.username +' '+ this.lastName
})


// userSchema.methods.genrateAccessToken = async function () {
//    return  jwt.sign(
//         {
//             _id: this._id,
//         },
//         process.env.ACCESS_TOKEN_SECRET_KEY,
//         { expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN }
//     )
// }

// userSchema.methods.genrateRefreshToken = async function () {
//    return  jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
//       expiresIn: process.env.REFRESH_TOKEN_LIFE_SPAN,
//     })
// }



// userSchema.methods.getResetToken = async function(){
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     console.log(resetToken);
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordExpire = Date.now()+ 10 * 60 * 1000
//     console.log(resetToken);
//     return resetToken;
// }



export const User = model<IUser>('User', userSchema)


