import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handlePrimary = () => {
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-app px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)] items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
            AI-powered adaptive learning engine
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-50">
              Learn smarter with <span className="text-gradient">AI</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl">
              Personalized learning paths powered by artificial intelligence.
              Start with a baseline assessment, detect weak areas, and track
              mastery with a clean, distraction-free dashboard.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handlePrimary}>Start Learning</Button>
            <Button as={Link} to="/login" variant="secondary">
              Explore Features
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <SurfaceCard className="p-5">
              <p className="text-xs font-semibold text-slate-200">
                Adaptive Learning
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Lessons adjust based on your performance and concept mastery.
              </p>
            </SurfaceCard>
            <SurfaceCard className="p-5">
              <p className="text-xs font-semibold text-slate-200">
                Weak Area Detection
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Concept-level gaps with recommended prerequisites to fix them.
              </p>
            </SurfaceCard>
            <SurfaceCard className="p-5">
              <p className="text-xs font-semibold text-slate-200">
                Gamified Progress
              </p>
              <p className="text-xs text-slate-500 mt-2">
                XP, levels, and badges designed to encourage consistency.
              </p>
            </SurfaceCard>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <GlassPanel className="p-6 space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-300">
                How it works
              </p>
              <p className="text-sm text-slate-400 mt-2">
                A clear workflow from diagnostics to a daily study plan.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Baseline assessment",
                  body: "Establish your current level across core concepts."
                },
                {
                  title: "Adaptive pathways",
                  body: "Content sequence and difficulty adjust in real time."
                },
                {
                  title: "Mastery + reviews",
                  body: "Spaced repetition and focused practice to close gaps."
                }
              ].map((s, idx) => (
                <div key={s.title} className="flex gap-3">
                  <div className="h-7 w-7 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs text-slate-300">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-100">
                      {s.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Built for serious learners</span>
              <Link
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="text-slate-200 hover:text-gradient font-medium"
              >
                Get started
              </Link>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}

