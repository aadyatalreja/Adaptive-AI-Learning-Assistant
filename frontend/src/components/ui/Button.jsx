import { motion } from "framer-motion";

const styles = {
  primary:
    "bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan text-white shadow-glow",
  secondary:
    "bg-white/[0.05] text-slate-100 border border-white/10 hover:bg-white/[0.08]",
  ghost: "text-slate-200 hover:bg-white/[0.06] border border-transparent",
  danger:
    "bg-red-500/10 text-red-200 border border-red-500/30 hover:bg-red-500/15"
};

const sizes = {
  sm: "text-xs px-3 py-2 rounded-xl",
  md: "text-sm px-4 py-2.5 rounded-xl"
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  ...props
}) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.01, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.99 }}
      className="inline-block"
    >
      <Comp
        disabled={disabled}
        className={[
          "focus-ring inline-flex items-center justify-center gap-2 font-medium transition-colors",
          sizes[size],
          styles[variant],
          disabled ? "opacity-60 cursor-not-allowed" : "",
          className
        ].join(" ")}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  );
}

