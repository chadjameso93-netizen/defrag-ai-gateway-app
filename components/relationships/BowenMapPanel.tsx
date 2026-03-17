"use client";

export default function BowenMapPanel() {
  return (
    <section className="rail-map-surface">
      <div className="result-title">Family systems view</div>

      <div className="bowen-live-map">
        <div className="bowen-node bowen-you">You</div>
        <div className="bowen-node bowen-other">Other</div>
        <div className="bowen-node bowen-family">System</div>

        <div className="bowen-connector connector-a" />
        <div className="bowen-connector connector-b" />
      </div>

      <p className="muted" style={{ marginTop: 14 }}>
        This shows where the tension may be sitting in the relationship, not just in the last message.
      </p>
    </section>
  );
}
