"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Small timeout to allow Next.js route transitions to fully paint the new DOM
    const timer = setTimeout(() => {
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            // Stop observing once in view to keep page performance clean
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: "0px 0px -60px 0px", // Trigger when element is 60px above the bottom of viewport
        threshold: 0.05,
      });

      const elements = document.querySelectorAll('[class*="reveal-"]');
      elements.forEach((el) => {
        if (!el.classList.contains("in-view")) {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
