import express from "express";
import { createTask, getUserTasks,togleTaskStatus, deleteTask, updateTaskTitle} from "../controllers/TaskController.js";
import isAuth from "../middleware/isAuth.js";
const taskRouter = express.Router();

taskRouter.post("/create", isAuth, createTask);
taskRouter.get("/projects/:projectId/allTask",isAuth, getUserTasks);
taskRouter.put("/togle/:taskId",isAuth, togleTaskStatus);
taskRouter.delete("/delete/:taskId",isAuth, deleteTask);
taskRouter.put("/update/:taskId",isAuth, updateTaskTitle);

export default taskRouter;
