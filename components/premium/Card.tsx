export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="surface" style={{
      marginBottom: 20,
      transition: "all .25s ease"
    }}>
      {children}
    </div>
  );
}
