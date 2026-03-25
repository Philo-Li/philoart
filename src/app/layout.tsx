import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { Navbar, Footer } from "@/components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import "./legacy.css";
import "./mdb.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PhiloArt - Artwork Gallery & Creator Community",
    template: "%s | PhiloArt",
  },
  description:
    "A platform for artists, photographers, and designers to showcase, manage, and publish their work.",
  keywords: ["art", "photography", "gallery", "artwork", "digital art", "paintings"],
  authors: [{ name: "PhiloArt" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PhiloArt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
        <ApolloWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
