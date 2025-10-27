import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

export const stripeInstance = new Stripe(process.env.STRIPE_SECRET);
