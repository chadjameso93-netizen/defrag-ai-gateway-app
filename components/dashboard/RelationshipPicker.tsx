"use client";

import { useEffect, useState } from "react";

type Relationship = {
  id: string;
  label: string;
  relationship_type: string;
};

export default function RelationshipPicker({
  userId,
  value,
  onChange
}: {
  userId: string;
  value: string;
  onChange: (id: string) => void;
}) {
  const [items, setItems] = useState<Relationship[]>([]);

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const res = await fetch(`/api/v1/relationships?ownerUserId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      setItems(data.relationships || []);
    }

    load();
  }, [userId]);

  return (
    <div>
      <label className="label">Relationship</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select a relationship</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label} · {item.relationship_type}
          </option>
        ))}
      </select>
    </div>
  );
}
