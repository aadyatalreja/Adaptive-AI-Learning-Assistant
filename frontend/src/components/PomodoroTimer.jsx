import { useEffect, useState } from "react";

const WORK_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); // work | break

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          const nextMode = mode === "work" ? "break" : "work";
          setMode(nextMode);
          return nextMode === "work" ? WORK_DURATION : BREAK_DURATION;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, mode]);

  const total = mode === "work" ? WORK_DURATION : BREAK_DURATION;
  const progress = ((total - secondsLeft) / total) * 100;

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const reset = () => {
    setIsRunning(false);
    setMode("work");
    setSecondsLeft(WORK_DURATION);
  };

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500">Study timer</p>
          <p className="text-sm font-semibold text-slate-100 capitalize mt-1">
            {mode === "work" ? "Focused work" : "Short break"}
          </p>
        </div>

        <div className="relative h-24 w-24">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#grad)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 250ms linear" }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="45%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-mono tabular-nums text-slate-50">
                {minutes}:{seconds}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {Math.round(progress)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setIsRunning((v) => !v)}
          className="focus-ring flex-1 rounded-2xl bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan text-xs font-medium text-white py-2.5"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="focus-ring flex-1 rounded-2xl border border-white/10 bg-white/[0.04] text-xs font-medium text-slate-200 py-2.5 hover:bg-white/[0.07] transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

