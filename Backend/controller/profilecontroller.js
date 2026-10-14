import Profile from "../models/Profile.js";

const FIELDS = [
  "field", "goal", "level", "hours", "education", "city",
  "existingSkills", "completedSkills", "onboardingDone",
];


export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.status(200).json({ profile }); // profile = null if not created yet
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const data = {};
    FIELDS.forEach((f) => {
      if (req.body[f] !== undefined) data[f] = req.body[f];
    });

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: data },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    res.status(200).json({ message: "Profile saved", profile });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};