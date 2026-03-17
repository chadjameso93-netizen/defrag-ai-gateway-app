"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SystemMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function signOut() {
    window.location.href = "/";
  }

  return (
    <div className="system-menu" ref={ref}>
      <button
        type="button"
        className="system-menu-button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open account menu"
      >
        Account
      </button>

      {open ? (
        <div className="system-dropdown">
          <Link href="/onboarding" onClick={() => setOpen(false)}>Profile</Link>
          <Link href="/relationships" onClick={() => setOpen(false)}>Relationships</Link>
          <Link href="/timeline" onClick={() => setOpen(false)}>Timeline</Link>
          <Link href="/settings" onClick={() => setOpen(false)}>Settings</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Plan</Link>
          <button type="button" onClick={signOut}>Log out</button>
        </div>
      ) : null}
    </div>
  );
}
