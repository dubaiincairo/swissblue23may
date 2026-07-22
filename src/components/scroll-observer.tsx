"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.05,
      },
    );

    const elements = document.querySelectorAll<HTMLElement>('[class*="reveal-"]');

    // Mark the first viewport synchronously before enabling hidden reveal states.
    // If client JavaScript ever fails, CSS leaves all content visible by default.
    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight - 60) {
        element.classList.add("in-view");
      }
    });

    document.documentElement.classList.add("reveal-observer-ready");

    elements.forEach((element) => {
      if (!element.classList.contains("in-view")) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
