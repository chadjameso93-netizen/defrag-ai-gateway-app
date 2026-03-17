export default function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 className="h2-premium" style={{ marginBottom: 12 }}>{title}</h2>
      {children}
    </div>
  );
}
