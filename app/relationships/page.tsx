"use client";

import { useAppIdentity } from "@/hooks/useAppIdentity";
import RelationshipComposer from "@/components/relationships/RelationshipComposer";
import AppShell from "@/components/layout/AppShell";
import RelationshipStateList from "@/components/relationships/RelationshipStateList";

export default function RelationshipsPage() {
  const { userId } = useAppIdentity();

  return (
    <AppShell
      title="Relationships"
      subtitle="Create, manage, and inspect the live systems Defrag uses for ongoing analysis."
    >
      <div className="grid console-grid-two" style={{ gap: 24 }}>
        <RelationshipStateList userId={userId} />
        <RelationshipComposer userId={userId} onCreated={() => window.location.reload()} />
      </div>
    </AppShell>
  );
}
