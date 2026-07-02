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

  return (
    <div className="glass-panel p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Study Session</p>
          <p className="text-sm font-semibold text-slate-100 capitalize">
            {mode === "work" ? "Focused work" : "Short break"}
          </p>
        </div>
        <div className="text-lg font-mono tabular-nums text-slate-50">
          {minutes}:{seconds}
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-primary-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning((v) => !v)}
          className="flex-1 rounded-xl bg-primary-600 hover:bg-primary-700 text-xs font-medium text-white py-2 transition-colors"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="flex-1 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 py-2 hover:bg-slate-900 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

