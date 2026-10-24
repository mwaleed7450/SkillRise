import mongoose from "mongoose";
import QuizAttempt from "../../models/QuizAttempt.js";

export const addQuizAttempt = async (req, res) => {
  try {
    console.log("Inside the addQuizAttempt function");

    let user = String(req.user._id || req.user.id);
    let topic = req.body.topic;
    let difficulty = req.body.difficulty;
    let answers = req.body.answers;
    let xpEarned = req.body.xpEarned;

    if (!topic || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        message: "Topic and Answers Required",
      });
    }

    let total = answers.length;
    let score = answers.filter((a) => a.selectedIndex === a.correctIndex).length;

    let attempt_created = await QuizAttempt.create({
      user: user,
      topic: topic,
      difficulty: difficulty,
      answers: answers,
      score: score,
      total: total,
      xpEarned: xpEarned,
    });

    res.status(200).json({
      message: "Quiz Attempt Created Successfully",
      attempt: attempt_created,
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

export const getQuizAttempts = async (req, res) => {
  try {
    console.log("Inside the getQuizAttempts function");

    let user = String(req.user._id || req.user.id);

    let attempts = await QuizAttempt.find({ user: user }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Quiz Attempts Fetched Successfully",
      attempts: attempts,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};

export const getQuizAttempt = async (req, res) => {
  try {
    console.log("Inside the getQuizAttempt function");

    let user = String(req.user._id || req.user.id);
    let id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    let attempt = await QuizAttempt.findOne({ _id: id, user: user });

    if (!attempt) {
      return res.status(404).json({
        message: "Quiz Attempt Not Found",
      });
    }

    res.status(200).json({
      message: "Quiz Attempt Fetched Successfully",
      attempt: attempt,
    });
  } catch (error) {
    console.log(JSON.stringify(error));

    res.status(500).json({
      message: "Something Went Wrong, Please Contact Support",
    });
  }
};