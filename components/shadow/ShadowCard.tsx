"use client";

export default function ShadowCard() {
  return (
    <section className="shadow-gift-card">
      <div className="shadow-ring-wrap">
        <div className="shadow-ring outer" />
        <div className="shadow-ring inner" />
        <div className="shadow-core">Shift</div>
      </div>

      <div className="shadow-copy">
        <div className="result-title">Shadow to gift</div>
        <h3>From control to calm</h3>
        <p className="muted">
          Work with Defrag step by step to move a hard feeling into a steadier response.
        </p>

        <div className="shadow-steps">
          <div>
            <span>What you may be holding</span>
            <strong>Trying to control the outcome</strong>
          </div>
          <div>
            <span>What helps</span>
            <strong>Name the fear. Slow the move.</strong>
          </div>
          <div>
            <span>What this becomes</span>
            <strong>Staying present without forcing</strong>
          </div>
        </div>

        <button className="btn btn-primary">Work through this</button>
      </div>
    </section>
  );
}
