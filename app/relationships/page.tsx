"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalUser } from "@/hooks/useLocalUser";
import RelationshipComposer from "@/components/relationships/RelationshipComposer";

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
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="kicker">Relationships</div>
          <h1 className="section-title">Your relationship system</h1>
          <p className="muted">
            Create and manage the people and systems Defrag uses for ongoing relational analysis.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1.1fr .9fr", gap: 24, marginTop: 24 }}>
            <div className="card">
              <div className="result-title">Relationships</div>

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
        </div>
      </div>
    </main>
  );
}
