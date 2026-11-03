import type { Metadata } from "next";
import NotFoundView from "@/components/not-found-view";
import { HTML_CLASS_NAMES } from "@/lib/fonts";
import "./globals.css";

// Served for URLs that match no route at all (in either language tree). It is
// prerendered once at build time and bypasses the root layouts, so it stays
// static and bilingual, with no CMS fetch.
export const metadata: Metadata = {
  metadataBase: new URL("https://swissblue.sa"),
  title: "404 | Swiss Blue Hotels | سويس بلو للفنادق",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={HTML_CLASS_NAMES}>
      <body className="min-h-full flex flex-col">
        <NotFoundView locale="ar" />
        <div lang="en" dir="ltr">
          <NotFoundView locale="en" />
        </div>
      </body>
    </html>
  );
}
