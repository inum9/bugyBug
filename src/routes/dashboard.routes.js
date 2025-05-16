import { Router } from "express";
import { getDashboardStats } from "../controller/dashboard.controller.js";
import { verifyJwt } from "../middleware/auth,middleware.js";

const router = Router();

router.route("/").get(verifyJwt, getDashboardStats);

export default router;
