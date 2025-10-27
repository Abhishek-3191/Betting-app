import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import memeRoutes from "./routes/memeRoutes.js";
import betRoutes from "./routes/betRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import algorithmRoutes from "./routes/algorithmRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import "./helpers/scheduler.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/memes", memeRoutes);
app.use("/api/bets", betRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/algorithm", algorithmRoutes);

// Error handler
app.use(errorHandler);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("Mongo error:", err));
