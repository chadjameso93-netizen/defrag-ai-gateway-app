import "./globals.css";
import { geist, interTight } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${interTight.variable || ""}`}>
        {children}
      </body>
    </html>
  );
}
