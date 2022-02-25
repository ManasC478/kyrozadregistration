import Stripe from "stripe";

export const stripe = new Stripe(process.env.TEST_MODE_STRIPE_API_KEY, {
  apiVersion: "2020-08-27",
});
