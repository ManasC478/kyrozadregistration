import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

// fetch the stripe object from the server and return it to client side
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    );
  }

  return stripePromise;
};
