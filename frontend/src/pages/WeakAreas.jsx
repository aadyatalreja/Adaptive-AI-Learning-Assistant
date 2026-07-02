import { useEffect, useState } from "react";
import { AnalysisAPI } from "../services/api";

export default function WeakAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        setLoading(true);
        const { data } = await AnalysisAPI.weakAreas();
        setAreas(data.areas || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load weak area analysis.");
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  return (
    <div className="page-shell px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-50">
              Weak area analysis
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Concepts prioritized for remediation based on recent assessment
              and practice history.
            </p>
          </div>
        </div>

        {loading && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="glass-panel p-4 space-y-4 animate-pulse">
                <div className="h-4 w-1/2 bg-slate-800 rounded" />
                <div className="h-3 w-1/3 bg-slate-800 rounded" />
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-800 rounded" />
                  <div className="h-2 w-full bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-100">
            {error}
          </div>
        )}

        {!loading && !error && areas.length === 0 && (
          <div className="glass-panel p-8 text-center space-y-2">
            <h3 className="text-sm font-medium text-slate-200">No weak areas identified</h3>
            <p className="text-xs text-slate-400">Great job! You've shown strong proficiency across all assessed concepts.</p>
          </div>
        )}

        {!loading && !error && areas.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {areas.map((area) => (
              <div key={area.concept} className="glass-panel p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-100">
                    {area.concept}
                  </h2>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${
                    area.weakness === 'High' 
                      ? 'border-red-500/50 bg-red-500/10 text-red-200' 
                      : 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                  }`}>
                    {area.weakness} priority
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Recommended prerequisites:
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {area.recommended.map((r) => (
                    <li key={r}>- {r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

