"use client";

import { useState } from "react";

export default function AddPersonEntry() {
  const [open, setOpen] = useState(false);

  return (
    <section className="rail-map-surface">
      <div className="result-title">Add someone</div>

      {!open ? (
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Add person
        </button>
      ) : (
        <div className="add-person-flow">
          <button className="btn btn-secondary">Send SMS request</button>
          <button className="btn btn-secondary">Copy invite link</button>
          <button className="btn btn-secondary">Enter by hand</button>
        </div>
      )}

      <p className="muted" style={{ marginTop: 12 }}>
        Ask someone to send their birth details back to Defrag, or add them yourself.
      </p>
    </section>
  );
}
