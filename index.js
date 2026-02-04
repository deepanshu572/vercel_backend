import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import projectRouter from "./routes/projectRouter.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use(
  cors({
    origin: [
      "https://vercel-frontend-beta-one.vercel.app",
    ],
    credentials: true,
  }),
);

await connectDb();

app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);

export default app;
