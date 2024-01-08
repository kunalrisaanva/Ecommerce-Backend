import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        lastName:{
            type:String
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        userImage: {
            type:String
        },

        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    return next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.virtual("fullName").get(function(){
       return this.username +' '+ this.lastName
})


userSchema.methods.genrateAccessToken = async function () {
   return  jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN }
    )
}

userSchema.methods.genrateRefreshToken = async function () {
   return  jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE_SPAN,
    })
}

export const User = model('User', userSchema)
