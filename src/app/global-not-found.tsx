import type { Metadata } from "next";
import NotFoundView from "@/components/not-found-view";
import { FONT_CLASS_NAMES } from "@/components/site-root";
import "./globals.css";

// Served for URLs that match no route at all. It is prerendered once at build
// time and bypasses the root layouts, so it stays static: Arabic-first like the
// site root, with no CMS fetch.
export const metadata: Metadata = {
  metadataBase: new URL("https://swissblue.sa"),
  title: "404 | سويس بلو للفنادق",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={FONT_CLASS_NAMES}>
      <body className="min-h-full flex flex-col">
        <NotFoundView locale="ar" />
      </body>
    </html>
  );
}
