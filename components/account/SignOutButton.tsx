"use client";

import { getSupabaseBrowser } from "@/lib/supabase/browser";

export default function SignOutButton() {
  async function signOut() {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = "/app";
  }

  return (
    <button className="btn btn-secondary" onClick={signOut}>
      Sign out
    </button>
  );
}
