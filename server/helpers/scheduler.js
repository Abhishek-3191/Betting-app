import cron from "node-cron";
import Bet from "../models/Bet.js";

cron.schedule("0 * * * *", async () => {
  const expired = await Bet.updateMany(
    { status: "open", createdAt: { $lte: Date.now() - 24 * 60 * 60 * 1000 } },
    { status: "closed" }
  );
  if (expired.modifiedCount > 0)
    console.log(`⏰ Closed ${expired.modifiedCount} expired bets`);
});
