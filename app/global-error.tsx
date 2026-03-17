"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ margin: 0, background: "#0a0b10", color: "white", fontFamily: "Inter, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
          <div style={{ maxWidth: 760, width: "100%", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 24, background: "rgba(255,255,255,.03)" }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".14em", opacity: .55 }}>Defrag</div>
            <h1 style={{ fontSize: 32, margin: "10px 0 8px" }}>A fatal error occurred</h1>
            <p style={{ opacity: .75, margin: 0 }}>The app crashed before route recovery could complete.</p>
            <div style={{ marginTop: 18, padding: 14, borderRadius: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Error</div>
              <div style={{ opacity: .8 }}>{error?.message || "Unknown error"}</div>
            </div>
            <div style={{ marginTop: 18 }}>
              <button
                onClick={() => reset()}
                style={{
                  border: "1px solid rgba(255,255,255,.14)",
                  background: "white",
                  color: "#0a0b10",
                  borderRadius: 999,
                  padding: "10px 16px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
