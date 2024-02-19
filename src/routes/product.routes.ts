import express from "express";
import {
    addProduct,
    getAllProducts,
    getAdminProducts,
    getLetestProduct,
    getSingleProduct
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js"
import { isAdmin } from "../middlewares/admin.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"



const router = express.Router()

// router.use(verifyJwt)

router.route("/add-product").post(upload.single("productImage"),isAdmin,addProduct);

router.route("/all-products").get(getAllProducts)

// router.route("/:productId").patch(isAdmin,).delete(isAdmin);






export default router


