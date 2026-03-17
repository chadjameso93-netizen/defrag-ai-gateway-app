"use client";

export default function RelationshipHeader({ relationship }: any) {
  if (!relationship) return null;

  return (
    <div className="card card-dark">
      <div className="kicker">Relationship</div>
      <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.05em" }}>
        {relationship.label}
      </div>

      <div className="muted" style={{ marginTop: 8 }}>
        {relationship.relationship_type}
      </div>
    </div>
  );
}
