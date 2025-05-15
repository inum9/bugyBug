import { Router } from "express";
import {
  createIssue,getIssueById,updateIssue,deleteIssue
 
} from "../controller/issues.controller.js"

import { verifyJwt } from "../middleware/auth,middleware.js";

const router = Router();

// All issue-related routes (secured)
router.route("/")
  .post(verifyJwt, createIssue)      
//   .get(verifyJwt, listIssues);        

router.route("/:id")
  .get(verifyJwt, getIssueById)       
   .put(verifyJwt, updateIssue)        
  .delete(verifyJwt, deleteIssue);    

export default router;
