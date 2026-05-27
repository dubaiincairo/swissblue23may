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
  duration = 1800,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const initialDisplay = useMemo(() => {
    if (!parsed) {
      return value;
    }

    if (typeof window !== "undefined" && prefersReducedMotion()) {
      return value;
    }

    return `${parsed.prefix}0${parsed.suffix}`;
  }, [parsed, value]);

  const ref = useRef<HTMLSpanElement | null>(null);
  const animationStartedRef = useRef(false);
  const [display, setDisplay] = useState(initialDisplay);

  useEffect(() => {
    if (!parsed || !ref.current) {
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    const node = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || animationStartedRef.current) {
            continue;
          }

          animationStartedRef.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * parsed.target);
            setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, parsed]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
