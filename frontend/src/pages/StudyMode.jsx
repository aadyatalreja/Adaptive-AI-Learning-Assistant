import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import PomodoroTimer from "../components/PomodoroTimer";
import { StudyAPI } from "../services/api";

const AVAILABLE_SUBJECTS = [
  "Machine Learning",
  "Database Management Systems",
  "Operating Systems",
  "Linear Algebra",
  "Data Structures"
];

export default function StudyMode() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubjectChange = async (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    if (!subject) return;

    setLoading(true);
    setError("");
    try {
      const res = await StudyAPI.generate(subject);
      const { flashcards: newFlashcards, mindmap } = res.data;
      
      setFlashcards(newFlashcards || []);
      setNodes(mindmap?.nodes || []);
      setEdges(mindmap?.edges || []);
    } catch (err) {
      console.error("Error generating study materials:", err);
      setError("Failed to generate study materials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Study mode
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Focused workspace with Pomodoro, notes, flashcards, and a live
              concept map.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="subject-select" className="text-xs text-slate-400 font-medium">
              Subject:
            </label>
            <select
              id="subject-select"
              value={selectedSubject}
              onChange={handleSubjectChange}
              disabled={loading}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 outline-none min-w-[150px]"
            >
              <option value="">Select a subject</option>
              {AVAILABLE_SUBJECTS.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <PomodoroTimer />
            <div className="glass-panel p-4 space-y-3">
              <h2 className="text-sm font-semibold text-slate-100">
                Concept notes
              </h2>
              <textarea
                rows={7}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-xs text-slate-100 outline-none focus:border-primary-500 resize-none"
                placeholder="Capture key definitions, derivations, and edge cases here..."
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-panel p-4 space-y-3 min-h-[300px] flex flex-col">
              <h2 className="text-sm font-semibold text-slate-100">
                Flashcards (active recall)
              </h2>
              {loading ? (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
                  Generating flashcards...
                </div>
              ) : flashcards.length > 0 ? (
                <div className="space-y-2 text-xs text-slate-300 overflow-y-auto max-h-[400px] pr-1">
                  {flashcards.map((card, idx) => (
                    <details
                      key={idx}
                      className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 group"
                    >
                      <summary className="cursor-pointer font-medium text-slate-200 group-open:text-primary-400">
                        {card.question}
                      </summary>
                      <p className="mt-2 text-slate-400 leading-relaxed border-t border-slate-800 pt-2">
                        {card.answer}
                      </p>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-xs italic">
                  Select a subject to generate flashcards
                </div>
              )}
            </div>
            <div className="card-muted h-[400px] overflow-hidden relative">
              {loading && (
                <div className="absolute inset-0 z-10 bg-slate-950/50 flex items-center justify-center text-slate-400 text-xs">
                  Generating mind map...
                </div>
              )}
              {nodes.length > 0 ? (
                <ReactFlow nodes={nodes} edges={edges} fitView>
                  <Controls />
                  <Background gap={12} color="#020617" />
                </ReactFlow>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs italic">
                  Select a subject to generate mind map
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

