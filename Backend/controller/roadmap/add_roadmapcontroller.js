import mongoose from "mongoose";
import Roadmap from "../../models/Roadmap.js";

export const createRoadmap = async (req, res) => {
  try {
    console.log("Inside the createRoadmap function");

    let user = String(req.user._id || req.user.id);
    let field = req.body.field;
    let title = req.body.title;
    let steps = req.body.steps;
    let generatedByAI = req.body.generatedByAI;

    if (!field) {
      return res.status(400).json({
        message: "Field Required",
      });
    }

    let roadmap_created = await Roadmap.create({
      user: user,
      field: field,
      title: title,
      steps: steps,
      generatedByAI: generatedByAI,
    });

    res.status(200).json({
      message: "Roadmap Created Successfully",
      roadmap: roadmap_created,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getRoadmaps = async (req, res) => {
  try {
    console.log("Inside the getRoadmaps function");

    let user = String(req.user._id || req.user.id);

    let roadmaps = await Roadmap.find({ user: user }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Roadmaps Fetched Successfully",
      roadmaps: roadmaps,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getRoadmap = async (req, res) => {
  try {
    console.log("Inside the getRoadmap function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let roadmap = await Roadmap.findOne({ _id: id, user: user });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap Not Found",
      });
    }

    res.status(200).json({
      message: "Roadmap Fetched Successfully",
      roadmap: roadmap,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const updateStep = async (req, res) => {
  try {
    console.log("Inside the updateStep function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;
    let stepId = req.params.stepId;
    let completed = req.body.completed;

    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(stepId)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let roadmap = await Roadmap.findOne({ _id: id, user: user });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap Not Found",
      });
    }

    let step = roadmap.steps.id(stepId);

    if (!step) {
      return res.status(404).json({
        message: "Step Not Found",
      });
    }

    if (completed !== undefined) {
      step.completed = completed;
      step.completedAt = completed ? new Date() : undefined;
    }

    await roadmap.save();

    res.status(200).json({
      message: "Step Updated Successfully",
      roadmap: roadmap,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    console.log("Inside the deleteRoadmap function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let roadmap = await Roadmap.findOneAndDelete({ _id: id, user: user });

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap Not Found",
      });
    }

    res.status(200).json({
      message: "Roadmap Deleted Successfully",
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};