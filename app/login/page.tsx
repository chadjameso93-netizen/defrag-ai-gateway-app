"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="kicker">Login</div>
          <h1 className="section-title">Sign in to Defrag</h1>
          <p className="muted">
            Account-backed access is required for full relational analysis, saved profiles, and premium features.
          </p>

          <label className="label" style={{ marginTop: 18 }}>Email</label>
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <div className="actions">
            <button className="btn btn-primary">Continue</button>
          </div>
        </div>
      </div>
    </main>
  );
}
