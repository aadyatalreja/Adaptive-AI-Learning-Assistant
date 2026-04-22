export async function weakAreas(_req, res) {
  res.json({
    areas: [
      {
        concept: "Backpropagation",
        weakness: "High",
        recommended: ["Gradient Descent", "Partial Derivatives"]
      },
      {
        concept: "Classification calibration",
        weakness: "Medium",
        recommended: ["Precision/Recall tradeoff", "ROC-AUC"]
      }
    ]
  });
}

