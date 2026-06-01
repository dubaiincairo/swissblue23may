import type { Metadata } from "next";
import { Geist_Mono, Inter, Noto_Kufi_Arabic } from "next/font/google";
import { headers } from "next/headers";
import ChatbaseWidget from "@/components/chatbase-widget";
import CookieBanner from "@/components/cookie-banner";
import LiveContentRefresh from "@/components/live-content-refresh";
import NavScrollState from "@/components/nav-scroll-state";
import ScrollObserver from "@/components/scroll-observer";
import { getEditableContent } from "@/lib/editable-content";
import "./globals.css";

const arabicSans = Noto_Kufi_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

// Latin-optimized font used on the English (/en) tree; Arabic keeps Noto Kufi Arabic.
const latinSans = Inter({
  variable: "--font-latin-sans",
  subsets: ["latin"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ar, en } = await getEditableContent();
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") === "ar" ? "ar" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${arabicSans.variable} ${latinSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LiveContentRefresh />
        <NavScrollState />
        <ScrollObserver />
        {children}
        <ChatbaseWidget />
        <CookieBanner copy={{ ar: ar.ui.cookie, en: en.ui.cookie }} />
      </body>
    </html>
  );
}
