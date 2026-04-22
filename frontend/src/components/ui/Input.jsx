import { useId, useState } from "react";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  error,
  hint,
  rightSlot,
  className = "",
  ...props
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = value != null && String(value).length > 0;
  const float = focused || hasValue;

  return (
    <div className={["space-y-1.5", className].join(" ")}>
      <div
        className={[
          "relative rounded-2xl border bg-white/[0.04] backdrop-blur-lg transition-colors",
          error ? "border-red-500/40" : "border-white/10 hover:border-white/15",
          focused ? "border-accent-cyan/35 shadow-glow" : ""
        ].join(" ")}
      >
        <label
          htmlFor={id}
          className={[
            "absolute left-3 transition-all select-none pointer-events-none",
            float ? "top-2 text-[11px] text-slate-400" : "top-3.5 text-sm text-slate-500"
          ].join(" ")}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={[
            "focus-ring w-full bg-transparent text-slate-100 px-3 pb-2.5",
            float ? "pt-6" : "pt-4",
            rightSlot ? "pr-11" : ""
          ].join(" ")}
          {...props}
        />
        {rightSlot && <div className="absolute right-2 top-2.5">{rightSlot}</div>}
      </div>
      {error ? (
        <p className="text-xs text-red-200">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

