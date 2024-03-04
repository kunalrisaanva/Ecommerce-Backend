import express from "express";
import {
addCategory,
getAllCategories,
editCategory,
deleteCategory,
searchCategory
} from "../controllers/categories.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js"
import { isAdmin }  from "../middlewares/admin.middleware.js"

const router = express.Router()

// router.use(verifyJwt);

router.route("/add-category").post(addCategory);
router.route("/get-all-category").get(getAllCategories);
router.route("/search-category").get(searchCategory);
router.route("/:categoryId").patch(editCategory).delete(deleteCategory);



export default router