import { Comment } from "../model/comment.model.js";
import {Issue} from"../model/issue.model.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
  const { content, issueId } = req.body;

  if (!content || !issueId) {
    throw new ApiError(400, "Content and Issue ID are required");
  }

  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new ApiError(404, "Issue not found");
  }

  const comment = await Comment.create({
    content,
    issue: issueId,
    author: req.user._id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

export const getCommentsForIssue = asyncHandler(async (req, res) => {
  const { issueId } = req.params;

  const comments = await Comment.find({ issue: issueId })
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) throw new ApiError(404, "Comment not found");

  // Only the author can delete their comment
  if (!comment.author.equals(req.user._id)) {
    throw new ApiError(403, "Unauthorized to delete this comment");
  }

  await comment.deleteOne();
  res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

