import React from "react";

const CheckMark = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Sparkle = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
  </svg>
);

const Compass = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <polygon points="15 9 11 13 9 15 13 11" />
  </svg>
);

export type FeatureChipVariant = "check" | "sparkle" | "compass";

const variantIcons: Record<FeatureChipVariant, React.ReactNode> = {
  check: CheckMark,
  sparkle: Sparkle,
  compass: Compass,
};

export function FeatureChipGrid({
  items,
  variant = "check",
  columns = 2,
  className = "",
}: {
  items: readonly string[];
  variant?: FeatureChipVariant;
  columns?: 2 | 3;
  className?: string;
}) {
  const icon = variantIcons[variant];
  return (
    <div
      className={`feature-chip-grid feature-chip-grid--cols-${columns} ${className}`.trim()}
    >
      {items.map((item, index) => (
        <article
          className="feature-chip reveal-slide-up"
          key={item}
          style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
        >
          <span className="feature-chip-mark" aria-hidden="true">
            {icon}
          </span>
          <span className="feature-chip-label">{item}</span>
        </article>
      ))}
    </div>
  );
}
