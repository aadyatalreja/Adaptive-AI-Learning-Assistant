import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subject: { type: String, required: true, trim: true },
    results: [
      {
        concept: { type: String, required: true },
        score: { type: Number, required: true }, // 0 - 100
        category: { type: String, enum: ["weak", "medium", "strong"], required: true }
      }
    ],
    xpAwarded: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Assessment = mongoose.model("Assessment", assessmentSchema);
