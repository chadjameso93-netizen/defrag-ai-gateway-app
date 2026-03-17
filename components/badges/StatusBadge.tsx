"use client";

export default function StatusBadge({
  label,
  tone = "neutral"
}: {
  label: string;
  tone?: "neutral" | "good" | "warn" | "strong";
}) {
  const styles =
    tone === "good"
      ? { border: "1px solid rgba(134,239,172,.28)", background: "rgba(134,239,172,.08)", color: "#bbf7d0" }
      : tone === "warn"
      ? { border: "1px solid rgba(251,191,36,.28)", background: "rgba(251,191,36,.08)", color: "#fde68a" }
      : tone === "strong"
      ? { border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.92)" }
      : { border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)", color: "rgba(255,255,255,.72)" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        lineHeight: 1,
        fontWeight: 700,
        letterSpacing: ".02em",
        ...styles
      }}
    >
      {label}
    </span>
  );
}
