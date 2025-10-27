import express from "express";
import {
  createPaymentIntent,
  handleWebhook,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post("/create-intent", protect, createPaymentIntent);
router.post("/webhook", bodyParser.raw({ type: "application/json" }), handleWebhook);

export default router;
