import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

export const getWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    res.json(wallet);
  } catch (err) {
    next(err);
  }
};

export const deposit = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.user.id });
    wallet.balance += amount;
    await wallet.save();

    await Transaction.create({ userId: req.user.id, type: "deposit", amount });
    res.json(wallet);
  } catch (err) {
    next(err);
  }
};
