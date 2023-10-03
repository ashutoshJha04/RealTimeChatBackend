import { Router } from "express";
import { addImageMessage, addMessage, getMessages, getinitialcontacts } from "../controllers/MessageController.js";
import multer from "multer"

const router = Router();

const uploadImage = multer({dest:"uploads/images"});

router.post("/add-message",addMessage);
router.get("/get-message/:from/:to",getMessages);
router.post("/add-image-message",uploadImage.single("image"),addImageMessage);
router.get("/get-initial-contacts/:from",getinitialcontacts);

export default router;