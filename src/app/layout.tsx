import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/site/lenis-provider";
import { Cursor } from "@/components/site/cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "01LOT — Trade. Compete. Win.",
  description:
    "The arena for skill-based traders. 1v1 battles and tournaments with real prize pools. No prop firm gatekeepers, no broker spreads — just trade, compete, win.",
  metadataBase: new URL("https://01lot.example"),
  openGraph: {
    title: "01LOT — Trade. Compete. Win.",
    description:
      "1v1 trading battles and tournaments. Real prize pools. Pure skill.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
    >
      <body className="relative min-h-screen bg-bg text-text antialiased">
        <LenisProvider>
          <Cursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
