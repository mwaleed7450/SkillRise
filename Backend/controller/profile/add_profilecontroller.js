import Profile from "../../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    console.log("Inside the getProfile function");

    let user = String(req.user._id || req.user.id);

    let profile = await Profile.findOne({ user: user });

    res.status(200).json({
      message: "Profile Fetched Successfully",
      profile: profile,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const saveProfile = async (req, res) => {
  try {
    console.log("Inside the saveProfile function");

    let user = String(req.user._id || req.user.id);
    let field = req.body.field;
    let goal = req.body.goal;
    let level = req.body.level;
    let hours = req.body.hours;
    let education = req.body.education;
    let city = req.body.city;
    let existingSkills = req.body.existingSkills;
    let completedSkills = req.body.completedSkills;
    let onboardingDone = req.body.onboardingDone;

    let data = {};
    if (field !== undefined) data.field = field;
    if (goal !== undefined) data.goal = goal;
    if (level !== undefined) data.level = level;
    if (hours !== undefined) data.hours = hours;
    if (education !== undefined) data.education = education;
    if (city !== undefined) data.city = city;
    if (existingSkills !== undefined) data.existingSkills = existingSkills;
    if (completedSkills !== undefined) data.completedSkills = completedSkills;
    if (onboardingDone !== undefined) data.onboardingDone = onboardingDone;

    let profile_saved = await Profile.findOneAndUpdate(
      { user: user },
      { $set: data },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Profile Saved Successfully",
      profile: profile_saved,
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