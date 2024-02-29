import { Router   } from "express"
import { createOrder ,renderHtmlFile} from "../controllers/payment.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const router = Router()



router.route("/createOrder").post(createOrder) 


router.route('/prduct-buy').get(renderHtmlFile)  // url http://localhost:7000/api/v1/prduct-buy




export default router




