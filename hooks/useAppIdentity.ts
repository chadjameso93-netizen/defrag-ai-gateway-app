"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

const SEEDED_USER_ID = "11111111-1111-1111-1111-111111111111";

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `user_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function useAppIdentity() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [mode, setMode] = useState<"preview" | "auth">("preview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowser();

    async function init() {
      if (!supabase) {
        const existing = window.localStorage.getItem("defrag_user_id");
        if (existing) {
          setUserId(existing);
          setMode("preview");
          setLoading(false);
          return;
        }

        window.localStorage.setItem("defrag_user_id", SEEDED_USER_ID);
        setUserId(SEEDED_USER_ID);
        setMode("preview");
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;

      if (sessionUser) {
        setUserId(sessionUser.id);
        setEmail(sessionUser.email || null);
        setMode("auth");
        setLoading(false);
        return;
      }

      const existing = window.localStorage.getItem("defrag_user_id");
      if (existing) {
        setUserId(existing);
        setMode("preview");
        setLoading(false);
        return;
      }

      const next = randomId();
      window.localStorage.setItem("defrag_user_id", next);
      setUserId(next);
      setMode("preview");
      setLoading(false);
    }

    init();

    if (!supabase) return;

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;

      if (sessionUser) {
        setUserId(sessionUser.id);
        setEmail(sessionUser.email || null);
        setMode("auth");
      } else {
        const existing = window.localStorage.getItem("defrag_user_id") || SEEDED_USER_ID;
        setUserId(existing);
        setEmail(null);
        setMode("preview");
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return useMemo(
    () => ({
      userId,
      email,
      mode,
      loading,
      isPreview: mode === "preview",
      isAuthed: mode === "auth"
    }),
    [userId, email, mode, loading]
  );
}
