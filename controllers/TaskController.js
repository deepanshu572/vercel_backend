import Tasks from "../models/TaskModel.js";
import Project from "../models/ProjectModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, projectId } = req.body;
    if (!title || !projectId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTask = await Tasks.create({
      title,
      projectId,
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getUserTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const userId = req.userId;
    const projects = await Project.findOne({ _id : projectId });
    console.log(projects);
    const tasks = await Tasks.find({
      projectId: projectId,
    });

    res.status(200).json({ tasks, projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const togleTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Tasks.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res.status(200).json({ message: "Task status updated", task });
  } catch (err) {
    console.log(err);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Tasks.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateTaskTitle = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const task = await Tasks.findByIdAndUpdate(
        req.params.taskId,
      { title },
      { new: true, runValidators: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
