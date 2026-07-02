import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    estimatedTime: { type: String, required: true, trim: true },
    concepts: {
      type: [String],
      default: [],
      validate: {
        validator: (concepts) => concepts.every((concept) => typeof concept === "string" && concept.trim().length > 0),
        message: "Each concept must be a non-empty string."
      }
    },
    resources: {
      type: [
        {
          title: { type: String, required: true },
          type: { type: String, enum: ["video", "article", "documentation"], required: true },
          url: { type: String, required: true }
        }
      ],
      default: []
    }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subject: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    modules: { type: [moduleSchema], default: [] },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Course = mongoose.model("Course", courseSchema);
