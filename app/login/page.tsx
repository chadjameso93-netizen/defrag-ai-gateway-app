"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { getSupabaseBrowser } from "@/lib/supabase/browser";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import AuthSetupNotice from "@/components/auth/AuthSetupNotice";

export default function LoginPage() {
  const identity = useAppIdentity();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (identity.isAuthed) {
      window.location.href = "/app";
    }
  }, [identity.isAuthed]);

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
        ? `${window.location.origin}/auth/callback?next=/app`
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
      subtitle="Move from preview identity into a real account session when public auth is enabled."
    >
      <div className="grid console-grid-two" style={{ gap: 24 }}>
        <div className="input-card">
          <div className="kicker">Access</div>
          <h2 style={{ fontSize: 32, marginTop: 0, marginBottom: 8 }}>Sign in to Defrag</h2>
          <p className="muted">
            This page is wired for Supabase email sign-in and still falls back safely when preview mode is active.
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

        <AuthSetupNotice />
      </div>
    </AppShell>
  );
}
