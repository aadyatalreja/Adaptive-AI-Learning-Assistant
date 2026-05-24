import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

function extractJsonPayload(raw) {
  if (typeof raw !== "string") return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fencedMatch?.[1]) return fencedMatch[1].trim();

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1).trim();
  }

  return trimmed;
}

export async function generateAssessmentQuestions(subject) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const prompt = `
Generate 10 multiple-choice questions (MCQs) for the subject: "${subject}".
Each question must include:
- question: The question text.
- options: An array of 4 strings.
- answer: The correct option string (matching one of the options exactly).
- concept: The specific concept name being tested.

Return ONLY strictly valid JSON in the following format, with no markdown code blocks, no prose, and no explanation:
{
  "questions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": "...",
      "concept": "..."
    }
  ]
}
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();
    
    const jsonStr = extractJsonPayload(raw);
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini API Error (Assessment):", err.message);
    throw new Error("Failed to generate assessment questions");
  }
}

export async function generateCourseFromLLM(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();

    console.log("Gemini raw response:", raw);

    const jsonStr = extractJsonPayload(raw);
    
    try {
      return JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error("Gemini JSON Parse Error:", parseErr.message);
      console.error("Raw response content:", raw);
      throw new Error("Failed to parse course structure from Gemini response");
    }
  } catch (err) {
    console.error("Gemini API Error (Course):", err.message);
    throw new Error("Failed to generate course from Gemini");
  }
}

export async function generatePrerequisites(concepts) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const prompt = `
For each of the following concepts, provide 2-3 essential prerequisite topics that a student should review to improve their understanding.

Concepts:
${concepts.map((c) => `- ${c}`).join("\n")}

Return ONLY strictly valid JSON in the following format:
{
  "prerequisites": [
    {
      "concept": "...",
      "recommended": ["...", "...", "..."]
    }
  ]
}
  `;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();

    const jsonStr = extractJsonPayload(raw);
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini API Error (Prerequisites):", err.message);
    return { prerequisites: concepts.map(c => ({ concept: c, recommended: ["Basic principles", "Foundational theory"] })) };
  }
}
