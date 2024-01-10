import { Router } from "express";
import { 
    registerUser,
    logInUser,
    logOutUser,
    refreshToken,
    updateProfileImage,
    updateAccountDetails,
    forgetPassword,
    resetPassword,
 } from "../controllers/user.controller.js"

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt as verifyRoute } from '../middlewares/auth.middleware.js'

const router = Router();

router.route("/register").post(upload.single("userImage"),registerUser);
router.route("/login-user").post(logInUser)


// secure routes 

router.route('/logout').post( verifyRoute , logOutUser );

router.route('/refresh-token').post(refreshToken);

router.route('/update-profile').patch(verifyRoute,upload.single("userImage"),updateProfileImage);

router.route("/update-user-details").patch(verifyRoute,updateAccountDetails);

router.route("/forget-password").post(forgetPassword);
// router.route("/forget-password").post((req,res)=>{ res.send("hello")});

router.route("/resetPassword/:token").patch(resetPassword);

router.route("/test").get((req,res)=> {
    res.send("hello")
});





// only user image update  route



export default router