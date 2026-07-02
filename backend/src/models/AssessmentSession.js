import mongoose from "mongoose";

const assessmentSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subject: { type: String, required: true },
    questions: [
      {
        question: String,
        options: [String],
        answer: String,
        concept: String
      }
    ],
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // Session expires in 1 hour
  },
  { versionKey: false }
);

export const AssessmentSession = mongoose.model("AssessmentSession", assessmentSessionSchema);
