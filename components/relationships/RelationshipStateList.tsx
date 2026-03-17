"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

type Relationship = {
  id: string;
  label: string;
  relationship_type: string;
};

export default function RelationshipStateList({ userId }: { userId: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      setLoading(true);

      const res = await fetch(`/api/v1/relationships?ownerUserId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });
      const data = await res.json();
      const relationships: Relationship[] = data.relationships || [];

      const enriched = await Promise.all(
        relationships.map(async (relationship) => {
          const stateRes = await fetch(
            `/api/v1/relationships/state?relationshipId=${encodeURIComponent(relationship.id)}`,
            { cache: "no-store" }
          );
          const stateData = await stateRes.json();

          return {
            ...relationship,
            state: stateData.state || "calm",
            pressure: stateData.pressure || 0
          };
        })
      );

      setItems(enriched);
      setLoading(false);
    }

    load();
  }, [userId]);

  return (
    <div className="card">
      <div className="result-title">Relationship states</div>

      {loading ? (
        <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
      ) : items.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>No relationships yet.</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {items.map((item) => (
            <Link key={item.id} href={`/relationships/${item.id}`} className="message-box">
              <div className="result-title">{item.label}</div>
              <div className="result-copy">{item.relationship_type}</div>
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <StatusBadge label={item.state} tone={item.pressure >= 0.75 ? "warn" : item.pressure >= 0.5 ? "strong" : "good"} />
                <StatusBadge label={`Pressure ${Math.round(item.pressure * 100)}%`} tone="neutral" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
