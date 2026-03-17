"use client";

import StatusBadge from "@/components/badges/StatusBadge";

export default function ParticipantCard({
  participant
}: {
  participant: any;
}) {
  const hasBirthDate = Boolean(participant.birth_date);
  const hasBirthPlace = Boolean(participant.birth_place);
  const hasBirthTime = Boolean(participant.birth_time);

  const completeness =
    hasBirthDate && hasBirthPlace && hasBirthTime
      ? "high"
      : hasBirthDate && hasBirthPlace
      ? "medium"
      : "low";

  return (
    <div className="message-box" style={{ display: "grid", gap: 10 }}>
      <div>
        <div className="result-title">{participant.role}</div>
        <div className="result-copy">{participant.display_name}</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <StatusBadge
          label={
            completeness === "high"
              ? "High completeness"
              : completeness === "medium"
              ? "Partial completeness"
              : "Low completeness"
          }
          tone={completeness === "high" ? "good" : completeness === "medium" ? "warn" : "neutral"}
        />
        <StatusBadge
          label={
            participant.privacy_mode === "shared"
              ? "Shared"
              : participant.privacy_mode === "derived_only"
              ? "Derived only"
              : "Private raw"
          }
          tone="strong"
        />
        <StatusBadge
          label={
            participant.data_status === "submitted"
              ? "Submitted"
              : participant.data_status === "pending_invite"
              ? "Pending invite"
              : "Status unknown"
          }
          tone={participant.data_status === "submitted" ? "good" : "warn"}
        />
      </div>
    </div>
  );
}
