import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Notification } from "../model/notification.model.js";

export const getUserNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, notifications, "Notifications fetched successfully")
  );
});

export const markNotificationRead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const notification = await Notification.findOne({ _id: id, user: req.user._id });
  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  notification.isRead = true;
  await notification.save();

  return res.status(200).json(
    new ApiResponse(200, notification, "Notification marked as read successfully")
  );
});

// Utility function to create notification (call this from other controllers)
export const createNotification = async (userId, message) => {
  try {
    const notification = new Notification({ user: userId, message });
    await notification.save();
  } catch (error) {
    console.error("Notification creation error:", error);
    
  }
};
