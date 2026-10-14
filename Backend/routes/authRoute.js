import express from "express";
import { signupuser, loginuser } from "../controller/authController.js";

const router = express.Router();

router.post("/signup", signupuser);
router.post("/login", loginuser);

export default router;
