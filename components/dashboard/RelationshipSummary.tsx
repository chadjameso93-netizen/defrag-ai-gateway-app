"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Relationship = {
  id: string;
  label: string;
  relationship_type: string;
};

export default function RelationshipSummary({ userId }: { userId: string }) {
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    loadRelationships();
  }, [userId]);

  return (
    <div className="card">
      <div className="result-title">Relationships</div>

      {loading ? (
        <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
      ) : relationships.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>No relationships yet.</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {relationships.slice(0, 4).map((item) => (
            <Link key={item.id} href={`/relationships/${item.id}`} className="message-box">
              <div className="result-title">{item.relationship_type}</div>
              <div className="result-copy">{item.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
