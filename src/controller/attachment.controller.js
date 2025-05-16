import { asyncHandler } from "../utils/asyncHandler.js";
import { Attachment } from "../model/attachment.model.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

const uploadAttachment = asyncHandler(async (req, res) => {
  const { file } = req;
  if (!file || !file.path) {
    throw new ApiError(400, "No valid file uploaded");
  }

  const result = await uploadonCloudinary(file.path);
  if (!result?.secure_url) {
    throw new ApiError(500, "Upload to Cloudinary failed");
  }

  const attachment = new Attachment({
    fileName: file.originalname,
    fileUrl: result.secure_url,
    uploadedBy: req.user._id,
  });

  await attachment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, attachment, "Attachment uploaded successfully"));
});

const getAttchment = asyncHandler(async (req, res) => {
  const getUser = await Attachment.find({
    uploadedBy: req.user._id,
  });
  if (!getUser) {
    throw new ApiError(401, "attachment not fetched!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, getUser, "attachement fetched Sucessfully!!"));
});
const deleteAttachment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "id is not available !");
  }

  const attachement = await Attachment.findById(id);
  if (!attachement) {
    throw new ApiError(401, "attachment is not available!");
  }

    if (attachement.uploadedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this file");
  }
  await cloudinary.uploader.destroy(attachement.cloudinaryId);
  await attachement.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Attachment deleted successfully"));

});

export { uploadAttachment,getAttchment,deleteAttachment };
