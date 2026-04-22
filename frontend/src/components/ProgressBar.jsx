export default function ProgressBar({ label, value, subtle = false }) {
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div
        className={`h-1.5 rounded-full ${
          subtle ? "bg-slate-800" : "bg-slate-900"
        } overflow-hidden`}
      >
        <div
          className={`h-full ${
            subtle ? "bg-primary-500/70" : "bg-primary-500"
          } transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

