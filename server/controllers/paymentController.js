import { stripeInstance } from "../helpers/stripe.js";
import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const intent = await stripeInstance.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      metadata: { userId: req.user.id },
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    next(err);
  }
};

export const handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const wallet = await Wallet.findOne({ userId: intent.metadata.userId });
    wallet.balance += intent.amount / 100;
    await wallet.save();

    await Transaction.create({
      userId: intent.metadata.userId,
      amount: intent.amount / 100,
      type: "deposit",
      status: "success",
    });
  }

  res.json({ received: true });
};
