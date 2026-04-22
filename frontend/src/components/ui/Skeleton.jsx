export default function Skeleton({ className = "" }) {
  return (
    <div
      className={[
        "animate-pulse rounded-xl bg-white/[0.06] border border-white/10",
        className
      ].join(" ")}
    />
  );
}

