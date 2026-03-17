"use client";

export default function OperationalColumn({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card" style={{ minHeight: 100 }}>
      <div className="result-title">{title}</div>
      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {children}
      </div>
    </div>
  );
}
