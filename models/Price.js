import mongoose from "mongoose";

/**
 * PRICES
 * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
const priceSchema = new mongoose.Schema({
  // price id from stripe
  stripePriceId: {
    type: String,
    required: [true, "price id required"],
    unique: true,
  },
  // The ID of the prduct that this price belongs to.
  stripeProductId: {
    type: String,
    ref: "product",
  },
  // Whether the price can be used for new purchases.
  active: {
    type: Boolean,
    default: true,
  },
  // A brief description of the price.

  description: {
    type: String,
    required: [true, "price description required"],
  },
  // The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).

  unitAmount: {
    type: Number,
    required: [true, "price unit amount required"],
  },
  // Three-letter ISO currency code, in lowercase.
  currency: {
    type: String,
    validate: {
      validator: (curr) => {
        return curr.length === 3;
      },
      message: (props) => `${props.value} is not a valid currency ISO`,
    },
  },
  // One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
  type: {
    type: String,
    enum: {
      values: ["one_time", "recurring"],
      message: "{VALUE} is ont supported",
    },
  },
  // The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
  interval: {
    type: String,
    enum: {
      values: ["day", "week", "month", "year"],
      message: "{VALUE} is ont supported",
    },
  },
  // The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
  intervalCount: {
    type: Number,
  },
  // Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trialPeriodDays: {
    type: Number,
  },
  // Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata: {
    type: Map,
    of: String,
  },
});

export default mongoose.models.price || mongoose.model("price", priceSchema);
