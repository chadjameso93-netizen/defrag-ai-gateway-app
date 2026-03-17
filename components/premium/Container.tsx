export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      maxWidth: 1200,
      margin: "0 auto",
      padding: "32px 24px"
    }}>
      {children}
    </div>
  );
}
