import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { GlassPanel, SurfaceCard } from "../components/ui/Card";

export default function WeakAreas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      // Demo mode: local stub (no backend call)
      setAreas([
        {
          concept: "Backpropagation",
          weakness: "High",
          recommended: ["Gradient Descent", "Partial Derivatives"]
        },
        {
          concept: "Graph traversal",
          weakness: "Medium",
          recommended: ["Breadth-first search", "Depth-first search"]
        }
      ]);
    };
    fetchAreas();
  }, []);

  const tone = (w) => {
    if (w === "High") return "border-red-500/25 bg-red-500/10 text-red-200";
    if (w === "Medium") return "border-amber-500/25 bg-amber-500/10 text-amber-200";
    return "border-white/10 bg-white/[0.04] text-slate-200";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 tracking-tight">
            Weak areas<span className="text-gradient">.</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Concepts prioritized for remediation based on your baseline and practice history.
          </p>
        </div>
        <SurfaceCard className="px-4 py-3 hidden md:block">
          <p className="text-xs text-slate-500">Priority</p>
          <p className="text-sm text-slate-100 font-medium">Actionable next steps</p>
        </SurfaceCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {areas.map((area) => (
          <GlassPanel key={area.concept} className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
                  {area.concept}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Recommended prerequisites to close the gap.
                </p>
              </div>
              <span
                className={[
                  "text-xs px-2.5 py-1 rounded-full border",
                  tone(area.weakness)
                ].join(" ")}
              >
                {area.weakness} priority
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-400">Recommended topics</p>
              <div className="flex flex-wrap gap-2">
                {area.recommended.map((r) => (
                  <span
                    key={r}
                    className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-200"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button variant="secondary" as="a" href="/study-mode">
                Start practice
              </Button>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

