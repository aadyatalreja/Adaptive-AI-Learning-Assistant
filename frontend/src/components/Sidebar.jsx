import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Icon({ name, className = "h-4 w-4" }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none" };
  switch (name) {
    case "dashboard":
      return (
        <svg {...common} stroke="currentColor">
          <path strokeWidth="1.6" d="M4 13h7V4H4v9Zm9 7h7V11h-7v9ZM4 20h7v-5H4v5Zm9-11h7V4h-7v5Z" />
        </svg>
      );
    case "subjects":
      return (
        <svg {...common} stroke="currentColor">
          <path strokeWidth="1.6" d="M6 4h12v16H6V4Z" />
          <path strokeWidth="1.6" d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "assessment":
      return (
        <svg {...common} stroke="currentColor">
          <path strokeWidth="1.6" d="M8 4h8l2 2v14H6V6l2-2Z" />
          <path strokeWidth="1.6" d="M9 11h6M9 15h4" />
        </svg>
      );
    case "weak":
      return (
        <svg {...common} stroke="currentColor">
          <path strokeWidth="1.6" d="M12 2 2 20h20L12 2Z" />
          <path strokeWidth="1.6" d="M12 9v5M12 17h.01" />
        </svg>
      );
    case "study":
      return (
        <svg {...common} stroke="currentColor">
          <path strokeWidth="1.6" d="M4 6.5C4 5.12 5.12 4 6.5 4H20v16H6.5A2.5 2.5 0 0 1 4 17.5V6.5Z" />
          <path strokeWidth="1.6" d="M8 7h8M8 11h8M8 15h6" />
        </svg>
      );
    case "progress":
      return (
        <svg {...common} stroke="currentColor">
          <path strokeWidth="1.6" d="M4 19V5" />
          <path strokeWidth="1.6" d="M8 19V11" />
          <path strokeWidth="1.6" d="M12 19V7" />
          <path strokeWidth="1.6" d="M16 19V13" />
          <path strokeWidth="1.6" d="M20 19V9" />
        </svg>
      );
    default:
      return null;
  }
}

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/subjects", label: "Subjects", icon: "subjects" },
  { to: "/assessment", label: "Assessment", icon: "assessment" },
  { to: "/weak-areas", label: "Weak Areas", icon: "weak" },
  { to: "/study-mode", label: "Study Mode", icon: "study" },
  { to: "/gamification", label: "Progress", icon: "progress" }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={[
        "hidden md:flex flex-col border-r border-white/10 bg-base-900/70 backdrop-blur-lg sticky top-0 h-screen",
        collapsed ? "md:w-[72px]" : "md:w-[260px] xl:w-[280px]"
      ].join(" ")}
    >
      <div className="px-4 py-4 border-b border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-glow">
            <span className="text-xs font-semibold tracking-tight text-gradient">
              AL
            </span>
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-100">
                Adaptive Learning
              </p>
              <p className="text-xs text-slate-500">Workspace</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="focus-ring rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-2 py-2 text-slate-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="1.7"
              d={collapsed ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}
            />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-all overflow-hidden",
                isActive
                  ? "text-slate-50"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]"
              ].join(" ")
            }
            title={collapsed ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-indigo/15 via-accent-violet/15 to-accent-cyan/15 border border-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center h-6 w-6">
                  <Icon name={item.icon} />
                </span>
                {!collapsed && (
                  <span className="relative z-10">{item.label}</span>
                )}

                {collapsed && (
                  <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-xl border border-white/10 bg-base-900/90 px-2 py-1 text-xs text-slate-200 opacity-0 shadow-glow transition-all group-hover:opacity-100 group-hover:translate-x-2">
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10 text-xs text-slate-500">
        {!collapsed ? "Adaptive engine v1.0" : <span className="sr-only">Adaptive engine v1.0</span>}
      </div>
    </aside>
  );
}

