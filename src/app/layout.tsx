import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Madrasa Result Portal",
  description: "Search results by class and hajira number",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
