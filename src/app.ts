import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin:process.env.origin,
    credentials:true
}))

app.use(express.json({limit:"64kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));
app.use(express.static("public"));


// Middleware for session management

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false
// }));


// Initialize Passport and session

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());


// routes

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import categoryRouter from "./routes/categories.routes.js";


app.use("/api/v1/user/",userRouter); // url = " http"//localhost:7000/api/v1/user/"
app.use("/api/v1/product/",productRouter);
app.use("/api/v1/user/order",orderRouter);
app.use("/api/v1/user/category",categoryRouter);




export { app }