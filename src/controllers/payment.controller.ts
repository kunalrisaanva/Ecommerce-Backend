import Razorpay  from "razorpay"
import { Request,Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import router from "../routes/user.routes.js";
// import {create} from "../../public"


const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET 
});


// declare module 'razorpay' {
//     interface Razorpay {
//         on(event: string, handler: Function): void;
//     }
// } 



const createOrder = async(req:Request,res:Response)=>{
    try {
        const amount = req.body.amount*100 || 5000
        const options = {
            amount: 1000,
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
                        amount:1000,
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
}




const checkOut = asyncHandler( async(req,res) => {

    try {
    
        const response = await ((await axios.post("http://localhost:7000/api/v1/create-order")).data)
        console.log(response)

        if(response.success !== true) throw new ApiError(400,"something went wrong while creating order ")

        const options = {
            "key_id": ""+response.key_id+"",
            "amount": ""+response.amount+"",
            "currency": "INR",
            "name": ""+response.product_name+"",
            "description": ""+response.description+"",
            "image": "https://dummyimage.com/600x400/000/fff",
            "order_id": ""+response.order_id+"",
            "handler": function (response:any){
             console.log("payment successfully");
            },
            "prefill": {
                "contact":""+response.contact+"",
                "name": ""+response.name+"",
                "email": ""+response.email+""
            },
            "notes" : {
                "description":""+response.description+""
            },
            "theme": {
                "color": "#2300a3"
            }
        };
        const razorpayObject:any = new Razorpay(options);
        // razorpayObject.on('payment.failed', function (response:any){
        //       console.log("payment failed");
        // });
        razorpayObject.open();
        console.log("payment success");
        
    } catch (error) {
        console.log(error);
    }

})




export { createOrder , checkOut}