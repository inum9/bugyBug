import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../model/user.model.js";
import { json } from "express";

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { password }, { name }],
  });

  if (existedUser) {
    throw new ApiError(400, "user is already exist , please login !");
  }

  const registerUser = await User.create({
    name,
    email,
    password,
  });
  if (!registerUser) {
    throw new ApiError(400, "user is not register!");
  }
     const createdUser = await User.findById(registerUser._id).select(
        "-password -refreshToken"
    )

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user is register successfully!"));
});

export { userRegister };
