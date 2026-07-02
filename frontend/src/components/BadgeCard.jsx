export default function BadgeCard({ title, description, earned }) {
  return (
    <div
      className={`card-muted p-4 space-y-1.5 border ${
        earned ? "border-primary-500/70" : "border-slate-800"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-100">{title}</h3>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            earned
              ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
              : "bg-slate-900 text-slate-400 border border-slate-700"
          }`}
        >
          {earned ? "Unlocked" : "Locked"}
        </span>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}

