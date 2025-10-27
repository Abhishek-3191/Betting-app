import express from "express";
import { uploadMeme, listMemes } from "../controllers/memeController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadMeme);
router.get("/", listMemes);

export default router;
