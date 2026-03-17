export default function Loading() {
  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="kicker">Defrag</div>
          <h1 className="section-title">Loading…</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            Preparing your console.
          </p>
        </div>
      </div>
    </main>
  );
}
