import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Project } from "../model/project.model.js";
import { Issue } from "../model/issue.model.js";
import { Comment } from "../model/comment.model.js";
import { Notification } from "../model/notification.model.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Count projects where user is owner or member
  const totalProjects = await Project.countDocuments({
    $or: [{ owner: userId }, { members: userId }],
  });

  // Count issues assigned to user or created by user
  const totalIssues = await Issue.countDocuments({
    $or: [{ assignedTo: userId }, { createdBy: userId }],
  });

  // Count comments created by user
  const totalComments = await Comment.countDocuments({ createdBy: userId });

  // Count unread notifications
  const unreadNotifications = await Notification.countDocuments({
    user: userId,
    isRead: false,
  });

  return res.status(200).json(
    new ApiResponse(200, {
      totalProjects,
      totalIssues,
      totalComments,
      unreadNotifications,
    }, "Dashboard stats fetched successfully")
  );
});
