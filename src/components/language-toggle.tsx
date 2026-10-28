"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Arabic lives at the root (also reachable as /ar/*), English under /en/*. Every public page exists in
// both trees except the /wa redirect pages, so the toggle swaps the prefix and keeps the visitor on the same page.
export function englishPath(pathname: string): string {
  if (pathname === "/en" || pathname.startsWith("/en/")) return pathname;
  const path = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  if (path === "/" || path.startsWith("/wa/")) return "/en";
  return `/en${path}`;
}

export function arabicPath(pathname: string): string {
  if (!(pathname === "/en" || pathname.startsWith("/en/"))) return pathname === "/" ? "/ar" : pathname;
  const path = pathname.slice(3) || "/";
  return path === "/" ? "/ar" : `/ar${path}`;
}

export default function LanguageToggle({ current }: { current: "ar" | "en" }) {
  const pathname = usePathname() || "/";
  return (
    <div className="language-toggle" aria-label="تبديل اللغة" dir="ltr">
      <Link
        className={current === "ar" ? "active" : ""}
        href={arabicPath(pathname)}
        hrefLang="ar"
        aria-current={current === "ar" ? "page" : undefined}
      >
        AR
      </Link>
      <Link
        className={current === "en" ? "active" : ""}
        href={englishPath(pathname)}
        hrefLang="en"
        aria-current={current === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
