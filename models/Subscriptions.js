import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  // subscription id from stripe
  stripe_subscription_id: {
    type: String,
    required: [true, "subscription id required"],
    unique: true,
  },
  // subscription's availabilty for purchase
  active: {
    type: Boolean,
    required: [true, "active status required"],
  },
  // subscription's name, meant to be displayed to the customer
  name: {
    type: String,
    required: [true, "subscription name required"],
    minLength: [3, "minimum name length is 3 characters"],
    maxLength: [20, "maximum name length is 20 characters"],
  },
  // subscription's services, mean to be displayed to the customer
  services: {
    type: [String],
    required: [true, "required atleast one service"],
  },
  // subscription's price
  price: {
    type: String,
    required: [true, "subscription's price is required"],
  },
  // subscription's image as url from stripe
  image: {
    type: String,
  },
  // key-value pars, to store additional information
  metadata: {
    type: Map,
    of: String,
  },
});

export default mongoose.models.subscription ||
  mongoose.model("subscription", subscriptionSchema);
