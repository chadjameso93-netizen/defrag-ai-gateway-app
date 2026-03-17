"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function continueWithEmail() {
    const supabase = getSupabaseBrowser();

    if (!supabase) {
      setMessage("Preview mode is active. Public auth env is not enabled yet.");
      return;
    }

    setLoading(true);
    setMessage("");

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/app`
        : undefined;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo
      }
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Check your email for a sign-in link.");
    setLoading(false);
  }

  return (
    <AppShell
      title="Login"
      subtitle="Sign in to move from preview identity to a real account session."
    >
      <div className="input-card" style={{ maxWidth: 620, margin: "0 auto" }}>
        <div className="kicker">Access</div>
        <h2 style={{ fontSize: 32, marginTop: 0, marginBottom: 8 }}>Sign in to Defrag</h2>
        <p className="muted">
          Real auth will replace preview identity once public auth env is enabled. This page is already wired for that transition.
        </p>

        <label className="label" style={{ marginTop: 18 }}>Email</label>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        {message ? <div style={{ marginTop: 14, color: "rgba(255,255,255,.78)" }}>{message}</div> : null}

        <div className="actions">
          <button className="btn btn-primary" disabled={loading || !email.trim()} onClick={continueWithEmail}>
            {loading ? "Sending..." : "Continue with email"}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
