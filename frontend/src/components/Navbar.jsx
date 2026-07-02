import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-8 glass-panel rounded-none rounded-b-2xl">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-xl bg-primary-600 flex items-center justify-center text-xs font-semibold tracking-tight">
          AL
        </div>
        <div>
          <p className="text-sm font-medium text-slate-100">
            AI Adaptive Learning
          </p>
          <p className="text-xs text-slate-400">
            Personalized learning paths in real time
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-100">
                {user.name || user.email}
              </span>
              <span className="text-xs text-slate-400 capitalize">
                {user.role || "Learner"}
              </span>
            </div>
            <button
              onClick={logout}
              className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

