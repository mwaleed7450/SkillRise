import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addCourseProgress,
  getCourseProgress,
  updateCourseProgress,
} from "../../controller/CourseProgress/add_CourseProgress.js";

const router = express.Router();

router.use(protect);
router.post("/", addCourseProgress);
router.get("/", getCourseProgress);
router.patch("/:id", updateCourseProgress);

export default router;