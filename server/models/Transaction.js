import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["deposit", "withdraw", "bet", "win", "platform_fee"],
      required: true,
    },
    status: { type: String, enum: ["pending", "success", "failed"], default: "success" },
    referenceId: { type: String }, // Stripe/Razorpay txn id
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
