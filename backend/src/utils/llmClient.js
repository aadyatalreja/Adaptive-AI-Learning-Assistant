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
    const client = new GoogleGenerativeAI(apiKey);
    console.log("Gemini client initialized");
    const model = client.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();
    console.log(raw);
    
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
    const client = new GoogleGenerativeAI(apiKey);
    console.log("Gemini client initialized");
    const model = client.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();
    console.log(raw);

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
    const client = new GoogleGenerativeAI(apiKey);
    console.log("Gemini client initialized");
    const model = client.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();
    console.log(raw);

    const jsonStr = extractJsonPayload(raw);
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Gemini API Error (Prerequisites):", err.message);
    return { prerequisites: concepts.map(c => ({ concept: c, recommended: ["Basic principles", "Foundational theory"] })) };
  }
}

export async function generateModuleLesson(moduleTitle, concepts) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const prompt = `
Generate a detailed learning lesson for the module: "${moduleTitle}".
Focus on these key concepts: ${concepts.join(", ")}.

The content should be professional, engaging, and structured for a learning platform.
Include the following sections:
1. Introduction: Overview of the module.
2. Headings & Subheadings: Organize the content logically.
3. Detailed Explanations: Deep dive into the key concepts.
4. Real-world Examples: Practical scenarios where these concepts apply.
5. Step-by-step Breakdowns: How to implement or understand complex parts.
6. Code Snippets (if applicable): Provide clean, commented examples.
7. Common Mistakes & Interview Tips: Helpful pointers for students.
8. Summary: Recapping the main takeaways.

Format the output in clean Markdown.
  `;

  try {
    const client = new GoogleGenerativeAI(apiKey);
    console.log("Gemini client initialized");
    const model = client.getGenerativeModel({ model: "gemini-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text();
    console.log(raw);
    return raw;
  } catch (err) {
    console.error("Gemini API Error (Module Lesson):", err.message);
    throw new Error("Failed to generate module lesson content");
  }
}
