import { httpError } from "../utils/httpError.js";
import { generateCourseFromLLM } from "../utils/llmClient.js";

export async function generateStudyMaterials(req, res, next) {
  try {
    const { subject } = req.query;
    if (!subject) return next(httpError(400, "Subject is required"));

    const flashcardsPrompt = `
Generate 5–8 flashcards for:
Subject: ${subject}

Each flashcard must include:
* question
* answer

Return ONLY JSON:
{
  "flashcards": [
    { "question": "", "answer": "" }
  ]
}
    `;

    const mindmapPrompt = `
Generate a simple concept mind map for:
Subject: ${subject}

Return ONLY JSON:
{
  "nodes": [
    { "id": "1", "data": { "label": "Main Topic" }, "position": { "x": 0, "y": 0 } }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2", "animated": true }
  ]
}

Important: 
- Include x and y positions for nodes (layout them out logically).
- Include "data" with "label" for each node.
- Ensure edges have unique ids and valid source/target.
- For nodes style use this:
{
  "background": "#020617",
  "color": "#e2e8f0",
  "border": "1px solid #1e293b",
  "borderRadius": 999,
  "paddingInline": 16,
  "paddingBlock": 6,
  "fontSize": 11
}
    `;

    const [flashcardsData, mindmapData] = await Promise.all([
      generateCourseFromLLM(flashcardsPrompt),
      generateCourseFromLLM(mindmapPrompt)
    ]);

    res.json({
      flashcards: flashcardsData.flashcards || [],
      mindmap: {
        nodes: mindmapData.nodes || [],
        edges: mindmapData.edges || []
      }
    });
  } catch (e) {
    console.error("Study Material Generation Error:", e.message);
    next(e);
  }
}
