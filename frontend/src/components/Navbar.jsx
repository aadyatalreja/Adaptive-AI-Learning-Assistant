import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { useState } from "react";
import Button from "./ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { xp, level } = useProgress();
  const [open, setOpen] = useState(false);

  const current = xp % 500;
  const percent = (current / 500) * 100;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-base-900/65 backdrop-blur-lg">
      <div className="px-4 py-3 md:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-glow">
            <span className="text-xs font-semibold tracking-tight text-gradient">
              AL
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-100 truncate">
              AI Adaptive Learning
            </p>
            <p className="text-xs text-slate-400 truncate">
              Personalized paths · assessments · mastery
            </p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 card-muted px-3 py-2">
              <div className="text-xs">
                <p className="text-slate-400">Level</p>
                <p className="text-slate-100 font-semibold">L{level}</p>
              </div>
              <div className="w-28">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span>XP</span>
                  <span>{current}/500</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="focus-ring rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-3 py-2 text-left"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-200">
                  {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-slate-100 leading-4">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">
                    {user.role || "Learner"}
                  </p>
                </div>
                <svg
                  className="h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeWidth="1.7" d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </button>

            {open && (
              <div
                className="absolute right-4 md:right-8 top-[62px] w-56 glass-panel p-2"
                role="menu"
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-sm text-slate-100 font-medium truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="p-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

