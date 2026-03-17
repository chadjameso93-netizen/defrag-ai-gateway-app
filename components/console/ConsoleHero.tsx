"use client";

export default function ConsoleHero() {
  return (
    <div className="card card-dark" style={{ minHeight: 180, display: "grid", alignContent: "space-between" }}>
      <div>
        <div className="kicker">Live system</div>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}>
          Relational clarity, timing, and pressure in one place.
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
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
