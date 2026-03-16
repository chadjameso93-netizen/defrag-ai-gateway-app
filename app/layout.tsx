import "./styles.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defrag",
  description: "Clear, calm help for hard relationship moments."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
