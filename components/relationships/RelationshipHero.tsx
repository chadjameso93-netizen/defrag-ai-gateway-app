"use client";

export default function RelationshipHero({
  relationship,
  state
}: any) {
  return (
    <div className="surface-elevated">
      <div className="kicker">Relationship</div>

      <div className="h2-premium">
        {relationship?.label || "Relationship"}
      </div>

      <p className="text-muted" style={{ marginTop: 10 }}>
        This is the live system between you — not just the last message.
      </p>

      {state ? (
        <div style={{ marginTop: 16 }}>
          <strong>{state.state}</strong> · {Math.round(state.pressure * 100)}% pressure
        </div>
      ) : null}
    </div>
  );
}
