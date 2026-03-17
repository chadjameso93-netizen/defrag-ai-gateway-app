"use client";

import { useEffect, useState } from "react";

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `user_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function useLocalUser() {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const existing = window.localStorage.getItem("defrag_user_id");
    if (existing) {
      setUserId(existing);
      return;
    }

    const next = randomId();
    window.localStorage.setItem("defrag_user_id", next);
    setUserId(next);
  }, []);

  return userId;
}
