import { motion } from "framer-motion";

export default function SubjectCard({ subject, selected, onToggle }) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ y: -2 }}
      className={[
        "focus-ring rounded-3xl border p-5 text-left transition-all",
        selected
          ? "border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.03] shadow-glow"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
      ].join(" ")}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-200">
            {subject.icon ? subject.icon : <span className="text-xs font-semibold">S</span>}
          </div>
          <h3 className="text-sm font-semibold text-slate-100">
            {subject.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {selected && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs text-slate-200"
            >
              Selected
            </motion.span>
          )}
          <span
            className={[
              "h-2.5 w-2.5 rounded-full border",
              selected
                ? "bg-accent-cyan border-accent-cyan/70"
                : "border-white/20 bg-white/[0.06]"
            ].join(" ")}
          />
        </div>
      </div>
      <p className="text-xs text-slate-500">{subject.description}</p>
    </motion.button>
  );
}

