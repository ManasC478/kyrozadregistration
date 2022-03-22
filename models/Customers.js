import mongoose from "mongoose";

/**
 * CUSTOMERS
 * Note: this is a private collection that contains a mapping of user IDs to Stripe customer IDs.
 */
const customerSchema = new mongoose.Schema({
  // user id from the user collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id required"],
    unique: true,
  },
  // user's customer id from stripe. users cannot update this
  stripeCustomerId: {
    type: String,
    required: [true, "user's customer id required"],
    unique: true,
  },
});

export default mongoose.models.customer ||
  mongoose.model("customer", customerSchema);
