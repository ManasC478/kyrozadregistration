import mongoose from "mongoose";

/**
 * SUBSCRIPTIONS
 * Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "subscription userId required"],
  },
  // subscription id from stripe
  stripeSubscriptionId: {
    type: String,
    required: [true, "subscription id required"],
    unique: true,
  },
  // subscription status, can only one of the provided values
  status: {
    type: String,
    enum: {
      values: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
      ],
      message: "{VALUE} is ont supported",
    },
  },
  // key-value pars, to store additional information
  metadata: {
    type: Map,
    of: String,
  },
  // ID of the price that created this subscription.
  stripePriceId: {
    type: String,
    required: [true, "price id required"],
    unique: true,
  },
  // Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.
  quantity: {
    type: Number,
  },
  // If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancelAtPeriodEnd: {
    type: Boolean,
  },
  // Time at which the subscription was created.
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   Start of the current period that the subscription has been invoiced for.
  currentPeriodStart: {
    type: Date,
    default: Date.now,
    required: [true, "current period start required"],
  },
  // End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  currentPeriodEnd: {
    type: Date,
    default: Date.now,
    required: [true, "current period end required"],
  },
  // If the subscription has ended, the timestamp of the date the subscription ended.
  endedAt: {
    type: Date,
    default: Date.now,
  },
  // A date in the future at which the subscription will automatically get canceled.
  cancelAt: {
    type: Date,
    default: Date.now,
  },
  // If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceledAt: {
    type: Date,
    default: Date.now,
  },
  // If the subscription has a trial, the beginning of that trial.
  trialStart: {
    type: Date,
    default: Date.now,
  },
  // If the subscription has a trial, the end of that trial.
  trialEnd: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.subscription ||
  mongoose.model("subscription", subscriptionSchema);
