import express from "express";
import cors from "cors";
import passport from "passport"
import cookieParser from "cookie-parser";
import NodeCache from "node-cache";
import session from 'express-session';
import {configureGoogleStrategy} from './middlewares/passoprt.middleware.js';


const app = express();


// cacheing initalize 
export const nodeCache = new NodeCache();  // data store in mermory 


// cors configraion 
app.use(cors({
    origin:process.env.origin,
    credentials:true
}))


// session configration 

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));


// Initialize Passport and session

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({limit:"64kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));
app.use(express.static('public'));



// Configure Google OAuth Strategy
configureGoogleStrategy(passport);


// cookie-session 
app.use(cookieParser());


// routes

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import categoryRouter from "./routes/categories.routes.js";
import healthRouter from "./routes/health.routes.js";
import googleAuthRouter from "./routes/googleAuth.routes.js"
import paymentRouter from "./routes/payment.routes.js"




app.use("/api/v1/user/",userRouter);
app.use(googleAuthRouter); // url = http:localhost:7000/api/v1/
app.use("/api/v1/product/",productRouter);
app.use("/api/v1/user/order",orderRouter);
app.use("/api/v1/user/category",categoryRouter);
app.use('/api/v1',paymentRouter);
app.use("/api/v1/health",healthRouter);


export { app }