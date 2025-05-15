import { Router } from "express";
import { changeCurrentPassword, refreshAccessToken, userLogin, userlogOut, userRegister } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth,middleware.js";
const rout=Router();

rout.route("/register").post(userRegister);
rout.route("/login").post(userLogin);

//secured routes
rout.route("/logout").post(verifyJwt,userlogOut);
rout.route("/refresh-token").post(refreshAccessToken);
rout.route("/change-Password").post(verifyJwt,changeCurrentPassword);

export default rout;