"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type PhotoStripImage = {
  readonly src: string;
  readonly alt: string;
};

export function PhotoStrip({
  images,
  locale,
  ariaLabel,
}: {
  images: readonly PhotoStripImage[];
  locale: "ar" | "en";
  ariaLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const isRtl = locale === "ar";

  const updateButtons = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const maxScroll = node.scrollWidth - node.clientWidth;
    if (maxScroll <= 4) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    const distance = Math.abs(node.scrollLeft);
    setCanPrev(distance > 4);
    setCanNext(distance < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateButtons();
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    node.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

    return () => {
      node.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  function step(direction: "prev" | "next") {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    const amount = node.clientWidth * 0.78;
    const signed = direction === "next" ? amount : -amount;
    const adjusted = isRtl ? -signed : signed;
    node.scrollBy({ left: adjusted, behavior: "smooth" });
  }

  return (
    <div className="photo-strip" aria-label={ariaLabel}>
      <div className="photo-strip-scroller" ref={scrollerRef}>
        {images.map((image, index) => (
          <figure className="photo-strip-card" key={`${image.src}-${index}`}>
            <Image
              className="object-cover"
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 80vw"
            />
          </figure>
        ))}
      </div>
      <div className="photo-strip-controls">
        <button
          type="button"
          className="photo-strip-control"
          onClick={() => step("prev")}
          disabled={!canPrev}
          aria-label={isRtl ? "الصور السابقة" : "Previous photos"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {isRtl ? <polyline points="9 6 15 12 9 18" /> : <polyline points="15 6 9 12 15 18" />}
          </svg>
        </button>
        <button
          type="button"
          className="photo-strip-control"
          onClick={() => step("next")}
          disabled={!canNext}
          aria-label={isRtl ? "الصور التالية" : "Next photos"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {isRtl ? <polyline points="15 6 9 12 15 18" /> : <polyline points="9 6 15 12 9 18" />}
          </svg>
        </button>
      </div>
    </div>
  );
}
