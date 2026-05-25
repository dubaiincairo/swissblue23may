"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LiveContentRefresh() {
  const router = useRouter();
  const versionRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkVersion() {
      try {
        const response = await fetch("/api/site-content/version", { cache: "no-store" });
        const data = (await response.json()) as { updatedAt?: string };

        if (cancelled || !data.updatedAt) {
          return;
        }

        if (versionRef.current && versionRef.current !== data.updatedAt) {
          router.refresh();
        }

        versionRef.current = data.updatedAt;
      } catch {
        // Live refresh is a convenience; the page still works normally without it.
      }
    }

    checkVersion();
    const interval = window.setInterval(checkVersion, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [router]);

  return null;
}
