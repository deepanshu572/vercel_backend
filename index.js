import express from "express";
import cors from "cors"
import authRouter from "./routes/authRoute.js";
const app = express();
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import projectRouter from "./routes/projectRouter.js";
import taskRouter from "./routes/taskRoutes.js";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api/project", projectRouter);
app.use("/api/task", taskRouter);

app.listen(8080, async () => {
  console.log("server started");
  await connectDb();
});


