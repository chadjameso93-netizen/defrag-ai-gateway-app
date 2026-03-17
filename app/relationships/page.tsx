export default function RelationshipsPage() {
  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 980, margin: "0 auto" }}>
          <div className="kicker">Relationships</div>
          <h1 className="section-title">Relationship system</h1>
          <p className="muted">
            This surface will become the place where users manage people, roles, invites,
            and live relational state.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
            <div className="card">
              <div className="result-title">Coming next</div>
              <div className="result-copy">Participant management</div>
            </div>
            <div className="card">
              <div className="result-title">Coming next</div>
              <div className="result-copy">Invite acceptance and privacy modes</div>
            </div>
            <div className="card">
              <div className="result-title">Coming next</div>
              <div className="result-copy">Live Bowen system map</div>
            </div>
            <div className="card">
              <div className="result-title">Coming next</div>
              <div className="result-copy">Timeline-linked relational state</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
