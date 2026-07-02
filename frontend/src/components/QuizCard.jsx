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
      className="glass-panel p-5 md:p-6 space-y-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>{question.concept}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-primary-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <h2 className="text-sm md:text-base font-medium text-slate-100">
        {question.text}
      </h2>
      <div className="space-y-2">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className={`w-full text-left px-3 py-2 rounded-xl border text-sm transition-colors ${
              selectedOptionId === opt.id
                ? "border-primary-500 bg-primary-500/10 text-slate-50"
                : "border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

