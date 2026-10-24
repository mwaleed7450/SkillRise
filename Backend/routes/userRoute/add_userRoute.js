import express from "express";
import { protect } from "../../middleware/auth.js";
import { getMe } from "../../controller/user/add_user.js";

const router = express.Router();

router.get("/me", protect, getMe);

export default router;