import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addInterviewSession,
  getInterviewSessions,
  getInterviewSession,
  updateInterviewSession,
} from "../../controller/interviewSession/add_interviewSession.js";

const router = express.Router();

router.use(protect);
router.post("/", addInterviewSession);
router.get("/", getInterviewSessions);
router.get("/:id", getInterviewSession);
router.patch("/:id", updateInterviewSession);

export default router;