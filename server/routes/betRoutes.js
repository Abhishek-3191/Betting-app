import express from "express";
import { placeBet, getPool } from "../controllers/betController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeBet);
router.get("/:memeId", protect, getPool);

export default router;
