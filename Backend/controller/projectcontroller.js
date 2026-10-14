import mongoose from "mongoose";
import Project from "../models/Project.js";

const FIELDS = ["title", "description", "techStack", "difficulty", "status", "githubUrl"];

const pick = (body) => {
  const data = {};
  FIELDS.forEach((f) => {
    if (body[f] !== undefined) data[f] = body[f];
  });
  return data;
};


export const createProject = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "title required" });
    }
    const data = pick(req.body);
    if (data.status === "in-progress") data.startedAt = new Date();
    if (data.status === "completed") data.completedAt = new Date();

    const project = await Project.create({ ...data, user: req.user.id });
    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const updateProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const data = pick(req.body);
    if (data.status === "in-progress") data.startedAt = new Date();
    if (data.status === "completed") data.completedAt = new Date();

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: data },
      { new: true, runValidators: true },
    );
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};