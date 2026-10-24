import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  addPlannerTask,
  getPlannerTasks,
  updatePlannerTask,
  deletePlannerTask,
} from "../../controller/PlannerTask/add_PlannerTask.js";

const router = express.Router();

router.use(protect);
router.post("/", addPlannerTask);
router.get("/", getPlannerTasks);
router.patch("/:id", updatePlannerTask);
router.delete("/:id", deletePlannerTask);

export default router;