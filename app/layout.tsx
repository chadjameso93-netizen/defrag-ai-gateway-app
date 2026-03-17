import "./globals.css";
import { geist } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}
