import { Router } from "express"
const router = Router();

import {test} from "../controllers/user.controller.js"

router.route("/test").get(test);




export default router