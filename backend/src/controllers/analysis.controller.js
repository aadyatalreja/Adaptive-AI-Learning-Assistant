import { Assessment } from "../models/Assessment.js";
import { generatePrerequisites } from "../utils/llmClient.js";

export async function weakAreas(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Get the latest assessment for this user
    const assessment = await Assessment.findOne({ userId }).sort({ createdAt: -1 });

    if (!assessment || !assessment.results) {
      return res.json({ areas: [] });
    }

    // Filter concepts based on scores:
    // - score below 40% → High Priority
    // - score between 40–70% → Medium Priority
    // - score above 70% → Do NOT display
    const weakResults = assessment.results
      .filter((r) => r.score < 70)
      .map((r) => ({
        concept: r.concept,
        score: r.score,
        weakness: r.score < 40 ? "High" : "Medium"
      }));

    if (weakResults.length === 0) {
      return res.json({ areas: [] });
    }

    // Generate prerequisites for these concepts
    const concepts = weakResults.map((r) => r.concept);
    const { prerequisites } = await generatePrerequisites(concepts);

    // Merge results
    const areas = weakResults.map((r) => {
      const prereq = prerequisites.find((p) => p.concept === r.concept) || { recommended: ["Foundational review"] };
      return {
        concept: r.concept,
        weakness: r.weakness,
        recommended: prereq.recommended
      };
    });

    res.json({ areas });
  } catch (err) {
    next(err);
  }
}

