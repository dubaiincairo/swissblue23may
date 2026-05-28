"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ParsedValue = {
  readonly prefix: string;
  readonly target: number;
  readonly suffix: string;
};

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);

  if (!match) {
    return null;
  }

  return {
    prefix: match[1] ?? "",
    target: Number.parseInt(match[2] ?? "0", 10),
    suffix: match[3] ?? "",
  };
}

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedCounter({
  value,
  duration = 2400,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const animationStartedRef = useRef(false);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const runDuration = reduceMotion ? 600 : duration;

    function runAnimation() {
      if (animationStartedRef.current || !parsed) {
        return;
      }
      animationStartedRef.current = true;

      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / runDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * parsed.target);
        setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          // Small delay so the user has a moment to register the "0" state
          // before the count-up begins.
          window.setTimeout(runAnimation, 250);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(node);

    // Safety net: if for some reason the observer never fires (e.g. the
    // element is rendered but the page is hidden), still animate after a
    // short timeout so the counter never gets stuck on "0".
    const fallback = window.setTimeout(runAnimation, 3500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [duration, parsed, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
