import mongoose from "mongoose";

const betSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    memeId: { type: mongoose.Schema.Types.ObjectId, ref: "Meme", required: true },
    amount: { type: Number, required: true },
    choice: { type: String }, // optional for algo (like yes/no, up/down etc.)
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Bet", betSchema);
