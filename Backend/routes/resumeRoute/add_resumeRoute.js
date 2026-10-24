import express from "express";
import { protect } from "../../middleware/auth.js";
import {
  getResume,
  saveResume,
  deleteResume,
} from "../../controller/Resume/add_Resume.js";

const router = express.Router();

router.use(protect);
router.get("/", getResume);
router.put("/", saveResume);
router.delete("/", deleteResume);

export default router;