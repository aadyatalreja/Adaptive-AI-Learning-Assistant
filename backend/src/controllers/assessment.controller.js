import { httpError } from "../utils/httpError.js";

export async function getQuestions(_req, res) {
  res.json({
    questions: [
      {
        id: "q1",
        text: "Which loss function is commonly used for regression problems?",
        concept: "Regression",
        options: [
          { id: "a", label: "Cross-entropy loss" },
          { id: "b", label: "Mean squared error" },
          { id: "c", label: "Hinge loss" },
          { id: "d", label: "KL divergence" }
        ]
      },
      {
        id: "q2",
        text: "Backpropagation primarily relies on which mathematical operation?",
        concept: "Neural Networks",
        options: [
          { id: "a", label: "Matrix inversion" },
          { id: "b", label: "Gradient computation via chain rule" },
          { id: "c", label: "Fourier transform" },
          { id: "d", label: "Sampling" }
        ]
      }
    ]
  });
}

export async function submit(req, res, next) {
  try {
    const { answers } = req.body || {};
    if (!answers || typeof answers !== "object") return next(httpError(400, "Missing answers"));

    // Stub scoring for now (replace with real evaluation later).
    res.json({
      xpAward: 120,
      results: {
        concepts: [
          { name: "Regression", score: 80 },
          { name: "Classification", score: 60 },
          { name: "Neural Networks", score: 30 }
        ]
      }
    });
  } catch (e) {
    next(e);
  }
}

