import { motion } from "framer-motion";

export default function QuizCard({
  question,
  index,
  total,
  selectedOptionId,
  onSelect
}) {
  if (!question) return null;

  const progress = ((index + 1) / total) * 100;

  return (
    <motion.div
      className="glass-panel p-6 space-y-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Question {index + 1} of {total}
        </span>
        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-300">
          {question.concept}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] border border-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h2 className="text-base md:text-lg font-semibold text-slate-100 tracking-tight">
        {question.text}
      </h2>
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={[
              "focus-ring w-full text-left px-4 py-3 rounded-2xl border text-sm transition-all",
              selectedOptionId === opt.id
                ? "border-white/15 bg-white/[0.08] text-slate-50 shadow-glow"
                : "border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.06]"
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

