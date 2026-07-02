import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/subjects", label: "Subjects" },
  { to: "/assessment", label: "Assessment" },
  { to: "/weak-areas", label: "Weak Areas" },
  { to: "/course", label: "Course" },
  { to: "/study-mode", label: "Study Mode" },
  { to: "/gamification", label: "Progress" }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 xl:w-72 flex-col border-r border-slate-800/80 bg-slate-950/80">
      <div className="px-6 py-5 border-b border-slate-800/80">
        <p className="text-sm font-semibold tracking-tight text-slate-100">
          Adaptive Learning
        </p>
        <p className="text-xs text-slate-500">
          Control center for your learning
        </p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all",
                isActive
                  ? "bg-slate-800 text-slate-50"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/80"
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-xl bg-primary-600/10 border border-primary-600/40"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-slate-800/80 text-xs text-slate-500">
        Adaptive engine v1.0
      </div>
    </aside>
  );
}

