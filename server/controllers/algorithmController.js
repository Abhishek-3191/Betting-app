import { computeExpectedValue } from "../helpers/profitAlgorithm.js";

export const runAlgorithm = async (req, res, next) => {
  try {
    const { memeId } = req.body;
    const result = await computeExpectedValue(memeId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
