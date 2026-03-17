import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="kicker">Defrag</div>
          <h1 className="section-title">Page not found</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            That page does not exist in the current build.
          </p>
          <div className="actions">
            <Link href="/app" className="btn btn-primary">Open Console</Link>
            <Link href="/" className="btn btn-secondary">Home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
