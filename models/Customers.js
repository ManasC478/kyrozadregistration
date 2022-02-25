import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  // user id from the user collection
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "user id required"],
    unique: true,
  },
  // user's customer id from stripe. users cannot update this
  stripe_customer_id: {
    type: String,
    required: [true, "user's customer id required"],
    unique: true,
  },
});

export default mongoose.models.customer ||
  mongoose.model("customer", customerSchema);
