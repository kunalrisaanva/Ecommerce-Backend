import express from "express";
import {
addCategory,
getAllCategories,
editCategory,
deleteCategory
} from "../controllers/categories.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js"
import { isAdmin }  from "../middlewares/admin.middleware.js"



const router = express.Router()

router.route("/add-category").post();
router.route("/get-all-category").get();
router.route("/edit-category/:categoryId").patch();
router.route("/delete-category").delete();





export default router