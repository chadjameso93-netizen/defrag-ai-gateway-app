"use client";

export default function LiveStateBadge({
  state,
  pressure
}: {
  state: string;
  pressure: number;
}) {
  return (
    <div className="message-box">
      <div className="result-title">Live state</div>
      <div className="result-copy" style={{ marginTop: 8 }}>{state}</div>
      <div className="muted" style={{ marginTop: 6 }}>
        Pressure: {Math.round(pressure * 100)}%
      </div>
    </div>
  );
}
