import mongoose from "mongoose";

/**
 * PRODUCTS
 * Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
const productSchema = new mongoose.Schema({
  // product id from stripe
  stripeProductId: {
    type: String,
    required: [true, "product id required"],
    unique: true,
  },
  // product's availabilty for purchase
  active: {
    type: Boolean,
    required: [true, "active status required"],
  },
  // product's name, meant to be displayed to the customer
  name: {
    type: String,
    required: [true, "product name required"],
    minLength: [3, "minimum name length is 3 characters"],
    maxLength: [20, "maximum name length is 20 characters"],
  },
  // product's description
  description: {
    type: String,
  },
  // product's image as url from stripe
  image: {
    type: String,
  },
  // key-value pars, to store additional information
  metadata: {
    type: Map,
    of: String,
  },
});

export default mongoose.models.product ||
  mongoose.model("product", productSchema);
