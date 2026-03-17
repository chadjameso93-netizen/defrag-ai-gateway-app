"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalUser } from "@/hooks/useLocalUser";
import RelationshipComposer from "@/components/relationships/RelationshipComposer";
import AppShell from "@/components/layout/AppShell";

type Relationship = {
  id: string;
  label: string;
  relationship_type: string;
  created_at: string;
};

export default function RelationshipsPage() {
  const userId = useLocalUser();
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadRelationships() {
    if (!userId) return;

    setLoading(true);

    const res = await fetch(`/api/v1/relationships?ownerUserId=${encodeURIComponent(userId)}`, {
      cache: "no-store"
    });

    const data = await res.json();
    setRelationships(data.relationships || []);
    setLoading(false);
  }

  useEffect(() => {
    loadRelationships();
  }, [userId]);

  return (
    <AppShell
      title="Relationships"
      subtitle="Create, manage, and inspect the live systems Defrag uses for ongoing analysis."
    >
      <div className="grid" style={{ gridTemplateColumns: "1.08fr .92fr", gap: 24 }}>
        <div className="card">
          <div className="result-title">Relationship list</div>

          {loading ? (
            <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
          ) : relationships.length === 0 ? (
            <div className="result-copy" style={{ marginTop: 12 }}>No relationships yet.</div>
          ) : (
            <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
              {relationships.map((item) => (
                <Link key={item.id} href={`/relationships/${item.id}`} className="message-box">
                  <div className="result-title">{item.relationship_type}</div>
                  <div className="result-copy">{item.label}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <RelationshipComposer userId={userId} onCreated={loadRelationships} />
      </div>
    </AppShell>
  );
}
