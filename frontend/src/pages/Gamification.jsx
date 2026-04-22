import BadgeCard from "../components/BadgeCard";
import XPBar from "../components/XPBar";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";

export default function Gamification() {
  const badges = [
    {
      title: "First assessment completed",
      description: "Completed the initial diagnostic without skipping.",
      earned: true
    },
    {
      title: "Concept streak",
      description: "Maintained a 7-day active practice streak.",
      earned: false
    },
    {
      title: "Concept master",
      description: "Reached 80%+ mastery on three core concepts.",
      earned: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Progress<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            XP, levels, badges, and ranking—designed to reinforce consistency.
          </p>
        </div>
        <SurfaceCard className="px-4 py-3 hidden md:block">
          <p className="text-xs text-slate-500">Focus</p>
          <p className="text-sm text-slate-100 font-medium">Consistency</p>
        </SurfaceCard>
      </div>

      <XPBar />

      <div className="grid gap-5 md:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">Badges</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {badges.map((b) => (
              <BadgeCard key={b.title} {...b} />
            ))}
          </div>
        </div>

        <GlassPanel className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-100">
              Leaderboard
            </h3>
            <span className="text-xs text-slate-500">Sample</span>
          </div>
          <div className="space-y-2">
            {[
              { name: "Anon-01", level: 6, xp: 2850 },
              { name: "Anon-02", level: 5, xp: 2400 },
              { name: "You", level: 2, xp: 650, highlight: true }
            ].map((row, idx) => (
              <div
                key={row.name}
                className={[
                  "flex items-center justify-between rounded-2xl border px-3 py-2 text-sm",
                  row.highlight
                    ? "border-white/15 bg-white/[0.07] shadow-glow"
                    : "border-white/10 bg-white/[0.04]"
                ].join(" ")}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-slate-500 w-6">#{idx + 1}</span>
                  <span className="text-slate-100 font-medium truncate">
                    {row.name}
                  </span>
                </div>
                <span className="text-slate-500">
                  L{row.level} · {row.xp} XP
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Ranking will be computed from real cohort data once backend is enabled.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}

