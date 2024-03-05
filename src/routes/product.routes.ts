import express from "express";
import {
    addProduct,
    getAllProducts,
    getAdminProducts,
    getLetestProduct,
    getSingleProduct,
    serachProduct,
    updateProduct,
    deleteProductAdmin,
    updateProductImage
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js"
import { isAdmin } from "../middlewares/admin.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"



const router = express.Router()

router.use(verifyJwt)

router.route("/add-product").post(isAdmin,upload.single("productImage"),addProduct);

router.route("/all-products").get(getAllProducts);

router.route("/get-admin-products/:ownerId").get(isAdmin,getAdminProducts);

router.route("/get-single-products/:productId").get(getSingleProduct);

router.route("/get-letest-products").get(getLetestProduct);

router.route("/search-products").get(serachProduct);

router.route("/update-product-image/:productId").patch(isAdmin,upload.single("prodcutImage"), updateProductImage);

router.route("/:productId").patch(updateProduct).delete(isAdmin,deleteProductAdmin); // update and delete route 



export default router


