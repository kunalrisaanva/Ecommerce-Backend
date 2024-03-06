import { Router } from "express";
const router = Router();

import { healthCheck } from "../controllers/health.controller.js";              

router.route("/healthCheck").get(healthCheck);


export default router;