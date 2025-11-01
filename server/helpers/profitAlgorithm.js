// import Bet from "../models/Bet.js";
// import Meme from "../models/Meme.js";

// export const computeExpectedValue = async (memeId) => {
//   const bets = await Bet.find({ memeId });
//   const total = bets.reduce((a, b) => a + b.amount, 0);
//   const grouped = bets.reduce((acc, bet) => {
//     acc[bet.choice] = (acc[bet.choice] || 0) + bet.amount;
//     return acc;
//   }, {});

//   const reward = Object.entries(grouped).map(([choice, amt]) => ({
//     choice,
//     probability: amt / total,
//     expectedReward: (amt / total) * 100,
//   }));

//   return { total, reward };
// };
import Bet from "../models/Bet.js";
import Meme from "../models/Meme.js";

export const calculateProfit = async (memeId) => {
  const bets = await Bet.find({ memeId });
  if (!bets || bets.length === 0) return { total: 0, reward: [] };

  const total = bets.reduce((a, b) => a + (b.amount || 0), 0);

  const grouped = bets.reduce((acc, bet) => {
    acc[bet.choice] = (acc[bet.choice] || 0) + (bet.amount || 0);
    return acc;
  }, {});

  const reward = Object.entries(grouped).map(([choice, amt]) => ({
    choice,
    probability: amt / total,
    expectedReward: ((amt / total) * 100).toFixed(2),
  }));

  return { total, reward };
};
