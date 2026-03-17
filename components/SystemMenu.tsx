"use client";

import { useState } from "react";

export default function SystemMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="system-menu">
      <button onClick={() => setOpen(!open)}>•••</button>

      {open && (
        <div className="system-dropdown">
          <a href="/onboarding">Profile</a>
          <a href="/settings">Settings</a>
          <a href="/billing">Billing</a>
          <a href="/">Logout</a>
        </div>
      )}
    </div>
  );
}
