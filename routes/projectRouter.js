import express from "express";
import {
 createProject,
 getUserProjects
} from "../controllers/projectController.js";
import  isAuth from "../middleware/isAuth.js";
const projectRouter = express.Router();

projectRouter.post("/create", isAuth, createProject);
projectRouter.get("/all", isAuth, getUserProjects);

export default projectRouter;