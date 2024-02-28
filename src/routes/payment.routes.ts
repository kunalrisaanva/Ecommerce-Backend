import { Router , static as static_  } from "express"
import { checkOut, createOrder } from "../controllers/payment.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {fileURLToPath} from "url"
import path from "path";
const router = Router()



const __filename = fileURLToPath(import.meta.url);
const htmlFilePath = path.join(path.dirname(__filename), '../../public/index.html');
// console.log(htmlFilePath);




router.route("/createOrder").post(createOrder)



router.get('/prduct-buy', (req, res) => {    // url http://localhost:7000/api/v1/prduct-buy
   res.sendFile(htmlFilePath)
})




export default router




