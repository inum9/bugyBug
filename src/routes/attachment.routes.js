import express from "express";
import { uploadAttachment } from "../controller/attachment.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.,middleware.js";
import { getAttchment } from "../controller/attachment.controller.js";
import { deleteAttachment } from "../controller/attachment.controller.js";

const router = express.Router();


router.route("/upload").post(
    upload.single("file"),verifyJwt,
        uploadAttachment
        
    
)
router.route("/all").get(verifyJwt,getAttchment)
router.route("/:id").delete(verifyJwt,deleteAttachment );

// add routes for GET, DELETE etc.

export default router;
