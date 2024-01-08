import { Router } from "express";
import { 
    registerUser,
    logInUser
 } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.route("/register").post(upload.single("userImage"),registerUser);
router.route("/login-user").post(logInUser)

// only user image update  route




export default router