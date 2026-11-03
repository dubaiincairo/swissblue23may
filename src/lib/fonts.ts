import { Geist_Mono, Inter, Noto_Kufi_Arabic } from "next/font/google";

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

/** Class list for `<html>`: the three font CSS variables plus the base utilities. */
export const HTML_CLASS_NAMES = `${arabicSans.variable} ${latinSans.variable} ${geistMono.variable} h-full antialiased`;
