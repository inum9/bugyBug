import { Router } from "express";
import {
  createIssue,getIssueById,updateIssue,deleteIssue,updateIssueStatus,updateIssuePriority
 
} from "../controller/issues.controller.js"

import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

// All issue-related routes (secured)
router.route("/")
  .post(verifyJwt, createIssue)      
//   .get(verifyJwt, listIssues);        

router.route("/:id")
  .get(verifyJwt, getIssueById)       
   .put(verifyJwt, updateIssue)        
  .delete(verifyJwt, deleteIssue);  
  


router.patch("/:id/status", verifyJwt, updateIssueStatus);
router.patch("/:id/priority", verifyJwt, updateIssuePriority);


export default router;
