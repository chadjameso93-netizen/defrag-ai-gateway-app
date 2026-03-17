"use client";

export default function ConsoleHero() {
  return (
    <div className="card card-dark" style={{ minHeight: 220, display: "grid", alignContent: "space-between" }}>
      <div>
        <div className="kicker">Live system</div>
        <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.02, maxWidth: 760 }}>
          Relational clarity, timing, and pressure in one place.
        </div>
        <p className="muted" style={{ marginTop: 14, maxWidth: 720 }}>
          Use the console to read live relational state, review the timeline, and move more carefully through difficult moments.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginTop: 22 }}>
        <div className="mini-card">
          <div className="label">Mode</div>
          <div className="value" style={{ fontSize: 18 }}>Premium Console</div>
        </div>
        <div className="mini-card">
          <div className="label">Daily Reads</div>
          <div className="value" style={{ fontSize: 18 }}>AM / PM</div>
        </div>
        <div className="mini-card">
          <div className="label">System State</div>
          <div className="value" style={{ fontSize: 18 }}>Live</div>
        </div>
      </div>
    </div>
  );
}
