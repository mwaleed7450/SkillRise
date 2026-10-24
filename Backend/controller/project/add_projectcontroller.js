import mongoose from "mongoose";
import Project from "../../models/Project.js";

export const addProject = async (req, res) => {
  try {
    console.log("Inside the addProject function");

    let user = String(req.user._id || req.user.id);
    let title = req.body.title;
    let description = req.body.description;
    let techStack = req.body.techStack;
    let difficulty = req.body.difficulty;
    let status = req.body.status;
    let githubUrl = req.body.githubUrl;

    if (!title) {
      return res.status(400).json({
        message: "Title Required",
      });
    }

    let project_created = await Project.create({
      user: user,
      title: title,
      description: description,
      techStack: techStack,
      difficulty: difficulty,
      status: status,
      githubUrl: githubUrl,
      startedAt: status === "in-progress" ? new Date() : undefined,
      completedAt: status === "completed" ? new Date() : undefined,
    });

    res.status(200).json({
      message: "Project Created Successfully",
      project: project_created,
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

export const getProjects = async (req, res) => {
  try {
    console.log("Inside the getProjects function");

    let user = String(req.user._id || req.user.id);

    let projects = await Project.find({ user: user }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Projects Fetched Successfully",
      projects: projects,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getProject = async (req, res) => {
  try {
    console.log("Inside the getProject function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let project = await Project.findOne({ _id: id, user: user });

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      message: "Project Fetched Successfully",
      project: project,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    console.log("Inside the updateProject function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let project = await Project.findOne({ _id: id, user: user });

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    if (req.body.title !== undefined) project.title = req.body.title;
    if (req.body.description !== undefined) project.description = req.body.description;
    if (req.body.techStack !== undefined) project.techStack = req.body.techStack;
    if (req.body.difficulty !== undefined) project.difficulty = req.body.difficulty;
    if (req.body.githubUrl !== undefined) project.githubUrl = req.body.githubUrl;

    if (req.body.status !== undefined) {
      project.status = req.body.status;

      if (project.status === "in-progress" && !project.startedAt) {
        project.startedAt = new Date();
      }
      if (project.status === "completed" && !project.completedAt) {
        project.completedAt = new Date();
      }
    }

    await project.save();

    res.status(200).json({
      message: "Project Updated Successfully",
      project: project,
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

export const deleteProject = async (req, res) => {
  try {
    console.log("Inside the deleteProject function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let project = await Project.findOneAndDelete({ _id: id, user: user });

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    res.status(200).json({
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};