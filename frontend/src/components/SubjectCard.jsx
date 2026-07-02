import { motion } from "framer-motion";

export default function SubjectCard({ subject, selected, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -3 }}
      className={`card-muted p-4 text-left transition-colors ${
        selected ? "border-primary-500 bg-slate-900" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-100">
          {subject.title}
        </h3>
        <span
          className={`h-2.5 w-2.5 rounded-full border ${
            selected
              ? "bg-primary-500 border-primary-300"
              : "border-slate-600 bg-slate-800"
          }`}
        />
      </div>
      <p className="text-xs text-slate-400">{subject.description}</p>
    </motion.button>
  );
}

