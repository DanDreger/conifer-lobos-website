import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conifer Lobos Baseball Boosters",
  description:
    "Supporting Conifer High School baseball — Jeffco 5A, Conifer, Colorado.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
