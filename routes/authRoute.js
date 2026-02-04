import express from "express";
import { login, logout, register, getCurrentUser } from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/currentuser", isAuth, getCurrentUser);

export default authRouter;
