import { Router } from "express";
import { userLogin, userRegister } from "../controller/user.controller.js";
const rout=Router();

rout.route("/register").post(userRegister);
rout.route("/login").post(userLogin);

export default rout;