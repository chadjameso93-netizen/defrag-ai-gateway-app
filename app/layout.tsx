import "./globals.css";
import { geist, interTight } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.className} ${interTight.className}`}>
      <body>{children}</body>
    </html>
  );
}
