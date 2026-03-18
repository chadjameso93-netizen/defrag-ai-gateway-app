"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";

type DailyRead = {
  title: string;
  body_text: string;
  read_date: string;
  audio_url: string | null;
};

export default function DailyReadPage() {
  const { userId } = useAppIdentity();
  const [read, setRead] = useState<DailyRead | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const res = await fetch(`/api/v1/daily-read?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store",
        headers: { "x-user-id": userId }
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to load daily read.");
        return;
      }

      setRead(data.read || null);
    }

    load();
  }, [userId]);

  return (
    <AppShell
      title="Daily Read"
      subtitle="Your current read for today."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">{read?.title || "Today"}</div>
          <div className="result-copy">
            {error || read?.body_text || "Loading your daily read..."}
          </div>
          {read?.read_date ? (
            <div className="muted" style={{ marginTop: 12 }}>
              {new Date(read.read_date).toLocaleDateString()}
            </div>
          ) : null}
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Audio</div>
          <div className="result-copy">
            {read?.audio_url ? "Audio is available for this read." : "Audio will appear here when enabled."}
          </div>
          {read?.audio_url ? (
            <audio controls style={{ width: "100%", marginTop: 14 }}>
              <source src={read.audio_url} />
            </audio>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
