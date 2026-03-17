"use client";

export default function RelationshipStateCard({ state }: any) {
  if (!state) return null;

  return (
    <div className="card">
      <div className="kicker">System state</div>

      <div style={{ fontSize: 28, fontWeight: 800 }}>
        {state.state}
      </div>

      <div className="muted" style={{ marginTop: 6 }}>
        Pressure: {Math.round((state.pressure || 0) * 100)}%
      </div>
    </div>
  );
}
