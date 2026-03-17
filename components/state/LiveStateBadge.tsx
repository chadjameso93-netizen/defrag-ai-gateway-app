"use client";

import StatusBadge from "@/components/badges/StatusBadge";

export default function LiveStateBadge({
  state,
  pressure
}: {
  state: string;
  pressure: number;
}) {
  const tone =
    state === "activation" || state === "triangulation"
      ? "warn"
      : state === "tension"
      ? "strong"
      : state === "calm"
      ? "good"
      : "neutral";

  return (
    <div className="message-box" style={{ display: "grid", gap: 10 }}>
      <div className="result-title">Live state</div>
      <div className="result-copy" style={{ marginTop: 4, fontSize: 20, fontWeight: 800 }}>
        {state}
      </div>
      <div className="muted">Pressure: {Math.round(pressure * 100)}%</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <StatusBadge label={state} tone={tone as any} />
        <StatusBadge
          label={
            pressure >= 0.75
              ? "High pressure"
              : pressure >= 0.5
              ? "Moderate pressure"
              : "Low pressure"
          }
          tone={tone as any}
        />
      </div>
    </div>
  );
}
