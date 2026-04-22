import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";
import { useToast } from "../components/ui/Toast";

const SUBJECTS = [
  {
    id: "ml",
    title: "Machine Learning",
    description:
      "Supervised, unsupervised, model evaluation, and deployment workflows."
  },
  {
    id: "ds",
    title: "Data Structures",
    description: "Arrays, trees, graphs, and complexity-aware problem solving."
  },
  {
    id: "la",
    title: "Linear Algebra",
    description: "Vector spaces, eigenvalues, and matrix decompositions."
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Processes, memory, scheduling, and synchronization."
  },
  {
    id: "db",
    title: "Database Systems",
    description: "Relational design, indexing, transactions, and queries."
  }
];

export default function SubjectSelection() {
  const [selected, setSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const toast = useToast();

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
      // Demo mode: no backend call
      if (user) {
        const next = { ...user, subjects: selected };
        setUser(next);
        localStorage.setItem("mockUser", JSON.stringify(next));
      }
      toast?.push?.({
        type: "success",
        title: "Subjects saved",
        message: `Selected ${selected.length} subject(s)`
      });
      navigate("/assessment");
    } catch (err) {
      setError(
        err?.message || "Unable to save subjects. Please retry."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Select subjects<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Choose what you want to learn. You can change this later.
          </p>
        </div>
        <SurfaceCard className="px-4 py-3 hidden md:block">
          <p className="text-xs text-slate-500">Selected</p>
          <p className="text-sm text-slate-100 font-medium">
            {selected.length} subject(s)
          </p>
        </SurfaceCard>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SUBJECTS.map((s) => (
          <SubjectCard
            key={s.id}
            subject={s}
            selected={selected.includes(s.id)}
            onToggle={() => toggle(s.id)}
          />
        ))}
      </div>

      <GlassPanel className="p-4 flex items-center justify-between gap-4 sticky bottom-4">
        <p className="text-sm text-slate-400">
          Selected: <span className="text-slate-100 font-medium">{selected.length}</span>
        </p>
        <Button onClick={handleContinue} disabled={!selected.length || saving}>
          Continue to assessment
        </Button>
      </GlassPanel>
    </div>
  );
}

