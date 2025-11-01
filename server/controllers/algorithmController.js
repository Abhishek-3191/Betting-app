import { calculateProfit } from "../helpers/profitAlgorithm.js";

export const runAlgorithm = async (req, res, next) => {
  try {
    const { memeId } = req.body;
    const result = await calculateProfit(memeId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
