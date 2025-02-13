import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  location: String,
  age: {
    type: Number,
    required: false,
    default: null,
  },
  lastSeen: String,
  avatar: String,
  sumary: String,
  intro: String,
  lifeStory: String,
  freeTime: String,
  other: String,
  accomplishments: String,
  education: [String],
  employment: [String],
  startup: {
    name: String,
    description: String,
    progress: String,
    funding: String,
  },
  cofounderPreferences: {
    requirements: [String],
    idealPersonality: String,
    equity: String,
  },
  interests: {
    shared: [String],
    personal: [String],
  },
  linkedIn: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["default", "active", "pending", "archived"],
    default: "default",
  }
});

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
