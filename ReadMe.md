# Ecommerce-Backend-Project


- [Model Design link](https://app.eraser.io/workspace/4ueYEd8t9PzWXAOMwXqc)
- [Postman Api Documentation](https://documenter.getpostman.com/view/21582927/2sA2xcZZnv)

---
# Summary of this project

This project is a complex backend project that is built with nodejs, expressjs, mongodb, mongoose, jwt, bcrypt, and many more. This project is a complete backend project that has all the features that a backend project should have.
We are building a complete ecommerce website similar to flipkart and amazone  with all the features like login, signup, upload product, buy product and many more.

Project uses all standard practices like JWT, bcrypt, access tokens, refresh Tokens and many more. We have spent a lot of time in building this project. 

---

## Features

- **User Authentication**: Secure and seamless login/signup functionalities.
- **Engagement Features**: Implementing features like login with google and admin can add ,delete ,edit product. add to cart functionality. Configured payment gateway settings
- **Security Practices**: Adhering to industry standards with JWT (JSON Web Tokens), Bcrypt for password hashing, and robust access token management.
- **Sending Emails**: User gets email if they forget their password they will get a token using it user can update password. 

## Technologies Used

- **Node.js and Express.js**: Building the server-side infrastructure.
- **MongoDB and Mongoose**: Efficiently managing and interacting with the database.
- **JWT (JSON Web Tokens)**: Ensuring secure and authenticated communication.
- **Bcrypt**: Safeguarding user passwords with industry-standard hashing.
- **Access Tokens and Refresh Tokens**: Enhancing security and user experience.
- **Nodemailer**: Integrated Nodemailer to enable email functionality for user password reset. 
- **Cloudinary**: Instead of save videos and images  into DB We use cloudinary for uploading files and extract url And save into DB 
- **In-Memory Storage:**: Node.js Cache stores cached data in memory, making retrieval fast and efficient. 
- **Authentication:**: Implemented user authentication using OAuth 2.0 protocol with Passport.js library, specifically utilizing the passport-google-oauth20 strategy for Google Login integration.
- **Payment Integration:**:Integrated payment gateway solutions such as Razorpay for secure and seamless transaction processing.

---
### Run locally
- `git clone  `
- `npm install `
- `npm run build`
- `npm run dev`
