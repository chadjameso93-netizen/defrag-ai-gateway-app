"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";

type Relationship = {
  id: string;
  label: string;
  relationship_type: string;
  status: string;
};

export default function RelationshipsPage() {
  const { userId } = useAppIdentity();
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!userId) return;
    const res = await fetch(`/api/v1/relationships?userId=${encodeURIComponent(userId)}`, {
      cache: "no-store"
    });
    const data = await res.json();
    setRelationships(data.relationships || []);
  }

  useEffect(() => {
    load();
  }, [userId]);

  async function createRelationship() {
    if (!userId || !label.trim()) return;
    setLoading(true);

    const res = await fetch("/api/v1/relationships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        label,
        relationshipType: "connection"
      })
    });

    const data = await res.json();

    if (data?.relationship?.id) {
      await fetch("/api/v1/relationship-summaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          relationshipId: data.relationship.id,
          label
        })
      });
    }

    setLabel("");
    setLoading(false);
    load();
  }

  return (
    <AppShell
      title="People"
      subtitle="The people and relationships in your system."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Add someone</div>
          <div className="actions" style={{ marginTop: 12 }}>
            <input
              className="input"
              placeholder="Name"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <button className="btn btn-primary" onClick={createRelationship} disabled={loading || !label.trim()}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Your people</div>
          <div className="relationship-list">
            {relationships.length === 0 ? (
              <div className="result-copy">No people yet. Add someone to start building your system.</div>
            ) : (
              relationships.map((item) => (
                <a key={item.id} href={`/relationships/${item.id}`} className="relationship-row">
                  <div>
                    <strong>{item.label}</strong>
                    <div className="muted">{item.relationship_type}</div>
                  </div>
                  <div className="relationship-status">{item.status}</div>
                </a>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
