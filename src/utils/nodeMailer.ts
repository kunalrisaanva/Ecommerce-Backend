import nodemailer from 'nodemailer'
import { ApiError } from './ApiError.js'


export const mailSender = (userEmail:string , message:string ) => { 
  
    try {

        // Create a Nodemailer transporter
        console.log("start email server ");

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, 
            secure: false, 
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });

        // Email content
        
        const mailOptions = {
            // from: 'kunalrisaanva12@gmail.com', // Sender address
            to: userEmail,
            subject: 'Reset Passsword Email', 
            text: message 
        };


        // Sending email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred:', error.message);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });


    } catch (error:any) {
       
        throw new ApiError(400,"something went wrong while sending email:",error?.message)
    }

}
  



