import { Router } from "express";
import { addMessage, getMessages } from "../controllers/MessageController.js";

const router = Router();

router.post("/add-message",addMessage);
router.get("/get-message/:from/:to",getMessages);

export default router;