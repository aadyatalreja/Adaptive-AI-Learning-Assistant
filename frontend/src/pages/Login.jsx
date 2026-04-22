import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      // Demo mode: no backend call
      localStorage.setItem(
        "mockUser",
        JSON.stringify({
          id: "local-user",
          email: values.email,
          name: values.email?.split?.("@")?.[0] || "Learner",
          role: null,
          xp: 0,
          level: 1
        })
      );
      setUser({
        id: "local-user",
        email: values.email,
        name: values.email?.split?.("@")?.[0] || "Learner",
        role: null,
        xp: 0,
        level: 1
      });
      login("mock-token");
      navigate("/role");
    } catch (err) {
      setError(
        err?.message || "Unable to login. Please try again."
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
              Learn smarter with <span className="text-gradient">AI</span>.
            </h2>
            <p className="text-sm text-slate-400 max-w-md">
              Assess concepts, detect weak areas, and follow a clean plan with
              minimal cognitive load.
            </p>
            <div className="grid gap-3 mt-6">
              <div className="card-muted p-4">
                <p className="text-xs text-slate-300 font-medium">
                  Adaptive Learning
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Lesson difficulty and sequencing adjust to your performance.
                </p>
              </div>
              <div className="card-muted p-4">
                <p className="text-xs text-slate-300 font-medium">
                  Weak Area Detection
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Concept-level insights with actionable prerequisites.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Premium UI · Dark glass · Fast navigation
          </p>
        </motion.div>

        <div className="flex flex-col justify-center">
          <AuthForm
            mode="login"
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
          <p className="mt-5 text-sm text-center text-slate-400">
            New to the platform?{" "}
            <Link
              to="/signup"
              className="text-slate-100 hover:text-gradient font-medium underline decoration-white/15 hover:decoration-white/30 underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

