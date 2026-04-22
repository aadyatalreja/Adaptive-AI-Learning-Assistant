import { useProgress } from "../context/ProgressContext";

export default function XPBar() {
  const { xp, level } = useProgress();
  const current = xp % 500;
  const percent = (current / 500) * 100;

  return (
    <div className="glass-panel p-5 flex items-center justify-between gap-5">
      <div>
        <p className="text-xs text-slate-500">Current level</p>
        <p className="text-2xl font-semibold text-slate-50 tracking-tight">
          L{level}
        </p>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>XP Progress</span>
          <span>
            {current} / 500 XP ({Math.round(percent)}%)
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] border border-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

