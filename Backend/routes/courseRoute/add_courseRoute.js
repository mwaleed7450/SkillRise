import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../../controller/course/add_course.js";

const router = express.Router();

router.use(protect);
router.post("/", addCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;