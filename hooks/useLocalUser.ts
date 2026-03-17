"use client";

import { useEffect, useState } from "react";

const SEEDED_USER_ID = "11111111-1111-1111-1111-111111111111";

export function useLocalUser() {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const existing = window.localStorage.getItem("defrag_user_id");

    if (existing) {
      setUserId(existing);
      return;
    }

    window.localStorage.setItem("defrag_user_id", SEEDED_USER_ID);
    setUserId(SEEDED_USER_ID);
  }, []);

  return userId;
}
