import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import ProgressBar from "../components/ProgressBar";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { AssessmentAPI, CourseAPI } from "../services/api";

export default function InitialAssessment() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [generatingCourse, setGeneratingCourse] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const { addXp } = useProgress();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");
        const subject = (user?.subjects && user.subjects[0]) || "Machine Learning";
        const { data } = await AssessmentAPI.generate(subject);

        if (!data?.questions) {
          throw new Error("No questions returned from API");
        }

        setSessionId(data.sessionId);

        // Transform LLM output to format expected by QuizCard
        const transformed = data.questions.map((q, idx) => ({
          id: `q-${idx}`,
          text: q.question,
          concept: q.concept,
          answer: q.answer,
          options: q.options.map((opt, oIdx) => ({
            id: String.fromCharCode(97 + oIdx), // a, b, c, d
            label: opt
          }))
        }));

        setQuestions(transformed);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err?.response?.data?.message || err.message || "Failed to generate questions.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchQuestions();
    }
  }, [user]);

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
      const { data } = await AssessmentAPI.submit({ sessionId, answers });
      
      // Map conceptPerformance to name/value for ProgressBar
      const formattedResults = (data.conceptPerformance || []).map(item => ({
        name: item.concept,
        value: item.score
      }));
      
      setResults(formattedResults);
      if (data.xpAward) addXp(data.xpAward);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Unable to submit assessment. Please retry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerateCourse = async () => {
    if (!results || !Array.isArray(results)) return;

    const selectedSubject = Array.isArray(user?.subjects) && user.subjects.length
      ? user.subjects[0]
      : "General";

    try {
      setGeneratingCourse(true);
      setError("");
      
      // Map frontend results (name/value) back to backend expected format (concept/score)
      const assessmentResults = results.map(r => ({
        concept: r.name,
        score: r.value
      }));

      await CourseAPI.generate({
        subject: selectedSubject,
        assessmentResults: assessmentResults
      });
      navigate("/course");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to generate personalized course. Please retry.";
      setError(message);
    } finally {
      setGeneratingCourse(false);
    }
  };

  const current = questions[index];

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Initial assessment
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Short diagnostic to estimate your baseline across selected
              subjects.
            </p>
          </div>
          <div className="hidden md:block w-52">
            <ProgressBar
              label="Completion"
              value={
                questions.length
                  ? ((index + 1) / questions.length) * 100
                  : 0
              }
            />
          </div>
        </div>
        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        {loading && !results && (
          <div className="glass-panel p-10 flex flex-col items-center justify-center space-y-4">
            <div className="h-10 w-10 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-slate-100">Generating Assessment</h3>
              <p className="text-sm text-slate-400">Our AI is crafting custom questions based on your subjects...</p>
            </div>
          </div>
        )}

        {!loading && !results && current && (
          <>
            <QuizCard
              question={current}
              index={index}
              total={questions.length}
              selectedOptionId={answers[current.id]}
              onSelect={handleSelect}
            />
            <div className="flex justify-end gap-2">
              {index < questions.length - 1 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-sm text-slate-200 hover:bg-slate-900 transition-colors"
                >
                  Next question
                </button>
              )}
              {index === questions.length - 1 && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  Submit assessment
                </button>
              )}
            </div>
          </>
        )}

        {results && (
          <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
            <div className="glass-panel p-5 space-y-4">
              <h2 className="text-sm font-semibold text-slate-100">
                Concept-wise performance
              </h2>
              <div className="space-y-3">
                {results.map((c) => (
                  <ProgressBar
                    key={c.name}
                    label={c.name}
                    value={c.value}
                    subtle
                  />
                ))}
              </div>
            </div>
            <div className="card-muted p-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-100">
                Next steps
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  - We will prioritize concepts below 60% in your first learning
                  cycle.
                </li>
                <li>
                  - XP and levels will update as you close gaps and complete
                  practice sets.
                </li>
                <li>
                  - You can always retake diagnostics from the assessment page.
                </li>
              </ul>
              <button
                onClick={handleGenerateCourse}
                disabled={generatingCourse}
                className="w-full mt-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
              >
                {generatingCourse && (
                  <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                )}
                {generatingCourse
                  ? "Generating personalized course..."
                  : "Generate Personalized Course"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

