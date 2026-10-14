import express from "express";
import { getProfile, saveProfile } from "../controller/profilecontroller.js";
import { protect } from "../middleware/auth.js";;

const router = express.Router();

router.use(protect);
router.get("/", getProfile);
router.put("/", saveProfile);

export default router;