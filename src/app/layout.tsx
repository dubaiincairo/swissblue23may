import type { Metadata } from "next";
import { Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import { ChatbaseWidget } from "@/components/chatbase-widget";
import "./globals.css";

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
  title: "فنادق سويس بلو | غرف وأجنحة وشقق فندقية",
  description:
    "تصميم صفحة رئيسية عربية لفنادق سويس بلو تعرض الفنادق والشقق الفندقية وفئات الغرف والخدمات وتجربة الحجز.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabicSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatbaseWidget />
      </body>
    </html>
  );
}
