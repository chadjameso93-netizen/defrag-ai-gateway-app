import AppShell from "@/components/layout/AppShell";
import Link from "next/link";

export default function LaunchPage() {
  return (
    <AppShell
      title="Launch readiness"
      subtitle="Core surfaces and public-use readiness."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Core surfaces</div>
          <div className="result-copy">Landing, onboarding, workspace, people, timeline, daily read, settings, privacy, billing, and health are live.</div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Public test flow</div>
          <div className="result-copy">Open the app, complete onboarding, add someone, create a note, and use the chat.</div>
          <div className="actions" style={{ marginTop: 14 }}>
            <Link href="/app" className="btn btn-primary">Open workspace</Link>
            <Link href="/health" className="btn btn-secondary">Health</Link>
          </div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Domain</div>
          <div className="result-copy">defrag.app still needs to be detached from older Vercel projects before cutover.</div>
        </section>
      </div>
    </AppShell>
  );
}
