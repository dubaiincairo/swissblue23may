"use client";

import { useEffect } from "react";

const SCROLL_THRESHOLD = 40;

export default function NavScrollState() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    function apply() {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      if (scrolled) {
        root.setAttribute("data-nav-solid", "true");
      } else {
        root.removeAttribute("data-nav-solid");
      }
    }

    function onScroll() {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        apply();
      });
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return null;
}
