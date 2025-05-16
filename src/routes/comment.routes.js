import { Router } from "express";
import {
  createComment,
  getCommentsForIssue,
  deleteComment,
} from "../controller/comment.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

// Create a new comment
router.route("/create").post(verifyJwt, createComment);

// Get all comments for an issue
router.route("/issue/:issueId").get(verifyJwt, getCommentsForIssue);

// Delete a comment
router.route("/:id").delete(verifyJwt, deleteComment);

export default router;
