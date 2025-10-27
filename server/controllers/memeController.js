import Meme from "../models/Meme.js";
import { uploadToCloudinary } from "../helpers/cloudinary.js";

export const uploadMeme = async (req, res, next) => {
  try {
    const file = req.file.path;
    const imageUrl = await uploadToCloudinary(file);
    const meme = await Meme.create({ ...req.body, imageUrl, user: req.user.id });
    res.status(201).json(meme);
  } catch (err) {
    next(err);
  }
};

export const listMemes = async (req, res, next) => {
  try {
    const memes = await Meme.find().populate("user", "username");
    res.json(memes);
  } catch (err) {
    next(err);
  }
};
