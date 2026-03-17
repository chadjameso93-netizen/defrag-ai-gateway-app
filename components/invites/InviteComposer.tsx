"use client";

import { useState } from "react";

export default function InviteComposer({
  relationshipId,
  ownerUserId,
  onCreated
}: {
  relationshipId: string;
  ownerUserId: string;
  onCreated?: () => void;
}) {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("partner");
  const [channel, setChannel] = useState("link");
  const [recipientContact, setRecipientContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");
    setInviteUrl("");

    const res = await fetch("/api/v1/invites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        relationshipId,
        ownerUserId,
        displayName,
        role,
        channel,
        recipientContact
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to create invite.");
      setLoading(false);
      return;
    }

    setInviteUrl(data.inviteUrl || "");
    setDisplayName("");
    setRecipientContact("");
    setLoading(false);
    onCreated?.();
  }

  return (
    <div className="card">
      <div className="result-title">Invite participant</div>

      <label className="label" style={{ marginTop: 14 }}>Name</label>
      <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Role</label>
      <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="partner">Partner</option>
        <option value="parent">Parent</option>
        <option value="child">Child</option>
        <option value="friend">Friend</option>
        <option value="coworker">Coworker</option>
        <option value="team">Team member</option>
      </select>

      <label className="label" style={{ marginTop: 14 }}>Channel</label>
      <select className="input" value={channel} onChange={(e) => setChannel(e.target.value)}>
        <option value="link">Secure link</option>
        <option value="email">Email</option>
        <option value="sms">SMS</option>
      </select>

      <label className="label" style={{ marginTop: 14 }}>Recipient contact</label>
      <input className="input" value={recipientContact} onChange={(e) => setRecipientContact(e.target.value)} placeholder="Optional for link" />

      {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}
      {inviteUrl ? <div style={{ marginTop: 14, color: "#86efac", overflowWrap: "anywhere" }}>{inviteUrl}</div> : null}

      <div className="actions">
        <button className="btn btn-primary" disabled={loading || !displayName.trim()} onClick={submit}>
          {loading ? "Creating..." : "Create invite"}
        </button>
      </div>
    </div>
  );
}
