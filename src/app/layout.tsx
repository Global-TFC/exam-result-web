import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Madrasa Result Portal",
  description: "Search results by class and student No",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
