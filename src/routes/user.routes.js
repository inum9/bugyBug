import { Router } from "express";
import { userRegister } from "../controller/user.controller.js";
const rout=Router();

rout.route("/register").post(userRegister);

export default rout;