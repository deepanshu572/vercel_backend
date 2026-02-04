import Project from "../models/ProjectModel.js";

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;
    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const NewProject = await Project.create({
      title,
      description,
      userId,
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: NewProject });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserProjects = async (req, res) => {
    try{
        const userId = req.userId;
        const projects = await Project.find({ userId });
        res.status(200).json({ projects });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}