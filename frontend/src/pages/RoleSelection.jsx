import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { UserAPI } from "../services/api";

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

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleContinue = async () => {
    if (!selectedRole) return;
    try {
      setSaving(true);
      setError("");
      
      const { data } = await UserAPI.selectRole({ role: selectedRole });
      if (data.user) {
        setUser(data.user);
      }
      navigate("/subjects");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Unable to save role. Please retry."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Select how you use the platform
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              We fine-tune recommendations and dashboards based on your role.
            </p>
          </div>
        </div>
        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              type="button"
              whileHover={{ y: -3 }}
              onClick={() => setSelectedRole(role.id)}
              className={`card-muted p-4 text-left transition-colors ${
                selectedRole === role.id
                  ? "border-primary-500 bg-slate-900"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-slate-100">
                  {role.title}
                </h2>
                <span
                  className={`h-2.5 w-2.5 rounded-full border ${
                    selectedRole === role.id
                      ? "bg-primary-500 border-primary-300"
                      : "border-slate-700 bg-slate-900"
                  }`}
                />
              </div>
              <p className="text-xs text-slate-400">{role.description}</p>
            </motion.button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedRole || saving}
            className="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

