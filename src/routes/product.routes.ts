import express from "express";
import {
    addProduct
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js"
import { isAdmin } from "../middlewares/admin.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"



const router = express.Router()

router.route("/add-product").post(upload.single("productImage"), verifyJwt,isAdmin,addProduct);






export default router


