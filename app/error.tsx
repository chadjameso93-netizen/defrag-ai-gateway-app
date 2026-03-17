"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="kicker">Defrag</div>
          <h1 className="section-title">Something went wrong</h1>
          <p className="muted" style={{ marginTop: 12 }}>
            The page hit an unexpected error.
          </p>
          <div className="message-box" style={{ marginTop: 18 }}>
            <div className="result-title">Error</div>
            <div className="result-copy">{error?.message || "Unknown error"}</div>
          </div>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => reset()}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
