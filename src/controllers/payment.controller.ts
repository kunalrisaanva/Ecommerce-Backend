import Razorpay  from "razorpay"
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {fileURLToPath} from "url"
import path from "path"
import axios from "axios";
import { ApiError } from "../utils/ApiError.js";



const __filename = fileURLToPath(import.meta.url);
const htmlFilePath = path.join(path.dirname(__filename), '../../public/index.html');



const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET 
});



const renderHtmlFile = asyncHandler( async(req,res) => {

    res.sendFile(htmlFilePath)

})


const createOrder = asyncHandler(async(req:Request,res:Response)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: 1000,// giving staticly 
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }
        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:1000, // giving staticly 
                        key_id:process.env.RAZORPAY_KEY_ID!,
                        product_name:"tshirt",
                        description:"nike tshirt descriptioin",
                        contact:"8307339859",
                        name: "kunal",
                        email: "kunalrissanva12@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error:any) {
        console.log(error.message);
    }
})




export { createOrder , renderHtmlFile}