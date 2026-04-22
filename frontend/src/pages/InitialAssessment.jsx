import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import { useProgress } from "../context/ProgressContext";
import Button from "../components/ui/Button";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../components/ui/Toast";

export default function InitialAssessment() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const { addXp } = useProgress();
  const toast = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      // Demo mode: local stub questions (no backend call)
      setQuestions([
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
          text: "In binary classification, which metric is most appropriate when classes are highly imbalanced?",
          concept: "Classification",
          options: [
            { id: "a", label: "Accuracy" },
            { id: "b", label: "Precision" },
            { id: "c", label: "Recall or F1-score" },
            { id: "d", label: "MSE" }
          ]
        },
        {
          id: "q3",
          text: "Backpropagation primarily relies on which mathematical operation?",
          concept: "Neural Networks",
          options: [
            { id: "a", label: "Matrix inversion" },
            { id: "b", label: "Gradient computation via chain rule" },
            { id: "c", label: "Fourier transform" },
            { id: "d", label: "Sampling" }
          ]
        }
      ]);
    };
    fetchQuestions();
  }, []);

  const handleSelect = (optionId) => {
    const q = questions[index];
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");
      // Demo mode: local scoring stub (no backend call)
      const stub = {
        concepts: [
          { name: "Regression", score: 80 },
          { name: "Classification", score: 60 },
          { name: "Neural Networks", score: 30 }
        ]
      };
      setResults(stub);
      addXp(120);
      toast?.push?.({
        type: "success",
        title: "Assessment submitted",
        message: "+120 XP awarded"
      });
    } catch (err) {
      setError(
        err?.message || "Unable to submit assessment. Please retry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const current = questions[index];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Initial assessment<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Answer a short diagnostic. We use it to prioritize weak concepts and
            generate your first study plan.
          </p>
        </div>
        <div className="hidden md:block w-56">
          <ProgressBar
            label="Progress"
            value={
              questions.length ? ((index + 1) / questions.length) * 100 : 0
            }
          />
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {!results && current && (
        <div className="grid gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <QuizCard
                question={current}
                index={index}
                total={questions.length}
                selectedOptionId={answers[current.id]}
                onSelect={handleSelect}
              />
            </motion.div>
          </AnimatePresence>

          <GlassPanel className="p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-400">
              Select an option to continue.
            </p>
            <div className="flex gap-2">
              {index < questions.length - 1 && (
                <Button
                  variant="secondary"
                  onClick={handleNext}
                  disabled={!answers[current.id]}
                >
                  Next
                </Button>
              )}
              {index === questions.length - 1 && (
                <Button
                  onClick={handleSubmit}
                  disabled={!answers[current.id] || submitting}
                >
                  Submit
                </Button>
              )}
            </div>
          </GlassPanel>
        </div>
      )}

      {results && (
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          <GlassPanel className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">
                Concept-wise performance
              </h2>
              <span className="text-xs text-slate-500">Baseline results</span>
            </div>
            <div className="space-y-3">
              {results.concepts.map((c) => (
                <ProgressBar key={c.name} label={c.name} value={c.score} subtle />
              ))}
            </div>
          </GlassPanel>

          <SurfaceCard className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-slate-100">Next steps</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Prioritize concepts below 60% in your first cycle.</li>
              <li>Use Study Mode for focused sessions with spaced reviews.</li>
              <li>XP and level will increment as you complete practice.</li>
            </ul>
            <Button variant="secondary" onClick={() => (window.location.href = "/dashboard")}>
              Go to dashboard
            </Button>
          </SurfaceCard>
        </div>
      )}
    </div>
  );
}

