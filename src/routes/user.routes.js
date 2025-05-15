import { Router } from "express";
import { userLogin, userlogOut, userRegister } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth,middleware.js";
const rout=Router();

rout.route("/register").post(userRegister);
rout.route("/login").post(userLogin);

//secured routes
rout.route("/logout").post(verifyJwt,userlogOut);

export default rout;