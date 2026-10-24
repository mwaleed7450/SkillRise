import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  createRoadmap,
  getRoadmaps,
  getRoadmap,
  updateStep,
  deleteRoadmap,
} from "../../controller/roadmap/add_roadmapcontroller.js";

const router = express.Router();

router.use(protect);
router.post("/", createRoadmap);
router.get("/", getRoadmaps);
router.get("/:id", getRoadmap);
router.patch("/:id/steps/:stepId", updateStep);
router.delete("/:id", deleteRoadmap);

export default router;