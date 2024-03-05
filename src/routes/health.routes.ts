import { Router } from "express";
const router = Router();
import { verifyJwt } from "../middlewares/auth.middleware.js";


import { healthCheck } from "../controllers/health.controller.js";              


router.route("/healthCheck").get(verifyJwt,healthCheck);


export default router;