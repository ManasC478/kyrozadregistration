import mongoose from "mongoose";
import { isEmail } from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name required"],
    trim: true,
    maxLength: [25, "maximum name length is 25 characters"],
  },
  email: {
    type: String,
    required: [true, "user email required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "not an email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "user password required"],
  },
  createdAt: { type: Date, default: Date.now() },
  number: {
    type: String,
  },
  phoneCode: {
    type: String,
  },
  url: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
  },
  image: { type: String, default: "default" },
  imageColor: {
    type: String,
    required: [true, "user image background required"],
    trim: true,
  },
  signinProvider: {
    type: String,
    required: [true, "signin provider required"],
  },
  billingAddress: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
