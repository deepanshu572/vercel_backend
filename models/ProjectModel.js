import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
    description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   
});
const Project = mongoose.model("Project", ProjectSchema);

export default Project;
