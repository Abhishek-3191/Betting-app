import Bet from "../models/Bet.js";
import Wallet from "../models/Wallet.js";
import { calculateProfit } from "../helpers/profitAlgorithm.js";

export const placeBet = async (req, res, next) => {
  try {
    const { memeId, amount, choice } = req.body;
    const wallet = await Wallet.findOne({ userId: req.user.id });

    if (wallet.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    wallet.balance -= amount;
    await wallet.save();

    const bet = await Bet.create({
      userId: req.user.id,
      memeId,
      amount,
      choice,
    });

    res.json(bet);
  } catch (err) {
    next(err);
  }
};

export const getPool = async (req, res, next) => {
  try {
    const { memeId } = req.params;
    const pool = await Bet.find({ memeId });
    res.json(pool);
  } catch (err) {
    next(err);
  }
};
