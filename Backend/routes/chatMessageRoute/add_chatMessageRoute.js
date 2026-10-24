import express from "express";
import { protect } from "../../middleware/auth.js";
import { addMessage, getMessages } from "../../controller/ChatMessage/add_ChatMessage.js";

const router = express.Router();

router.use(protect);
router.post("/", addMessage);
router.get("/", getMessages);

export default router;
