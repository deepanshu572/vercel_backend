import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
