import mongoose from "mongoose";

const memeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // seller
    status: { type: String, enum: ["active", "sold", "expired"], default: "active" },
    price: { type: Number, default: 0 },   // can use for starting bid or final value
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // buyer after 24 hrs
  },
  { timestamps: true }
);

export default mongoose.model("Meme", memeSchema);
