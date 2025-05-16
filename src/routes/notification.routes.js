import { Router } from "express";
import { getUserNotifications, markNotificationRead } from "../controller/notification.controller.js";
import { verifyJwt } from "../middleware/auth,middleware.js";

const router = Router();

router.route("/").get(verifyJwt, getUserNotifications);
router.route("/:id/read").post(verifyJwt, markNotificationRead);

export default router;
