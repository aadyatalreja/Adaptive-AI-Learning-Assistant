import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import { useAuth } from "../context/AuthContext";
import { UserAPI } from "../services/api";

const SUBJECTS = [
  {
    id: "Machine Learning",
    title: "Machine Learning",
    description:
      "Supervised, unsupervised, model evaluation, and deployment workflows."
  },
  {
    id: "Data Structures",
    title: "Data Structures",
    description: "Arrays, trees, graphs, and complexity-aware problem solving."
  },
  {
    id: "Linear Algebra",
    title: "Linear Algebra",
    description: "Vector spaces, eigenvalues, and matrix decompositions."
  },
  {
    id: "Operating Systems",
    title: "Operating Systems",
    description: "Processes, memory, scheduling, and synchronization."
  },
  {
    id: "Database Systems",
    title: "Database Systems",
    description: "Relational design, indexing, transactions, and queries."
  }
];

export default function SubjectSelection() {
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (!selected.length) return;
    try {
      setSaving(true);
      setError("");
      
      const { data } = await UserAPI.selectSubjects({ subjects: selected });
      if (data.user) {
        setUser(data.user);
      }
      navigate("/assessment");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Unable to save subjects. Please retry."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Select subjects to focus on
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              We will generate subject-specific diagnostics and spaced review
              plans.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            Multiple selections allowed
          </div>
        </div>
        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}
        <div className="section-grid">
          {SUBJECTS.map((s) => (
            <SubjectCard
              key={s.id}
              subject={s}
              selected={selected.includes(s.id)}
              onToggle={() => toggle(s.id)}
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500">
            You can refine subjects later from the dashboard.
          </p>
          <button
            onClick={handleContinue}
            disabled={!selected.length || saving}
            className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            Continue to initial assessment
          </button>
        </div>
      </div>
    </div>
  );
}

