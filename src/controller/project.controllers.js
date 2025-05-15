import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { Project } from "../model/project.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) throw new ApiError(400, "Project name is required");

  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
    members: [req.user._id],
  });

  res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  }).populate("owner", "name email");

  res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id).populate(
    "owner members",
    "name email"
  );
  if (!project) throw new ApiError(404, "Project not found");

  res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});
export const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, "Only owner can update the project");
  }

  project.name = name || project.name;
  project.description = description || project.description;
  await project.save();

  res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});
export const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, "Only owner can delete the project");
  }

  await project.deleteOne();
  res.status(200).json(new ApiResponse(200, {}, "Project deleted successfully"));
});

export const addMemberToProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) throw new ApiError(400, "User ID is required");

  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, "Only owner can add members");
  }

  if (project.members.includes(userId)) {
    throw new ApiError(400, "User already a member");
  }

  project.members.push(userId);
  await project.save();

  res.status(200).json(new ApiResponse(200, project, "Member added successfully"));
});
