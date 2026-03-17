"use client";

import { useEffect, useState } from "react";

const states = [
  {
    happening: "They are not pulling away — they are regulating after pressure.",
    risk: "Medium, stabilizing",
    move: "Keep tone light. Do not push for resolution."
  },
  {
    happening: "The tension is coming from how the last message felt, not the topic itself.",
    risk: "Rising",
    move: "Remove urgency. Shorter, softer message."
  },
  {
    happening: "Distance is being maintained to avoid escalation, not to disconnect.",
    risk: "Stable",
    move: "Wait. Let timing reduce pressure."
  }
];

export default function InsightProofCard() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % states.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const s = states[i];

  return (
    <div className="proof-card insight-proof">
      <div className="proof-kicker">Live AI read</div>

      <div className="proof-block">
        <div className="proof-label">What may be happening</div>
        <div className="proof-copy">{s.happening}</div>
      </div>

      <div className="proof-block">
        <div className="proof-label">Pressure level</div>
        <div className="proof-copy">{s.risk}</div>
      </div>

      <div className="proof-block">
        <div className="proof-label">Best next move</div>
        <div className="proof-copy">{s.move}</div>
      </div>
    </div>
  );
}
