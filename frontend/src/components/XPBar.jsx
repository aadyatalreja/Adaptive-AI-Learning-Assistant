import { useProgress } from "../context/ProgressContext";

export default function XPBar() {
  const { xp, level } = useProgress();
  const current = xp % 500;
  const percent = (current / 500) * 100;

  return (
    <div className="card-muted p-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs text-slate-400">Current Level</p>
        <p className="text-lg font-semibold text-slate-50">L{level}</p>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>XP Progress</span>
          <span>
            {current} / 500 XP ({Math.round(percent)}%)
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

