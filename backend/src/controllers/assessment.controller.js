import { httpError } from "../utils/httpError.js";
import { generateAssessmentQuestions } from "../utils/llmClient.js";
import { AssessmentSession } from "../models/AssessmentSession.js";
import { Assessment } from "../models/Assessment.js";
import { User } from "../models/User.js";

export async function generate(req, res, next) {
  try {
    const { subject } = req.query;
    const userId = req.user?.id || req.user?._id;
    if (!subject) return next(httpError(400, "Subject is required"));
    if (!userId) return next(httpError(401, "Unauthorized"));

    const data = await generateAssessmentQuestions(subject);
    
    // Store questions in a session to verify answers on submission
    const session = await AssessmentSession.create({
      userId,
      subject,
      questions: data.questions
    });

    res.json({
      sessionId: session._id,
      questions: data.questions
    });
  } catch (e) {
    next(e);
  }
}

export async function checkStatus(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return next(httpError(401, "Unauthorized"));

    const assessment = await Assessment.findOne({ userId });
    res.json({ completed: !!assessment });
  } catch (e) {
    next(e);
  }
}

export async function submit(req, res, next) {
  try {
    const { sessionId, answers } = req.body || {};
    const userId = req.user?.id || req.user?._id;
    if (!sessionId) return next(httpError(400, "Session ID is required"));
    if (!answers || typeof answers !== "object") return next(httpError(400, "Missing answers"));
    if (!userId) return next(httpError(401, "Unauthorized"));

    const session = await AssessmentSession.findOne({ _id: sessionId, userId, isCompleted: false });
    if (!session) return next(httpError(404, "Active assessment session not found"));

    // 1. Calculate scores per concept
    const conceptStats = {}; // { conceptName: { correct: 0, total: 0 } }
    
    session.questions.forEach((q, idx) => {
      const concept = q.concept || "General";
      if (!conceptStats[concept]) {
        conceptStats[concept] = { correct: 0, total: 0 };
      }
      conceptStats[concept].total++;
      
      const userAnswerId = answers[`q-${idx}`];
      
      // Map 'a', 'b', 'c', 'd' to the actual option text
      let userAnswerText = "";
      if (userAnswerId && typeof userAnswerId === "string") {
        const optionIndex = userAnswerId.toLowerCase().charCodeAt(0) - 97;
        if (q.options && q.options[optionIndex]) {
          userAnswerText = q.options[optionIndex];
        }
      }

      console.log(`Q${idx} [${concept}]: Correct="${q.answer}", User="${userAnswerText}" (ID: ${userAnswerId})`);
      
      // Case-insensitive comparison with trimming for robustness
      if (
        userAnswerText && 
        q.answer && 
        userAnswerText.trim().toLowerCase() === q.answer.trim().toLowerCase()
      ) {
        conceptStats[concept].correct++;
      }
    });

    // 2. Format results
    const results = Object.entries(conceptStats).map(([concept, stats]) => {
      const score = Math.round((stats.correct / stats.total) * 100);
      let category = "medium";
      if (score < 50) category = "weak";
      else if (score > 75) category = "strong";
      
      return { concept, score, category };
    });

    // 3. Mark session as completed
    session.isCompleted = true;
    await session.save();

    // 4. Save to Assessment model (historical)
    const xpAward = results.length * 10 + results.reduce((sum, r) => sum + r.score, 0);
    const assessment = await Assessment.create({
      userId,
      subject: session.subject,
      results,
      xpAwarded: xpAward
    });

    // 5. Update User XP/Level
    await User.findByIdAndUpdate(userId, {
      $inc: { xp: xpAward }
    });

    res.json({
      assessmentId: assessment._id,
      xpAward,
      results,
      conceptPerformance: Object.keys(conceptStats).map(concept => ({
        concept,
        score: Math.round((conceptStats[concept].correct / conceptStats[concept].total) * 100)
      }))
    });
  } catch (e) {
    next(e);
  }
}

