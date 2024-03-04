import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from "crypto";


export interface IUser extends Document {
    _id?:Schema.Types.ObjectId;
    username:string;
    lastName:string;
    email:string;
    password:string;
    userImage?:string;
    gender?:string;
    role?:string;
    refreshToken?:string;
    resetPasswordToken?:string,
    resetPasswordExpire?:string,
    comparePassword(candidatePassword: string): Promise<boolean>; 
    genrateAccessToken(): Promise<string>; 
    genrateRefreshToken(): Promise<string>;
    getResetToken(): string
}

const userSchema: Schema<IUser> = new Schema(
    {
     
        username: {
            type: String,
            required: [true, "username is Required"],
            lowercase: true,
            trim: true,
            index: true,
        },

        lastName:{
            type:String,
            trim:true,
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

        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },

        refreshToken: {
            type: String,
        },

        
        resetPasswordToken:String,
        resetPasswordExpire:String
    },
    { timestamps: true }
)


userSchema.pre('save', async function (next): Promise<void> {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    return next()
    
})

userSchema.methods.comparePassword = async function (password:string): Promise<boolean> {
    return await bcrypt.compare(password,this.password)
}


// if needs fullName 
userSchema.virtual("fullName").get(function(): string {
       return this.username +' '+ this.lastName
})


userSchema.methods.genrateAccessToken = async function () {
   return await jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY!,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN }
    )
}

userSchema.methods.genrateRefreshToken = async function () {
   return await jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET_KEY!, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE_SPAN,
    })
}



userSchema.methods.getResetToken = async function(){
    const resetToken = await crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = await crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now()+ 10 * 60 * 1000
    console.log(resetToken);
    return resetToken;
}



export const User = model<IUser>('User', userSchema)

