import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: null }, // student | teacher | self-learner
    subjects: { type: [String], default: [] },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

