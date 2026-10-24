import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addQuizAttempt,
  getQuizAttempts,
  getQuizAttempt,
} from "../../controller/QuizAttempt/add_QuizAttempt.js";

const router = express.Router();

router.use(protect);
router.post("/", addQuizAttempt);
router.get("/", getQuizAttempts);
router.get("/:id", getQuizAttempt);

export default router;