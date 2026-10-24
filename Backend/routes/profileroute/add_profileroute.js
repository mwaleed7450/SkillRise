import express from "express";
import { getProfile, saveProfile } from "../../controller/profile/add_profilecontroller.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/", getProfile);
router.put("/", saveProfile);

export default router;