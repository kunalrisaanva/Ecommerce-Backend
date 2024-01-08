import { Router } from "express";
import { 
    registerUser,
    logInUser,
    logOutUser,
    refreshToken,
    updateProfileImage
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



// only user image update  route



export default router