import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhiloArt - Artwork Gallery & Creator Community",
  description:
    "A platform for artists, photographers, and designers to showcase, manage, and publish their work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
