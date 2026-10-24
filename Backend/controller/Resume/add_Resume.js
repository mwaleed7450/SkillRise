import Resume from "../../models/Resume.js";

export const getResume = async (req, res) => {
  try {
    console.log("Inside the getResume function");

    let user = String(req.user._id || req.user.id);

    let resume = await Resume.findOne({ user: user });

    res.status(200).json({
      message: "Resume Fetched Successfully",
      resume: resume,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const saveResume = async (req, res) => {
  try {
    console.log("Inside the saveResume function");

    let user = String(req.user._id || req.user.id);
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phone = req.body.phone;
    let location = req.body.location;
    let linkedin = req.body.linkedin;
    let github = req.body.github;
    let summary = req.body.summary;
    let skills = req.body.skills;
    let education = req.body.education;
    let experience = req.body.experience;
    let projects = req.body.projects;

    let data = {};
    if (fullName !== undefined) data.fullName = fullName;
    if (email !== undefined) data.email = email;
    if (phone !== undefined) data.phone = phone;
    if (location !== undefined) data.location = location;
    if (linkedin !== undefined) data.linkedin = linkedin;
    if (github !== undefined) data.github = github;
    if (summary !== undefined) data.summary = summary;
    if (skills !== undefined) data.skills = skills;
    if (education !== undefined) data.education = education;
    if (experience !== undefined) data.experience = experience;
    if (projects !== undefined) data.projects = projects;

    let resume_saved = await Resume.findOneAndUpdate(
      { user: user },
      { $set: data },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Resume Saved Successfully",
      resume: resume_saved,
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

export const deleteResume = async (req, res) => {
  try {
    console.log("Inside the deleteResume function");

    let user = String(req.user._id || req.user.id);

    let resume = await Resume.findOneAndDelete({ user: user });

    if (!resume) {
      return res.status(404).json({
        message: "Resume Not Found",
      });
    }

    res.status(200).json({
      message: "Resume Deleted Successfully",
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};