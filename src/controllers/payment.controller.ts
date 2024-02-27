import Razorpay from "razorpay"
import { Request,Response } from "express";



const razorpayInstance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET 
});




const createOrder = async(req:Request,res:Response)=>{
    try {
        const amount = req.body.amount*100
        const options = {
            amount: amount,
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
                        amount:amount,
                        key_id:process.env.RAZORPAY_KEY_ID!,
                        product_name:req.body.name,
                        description:req.body.description,
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


export { createOrder }