import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      // Demo mode: no backend call
      const demoUser = {
        id: "local-user",
        email: values.email,
        name: values.name,
        role: null,
        xp: 0,
        level: 1
      };
      localStorage.setItem("mockUser", JSON.stringify(demoUser));
      setUser(demoUser);
      login("mock-token");
      navigate("/role");
    } catch (err) {
      setError(
        err?.message || "Unable to sign up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-app px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl grid gap-6 md:grid-cols-2 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="hidden md:flex flex-col justify-between glass-panel p-8"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold tracking-tight text-slate-100">
              Adaptive Learning
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
              Build a focused <span className="text-gradient">learning plan</span>.
            </h2>
            <p className="text-sm text-slate-400 max-w-md">
              A clean workspace for assessments, weak area analysis, and study
              sessions—designed to reduce clutter and keep you progressing.
            </p>
            <div className="grid gap-3 mt-6">
              <div className="card-muted p-4">
                <p className="text-xs text-slate-300 font-medium">
                  Clear flow
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Role → subjects → baseline assessment → dashboard.
                </p>
              </div>
              <div className="card-muted p-4">
                <p className="text-xs text-slate-300 font-medium">
                  Serious gamification
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  XP and badges reinforce consistency without distraction.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Your data stays local in demo mode
          </p>
        </motion.div>

        <div className="flex flex-col justify-center">
          <AuthForm
            mode="signup"
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            showName
          />
          <p className="mt-5 text-sm text-center text-slate-400">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-slate-100 hover:text-gradient font-medium underline decoration-white/15 hover:decoration-white/30 underline-offset-4"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

