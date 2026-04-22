export default function BadgeCard({ title, description, earned }) {
  return (
    <div
      className={[
        "rounded-3xl p-5 space-y-2 border transition-all",
        earned
          ? "border-white/15 bg-gradient-to-br from-white/[0.07] to-white/[0.03] shadow-glow"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.06]"
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        <span
          className={[
            "text-xs px-2.5 py-1 rounded-full border",
            earned
              ? "bg-emerald-500/10 text-emerald-200 border-emerald-500/25"
              : "bg-white/[0.03] text-slate-400 border-white/10"
          ].join(" ")}
        >
          {earned ? "Unlocked" : "Locked"}
        </span>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}

