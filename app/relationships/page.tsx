export default function RelationshipsPage() {
  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="kicker">Relationships</div>
          <h1 className="section-title">Your relationship system</h1>
          <p className="muted">
            This will become the live operational view for people, roles, invites, and relational state.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1.1fr .9fr", gap: 24, marginTop: 24 }}>
            <div className="card">
              <div className="result-title">Primary panel</div>
              <div className="result-copy">Relationship list and active system view will render here.</div>
            </div>
            <div className="card">
              <div className="result-title">Secondary panel</div>
              <div className="result-copy">Invites, participant status, and quick actions will render here.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
