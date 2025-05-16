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



 const updateIssueStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatus = ["Open", "In Progress", "Resolved", "Closed"];
  if (!validStatus.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const issue = await Issue.findById(id);
  if (!issue) throw new ApiError(404, "Issue not found");

  issue.status = status;
  await issue.save();

  res.status(200).json(new ApiResponse(200, issue, "Issue status updated"));
});

 const updateIssuePriority = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;

  const validPriorities = ["Low", "Medium", "High", "Critical"];
  if (!validPriorities.includes(priority)) {
    throw new ApiError(400, "Invalid priority");
  }

  const issue = await Issue.findById(id);
  if (!issue) throw new ApiError(404, "Issue not found");

  issue.priority = priority;
  await issue.save();

  res.status(200).json(new ApiResponse(200, issue, "Issue priority updated"));
});



export { createIssue, getIssueById ,updateIssue,deleteIssue,updateIssueStatus,updateIssuePriority};
