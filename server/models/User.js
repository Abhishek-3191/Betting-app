import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    memesUploaded: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meme" }], // memes created by user
    memesBought: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meme" }],   // memes purchased via betting
    wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },         // wallet reference
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
