import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Issue } from "../model/issue.model.js";

const createIssue = asyncHandler(async (req, res) => {
  const issueData = req.body;
  issueData.createdBy = req.user._id;
  const newIssue = await Issue.create(issueData);
  if (!issueData) {
    throw new ApiError(400, "issue is not created!!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newIssue, "new Issue is created successfully!!")
    );
});

const getIssueById = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate(
    "createdBy assignedTo comments project"
  );
  if (!issue) throw new ApiError(404, "Issue not found");
  res.status(200).json(new ApiResponse(200, issue));
});

const updateIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) throw new ApiError(404, "Issue not found");

  Object.assign(issue, req.body);
  await issue.save();
  res
    .status(200)
    .json(new ApiResponse(200, issue, "Issue updated successfully"));
});

const deleteIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id);
  if (!issue) throw new ApiError(404, "Issue not found");

  await issue.remove();
  res.status(200).json(new ApiResponse(200, {}, "Issue deleted successfully"));
});


export { createIssue, getIssueById ,updateIssue,deleteIssue};
