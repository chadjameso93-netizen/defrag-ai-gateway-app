"use client";

import { useEffect, useState } from "react";

export function useSelectedRelationship() {
  const [relationshipId, setRelationshipId] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("defrag_selected_relationship_id");
    if (saved) {
      setRelationshipId(saved);
    }
  }, []);

  function update(next: string) {
    setRelationshipId(next);
    if (next) {
      window.localStorage.setItem("defrag_selected_relationship_id", next);
    } else {
      window.localStorage.removeItem("defrag_selected_relationship_id");
    }
  }

  return {
    relationshipId,
    setRelationshipId: update
  };
}
