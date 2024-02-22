import express from "express";
import {
    addProduct,
    getAllProducts,
    getAdminProducts,
    getLetestProduct,
    getSingleProduct,
    serachProduct,
    updateProduct,
    deleteProductAdmin
} from "../controllers/product.controller.js";

import { upload } from "../middlewares/multer.middleware.js"
import { isAdmin } from "../middlewares/admin.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js"



const router = express.Router()

// router.use(verifyJwt)

router.route("/add-product").post(upload.single("productImage"),verifyJwt,addProduct);

router.route("/all-products").get(getAllProducts);

router.route("/get-admin-products").get(getAdminProducts);

router.route("/get-single-products").get(getSingleProduct);

router.route("/get-letest-products").get(getLetestProduct);

router.route("/search-products").get(serachProduct);

router.route("/:productId").patch(updateProduct).delete(deleteProductAdmin); // update and delete route 






export default router


