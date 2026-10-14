import mongoose from "mongoose";
import Roadmap from "../models/Roadmap.js";

export const createRoadmap = async (req, res) => {
  try {
    const { field, title, steps, generatedByAI } = req.body;

    if (!field || !Array.isArray(steps) || steps.length === 0) {
      return res.status(400).json({ message: "field and steps required" });
    }

    const roadmap = await Roadmap.create({
      user: req.user.id,
      field,
      title,
      generatedByAI,
      steps: steps.map((s, i) => ({
        title: s.title,
        description: s.description,
        order: i + 1,
      })),
    });

    res.status(201).json({ message: "Roadmap created", roadmap });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ roadmaps });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getRoadmap = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user.id });
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.status(200).json({ roadmap });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateStep = async (req, res) => {
  try {
    const { id, stepId } = req.params;
    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(stepId)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const roadmap = await Roadmap.findOne({ _id: id, user: req.user.id });
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });

    const step = roadmap.steps.id(stepId);
    if (!step) return res.status(404).json({ message: "Step not found" });

    step.completed = Boolean(req.body.completed);
    step.completedAt = step.completed ? new Date() : undefined;
    await roadmap.save();

    res.status(200).json({ message: "Step updated", roadmap });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const roadmap = await Roadmap.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.status(200).json({ message: "Roadmap deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};