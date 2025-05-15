import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrorr.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../model/user.model.js";
import { json } from "express";


const userRegister= asyncHandler(async(req,res)=>{
            res.status(200).json(new ApiResponse(200,"hello controller is working fine !!"));
});


export {userRegister};