"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Segment =
  | { kind: "number"; target: number }
  | { kind: "static"; text: string };

function parseSegments(value: string): { segments: Segment[]; hasNumber: boolean } {
  const segments: Segment[] = [];
  let hasNumber = false;

  for (const match of value.matchAll(/(\d+)|(\D+)/g)) {
    if (match[1] !== undefined) {
      segments.push({ kind: "number", target: Number.parseInt(match[1], 10) });
      hasNumber = true;
    } else if (match[2] !== undefined) {
      segments.push({ kind: "static", text: match[2] });
    }
  }

  return { segments, hasNumber };
}

function renderProgress(segments: Segment[], progress: number) {
  const eased = 1 - Math.pow(1 - progress, 3);
  return segments
    .map((segment) =>
      segment.kind === "static"
        ? segment.text
        : String(Math.round(eased * segment.target)),
    )
    .join("");
}

function renderZero(segments: Segment[]) {
  return segments
    .map((segment) => (segment.kind === "static" ? segment.text : "0"))
    .join("");
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
  const parsed = useMemo(() => parseSegments(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const animationStartedRef = useRef(false);
  const [display, setDisplay] = useState(
    parsed.hasNumber ? renderZero(parsed.segments) : value,
  );

  useEffect(() => {
    if (!parsed.hasNumber) {
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const reduceMotion = prefersReducedMotion();
    const runDuration = reduceMotion ? 600 : duration;

    function runAnimation() {
      if (animationStartedRef.current) {
        return;
      }
      animationStartedRef.current = true;

      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / runDuration, 1);
        setDisplay(renderProgress(parsed.segments, progress));

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

    // Safety net: animate after a short timeout if the observer never fires.
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
