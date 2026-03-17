"use client";

export default function BowenProofCard() {
  return (
    <div className="proof-card bowen-proof">
      <div className="proof-kicker">Live system state</div>

      <div className="bowen-map">
        <div className="bowen-node node-a">You</div>
        <div className="bowen-node node-b">Them</div>
        <div className="bowen-node node-c">Pressure</div>

        <div className="bowen-line line-ab warm" />
        <div className="bowen-line line-bc cool" />
      </div>

      <div className="proof-meta">
        <div className="proof-label">Bowen-style signal</div>
        <div className="proof-copy">
          Pressure is entering the dyad through an external load, not only through direct conflict.
        </div>
      </div>
    </div>
  );
}
