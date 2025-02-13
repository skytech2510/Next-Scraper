import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  ssoKey: String,
  susSession: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  enabled: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
