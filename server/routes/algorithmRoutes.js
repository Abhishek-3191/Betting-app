import express from "express";
import { runAlgorithm } from "../controllers/algorithmController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/run", protect, runAlgorithm);

export default router;
