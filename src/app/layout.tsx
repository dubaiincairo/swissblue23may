import type { Metadata } from "next";
import { Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import LiveContentRefresh from "@/components/live-content-refresh";
import ScrollObserver from "@/components/scroll-observer";
import "./globals.css";

export const dynamic = "force-dynamic";

const arabicSans = Noto_Kufi_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swiss Blue Hotels | Rooms, Suites, and Serviced Apartments",
  description:
    "Swiss Blue Hotels website for hotels, suites, serviced apartments, direct booking, destinations, and guest services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${arabicSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LiveContentRefresh />
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
