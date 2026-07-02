import { Course } from "../models/Course.js";
import { httpError } from "../utils/httpError.js";
import { generateCourseFromLLM, generateModuleLesson } from "../utils/llmClient.js";

function categorizeScore(score) {
  if (score < 50) return "Weak";
  if (score <= 75) return "Moderate";
  return "Strong";
}

export async function generateCourse(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id || req.user?.userId;
    const { subject, assessmentResults } = req.body || {};

    if (!userId) return next(httpError(401, "Unauthorized"));
    if (!subject || typeof subject !== "string") return next(httpError(400, "Missing subject"));
    if (!assessmentResults || !Array.isArray(assessmentResults)) {
      return next(httpError(400, "Missing or invalid assessmentResults"));
    }
    if (!process.env.GEMINI_API_KEY) return next(httpError(500, "GEMINI_API_KEY is missing"));

    // 2 & 3. Build formatted concept list and classify levels
    const formattedConcepts = assessmentResults
      .map((item) => {
        const concept = item.concept || item.name;
        const score = Number(item.score);
        if (!concept || Number.isNaN(score)) return null;
        const level = categorizeScore(score);
        return `* ${concept}: ${score}% (${level})`;
      })
      .filter(Boolean)
      .join("\n");

    if (!formattedConcepts) {
      return next(httpError(400, "assessmentResults must include concept and score"));
    }

    // 4. Final Prompt construction
    const prompt = `Generate a structured learning course.

Subject: ${subject.trim()}

Student Performance:
${formattedConcepts}

Requirements:
* Focus heavily on weak areas
* Include prerequisites first
* Build logical progression
* Keep modules structured
* For each module, include 2–4 high-quality learning resources.

Resource Quality Rules:
* For video resources:
  - DO NOT generate direct YouTube video URLs (like watch?v=...)
  - ALWAYS generate YouTube search links using: https://www.youtube.com/results?search_query=<topic>
  - Ensure query matches the concept name and replace spaces with +
* Include official documentation where applicable
* Include beginner-friendly articles if needed
* Ensure links are real and relevant
* Avoid broken or generic links
* Resources must match module concepts
* Avoid duplicate links
* Keep titles meaningful
* Use real URLs (not placeholders)

Return ONLY valid JSON:
{
  "title": "",
  "description": "",
  "modules": [
    {
      "title": "",
      "level": "",
      "estimatedTime": "",
      "concepts": [],
      "resources": [
        {
          "title": "",
          "type": "video | article | documentation",
          "url": ""
        }
      ]
    }
  ]
}`;

    console.log("Prompt sent to Gemini:", prompt);

    let parsed;
    try {
      parsed = await generateCourseFromLLM(prompt);
    } catch (llmErr) {
      return next(httpError(502, llmErr.message || "Failed to generate course from Gemini"));
    }

    const course = await Course.create({
      userId,
      subject: subject.trim(),
      title: parsed.title,
      description: parsed.description,
      modules: parsed.modules
    });

    res.status(201).json(course);
  } catch (e) {
    next(e);
  }
}

export async function getMyCourse(req, res, next) {
  try {
    const userId = req.user?.id || req.user?._id || req.user?.userId;
    if (!userId) return next(httpError(401, "Unauthorized"));

    const course = await Course.findOne({ userId }).sort({ createdAt: -1 });
    if (!course) return next(httpError(404, "No course found for this user"));

    res.json(course);
  } catch (e) {
    next(e);
  }
}

export async function generateModuleContent(req, res, next) {
  try {
    const { title, concepts } = req.body || {};
    if (!title || !Array.isArray(concepts)) {
      return next(httpError(400, "Module title and concepts are required"));
    }

    const content = await generateModuleLesson(title, concepts);
    res.json({ content });
  } catch (e) {
    next(e);
  }
}
