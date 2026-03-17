"use client";

import StatusBadge from "@/components/badges/StatusBadge";

export default function RelationshipHero({
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
  return (
    <div className="card card-dark" style={{ minHeight: 220 }}>
      <div className="kicker">Relationship system</div>

      <div style={{ display: "grid", gap: 18 }}>
        <div>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 1.02 }}>
            {relationship?.label || "Relationship"}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            {relationship?.relationship_type || "Unknown type"} · live operational view
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <StatusBadge label={`${participants.length} participants`} tone="strong" />
          <StatusBadge label={`${invites.length} invites`} tone="neutral" />
          <StatusBadge label={`${events.length} events`} tone="neutral" />
          {state ? (
            <>
              <StatusBadge
                label={state.state}
                tone={state.pressure >= 0.75 ? "warn" : state.pressure >= 0.5 ? "strong" : "good"}
              />
              <StatusBadge label={`Pressure ${Math.round(state.pressure * 100)}%`} tone="neutral" />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
