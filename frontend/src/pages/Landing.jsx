import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handlePrimary = () => {
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/signup");
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 py-10 md:py-16">
      <div className="max-w-5xl w-full grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 text-[11px] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Real-time adaptive learning engine
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
              AI Adaptive Learning Platform
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl">
              Personalized learning paths powered by artificial intelligence.
              Diagnose concept gaps, adapt content difficulty, and maintain a
              disciplined study rhythm in one focused workspace.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrimary}
              className="rounded-xl bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white px-4 py-2.5 transition-colors"
            >
              Start learning
            </button>
            <Link
              to="/login"
              className="rounded-xl border border-slate-700 text-sm font-medium text-slate-200 px-4 py-2.5 hover:bg-slate-900 transition-colors"
            >
              Login
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card-muted p-4 space-y-1.5">
              <p className="text-xs font-medium text-slate-300">
                Adaptive Lessons
              </p>
              <p className="text-xs text-slate-500">
                Micro-lessons tailored to your current proficiency and
                assessment history.
              </p>
            </div>
            <div className="card-muted p-4 space-y-1.5">
              <p className="text-xs font-medium text-slate-300">
                Weak Area Detection
              </p>
              <p className="text-xs text-slate-500">
                Concept-level analysis powered by assessment performance and
                practice data.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel p-5 md:p-6 space-y-4"
        >
          <p className="text-xs font-medium text-slate-400">
            How the platform works
          </p>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[11px] text-slate-400">
                1
              </span>
              <div>
                <p className="font-medium text-slate-100">
                  Baseline diagnostic
                </p>
                <p className="text-slate-400">
                  Short initial assessment to map strengths and gaps across core
                  concepts.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[11px] text-slate-400">
                2
              </span>
              <div>
                <p className="font-medium text-slate-100">Adaptive pathways</p>
                <p className="text-slate-400">
                  AI adjusts difficulty, sequence, and practice sets for each
                  subject.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 h-5 w-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[11px] text-slate-400">
                3
              </span>
              <div>
                <p className="font-medium text-slate-100">
                  Gamified accountability
                </p>
                <p className="text-slate-400">
                  XP, levels, and badges calibrated for serious learners—not
                  distraction.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-500">
            Designed for students, instructors, and independent learners
            running structured study plans.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

