import express from "express";
import {
    addNewOrder,
    getSingleOrder,
    getAllOrder,
    deleteOrder
} from "../controllers/order.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.use(verifyJwt)

router.route("/create-order/:productId/:quantity").post(addNewOrder)

router.route("/get-all-order").get(getAllOrder)
router.route("/get-single-order/:orderId").get(getSingleOrder)

router.route("/delete/:orderId").delete(deleteOrder)


export default router
