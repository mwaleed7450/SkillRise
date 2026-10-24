import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../../controller/project/add_projectcontroller.js";

const router = express.Router();

router.use(protect);
router.post("/", addProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;