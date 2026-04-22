export function GlassPanel({ className = "", children }) {
  return <div className={["glass-panel", className].join(" ")}>{children}</div>;
}

export function SurfaceCard({ className = "", children }) {
  return <div className={["card-muted", className].join(" ")}>{children}</div>;
}

