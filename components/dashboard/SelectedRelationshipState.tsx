"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

export default function SelectedRelationshipState({
  relationshipId
}: {
  relationshipId: string;
}) {
  const [stateData, setStateData] = useState<any | null>(null);
  const [relationship, setRelationship] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      if (!relationshipId) {
        setStateData(null);
        setRelationship(null);
        return;
      }

      const [stateRes, detailRes] = await Promise.all([
        fetch(`/api/v1/relationships/state?relationshipId=${encodeURIComponent(relationshipId)}`, {
          cache: "no-store"
        }),
        fetch(`/api/v1/relationships/detail?id=${encodeURIComponent(relationshipId)}`, {
          cache: "no-store"
        })
      ]);

      const stateJson = await stateRes.json();
      const detailJson = await detailRes.json();

      setStateData(stateJson.ok ? stateJson : null);
      setRelationship(detailJson.ok ? detailJson.relationship : null);
    }

    load();
  }, [relationshipId]);

  if (!relationshipId) {
    return (
      <div className="card">
        <div className="result-title">Selected relationship</div>
        <div className="result-copy" style={{ marginTop: 12 }}>
          Select a relationship to anchor the console in a real live system.
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="result-title">Selected relationship</div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em" }}>
          {relationship?.label || "Relationship"}
        </div>
        <div className="muted" style={{ marginTop: 6 }}>
          {relationship?.relationship_type || "Unknown type"}
        </div>
      </div>

      {stateData ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          <StatusBadge
            label={stateData.state}
            tone={stateData.pressure >= 0.75 ? "warn" : stateData.pressure >= 0.5 ? "strong" : "good"}
          />
          <StatusBadge label={`Pressure ${Math.round((stateData.pressure || 0) * 100)}%`} tone="neutral" />
          <StatusBadge label={`${stateData.eventCount || 0} events`} tone="strong" />
        </div>
      ) : null}
    </div>
  );
}
