import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberToProject
} from "../controller/project.controllers.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

// Secure all routes
router.use(verifyJwt);

// Routes
router.route("/")
  .post(createProject)        
  .get(getAllProjects);       // Get all projects for the user

router.route("/:id")
  .get(getProjectById)       
  .put(updateProject)         
  .delete(deleteProject);    

router.route("/:id/add-member")
  .post(addMemberToProject);  

export default router;
