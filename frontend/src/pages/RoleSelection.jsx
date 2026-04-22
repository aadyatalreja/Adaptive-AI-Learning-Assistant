import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";
import { useToast } from "../components/ui/Toast";

const roles = [
  {
    id: "student",
    title: "Student",
    description:
      "Track semester courses, exam readiness, and concept mastery across subjects."
  },
  {
    id: "teacher",
    title: "Teacher",
    description:
      "Create cohorts, monitor student progress, and design adaptive assessments."
  },
  {
    id: "self-learner",
    title: "Self Learner",
    description:
      "Structure independent study with diagnostics, spaced reviews, and XP goals."
  }
];

function RoleIcon({ id }) {
  const common = { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none" };
  if (id === "teacher") {
    return (
      <svg {...common} stroke="currentColor">
        <path strokeWidth="1.6" d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path strokeWidth="1.6" d="M6 10v6c0 2 3 4 6 4s6-2 6-4v-6" />
      </svg>
    );
  }
  if (id === "self-learner") {
    return (
      <svg {...common} stroke="currentColor">
        <path strokeWidth="1.6" d="M12 3v18" />
        <path strokeWidth="1.6" d="M7 7h10" />
        <path strokeWidth="1.6" d="M7 17h10" />
        <path strokeWidth="1.6" d="M9 10h6v4H9v-4Z" />
      </svg>
    );
  }
  return (
    <svg {...common} stroke="currentColor">
      <path strokeWidth="1.6" d="M8 6h8" />
      <path strokeWidth="1.6" d="M7 10h10" />
      <path strokeWidth="1.6" d="M6 14h12" />
      <path strokeWidth="1.6" d="M8 18h8" />
    </svg>
  );
}

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const toast = useToast();

  const handleContinue = async () => {
    if (!selectedRole) return;
    try {
      setSaving(true);
      setError("");
      // Demo mode: no backend call
      if (user) {
        const next = { ...user, role: selectedRole };
        setUser(next);
        localStorage.setItem("mockUser", JSON.stringify(next));
      }
      toast?.push?.({ type: "success", title: "Role saved" });
      navigate("/subjects");
    } catch (err) {
      setError(
        err?.message || "Unable to save role. Please retry."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Choose your role<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            This helps personalize dashboards, assessments, and study workflows.
          </p>
        </div>
        <div className="hidden md:block">
          <SurfaceCard className="px-4 py-3">
            <p className="text-xs text-slate-500">Step</p>
            <p className="text-sm text-slate-100 font-medium">1 of 3</p>
          </SurfaceCard>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const active = selectedRole === role.id;
          return (
            <motion.button
              key={role.id}
              type="button"
              whileHover={{ y: -2 }}
              onClick={() => setSelectedRole(role.id)}
              className={[
                "focus-ring text-left rounded-3xl border p-5 transition-all",
                active
                  ? "border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.03] shadow-glow"
                  : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-200">
                    <RoleIcon id={role.id} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {role.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
                <div
                  className={[
                    "h-2.5 w-2.5 rounded-full border mt-1",
                    active
                      ? "bg-accent-cyan border-accent-cyan/70"
                      : "border-white/20 bg-white/[0.06]"
                  ].join(" ")}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <GlassPanel className="p-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          You can change this later from settings.
        </p>
        <Button onClick={handleContinue} disabled={!selectedRole || saving}>
          Continue
        </Button>
      </GlassPanel>
    </div>
  );
}

