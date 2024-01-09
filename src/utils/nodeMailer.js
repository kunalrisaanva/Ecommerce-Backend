import nodemailer from 'nodemailer'
import { asyncHandler } from './asyncHandler.js'
import { ApiError } from './ApiError.js'


export const mailSender =  asyncHandler ( async (userEmail,otp) => {
  
    try {

        // Create a Nodemailer transporter

        console.table("user:",userEmail,"otp:",otp);

        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        })

        // Email content
        
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: userEmail,
            subject: 'Reset Password ',
            text: `OTP is Here ${otp}`,
        }

        // Send email

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error)
            } else {
                console.log('Email sent:', info.response)
            }
        })
    } catch (error) {
        throw new ApiError(
            400,
            error?.message,
            ' someting went wrong while sending mail '
        )
    }

  
})


