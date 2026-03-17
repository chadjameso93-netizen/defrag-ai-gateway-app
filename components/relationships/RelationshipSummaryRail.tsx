"use client";

import StatusBadge from "@/components/badges/StatusBadge";

export default function RelationshipSummaryRail({
  relationship,
  state,
  participants,
  invites,
  events
}: {
  relationship: any;
  state: { state: string; pressure: number } | null;
  participants: any[];
  invites: any[];
  events: any[];
}) {
  const participantCount = participants.length;
  const completeCount = participants.filter((p) => p.birth_date && p.birth_place).length;
  const pendingInvites = invites.filter((i) => i.status !== "completed").length;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div className="card">
        <div className="result-title">Relationship</div>
        <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", marginTop: 8 }}>
          {relationship?.label || "Relationship"}
        </div>
        <div className="muted" style={{ marginTop: 6 }}>
          {relationship?.relationship_type || "Unknown type"}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <StatusBadge label={relationship?.system_type || "dyad"} tone="strong" />
          {state ? (
            <StatusBadge
              label={state.state}
              tone={state.pressure >= 0.75 ? "warn" : state.pressure >= 0.5 ? "strong" : "good"}
            />
          ) : null}
          {state ? <StatusBadge label={`Pressure ${Math.round(state.pressure * 100)}%`} tone="neutral" /> : null}
        </div>
      </div>

      <div className="card">
        <div className="result-title">Coverage</div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <div className="mini-card">
            <div className="label">Participants</div>
            <div className="value" style={{ fontSize: 22 }}>{participantCount}</div>
          </div>
          <div className="mini-card">
            <div className="label">Complete</div>
            <div className="value" style={{ fontSize: 22 }}>{completeCount}</div>
          </div>
          <div className="mini-card">
            <div className="label">Pending invites</div>
            <div className="value" style={{ fontSize: 22 }}>{pendingInvites}</div>
          </div>
          <div className="mini-card">
            <div className="label">Events</div>
            <div className="value" style={{ fontSize: 22 }}>{events.length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="result-title">Interpretation</div>
        <div className="result-copy" style={{ marginTop: 12 }}>
          {!state
            ? "Relationship state is still loading."
            : state.state === "activation"
            ? "The system is running hot. Timing matters more than force right now."
            : state.state === "tension"
            ? "There is noticeable charge in the system. Softer pacing is likely more effective."
            : state.state === "distance"
            ? "The system is quiet, but quiet does not necessarily mean resolved."
            : state.state === "triangulation"
            ? "More than one relational force appears to be shaping the moment."
            : "The system is relatively steady right now, which may allow for cleaner next steps."}
        </div>
      </div>
    </div>
  );
}
