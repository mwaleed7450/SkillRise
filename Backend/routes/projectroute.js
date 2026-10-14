import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controller/projectcontroller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.post("/", createProject);
router.get("/", getProjects);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;