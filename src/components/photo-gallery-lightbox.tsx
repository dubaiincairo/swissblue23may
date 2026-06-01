"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { rich } from "@/components/rich-text";

type GalleryImage = {
  image: string;
  title: string;
};

export default function PhotoGalleryLightbox({
  images,
  locale,
  variant = "homepage",
}: {
  images: GalleryImage[];
  locale: "ar" | "en";
  variant?: "homepage" | "property";
}) {
  const isArabic = locale === "ar";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const galleryClass = variant === "property" ? "gallery-grid" : "hotel-showcase-grid";
  const touchStartX = useRef<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const labels = useMemo(
    () => ({
      close: isArabic ? "إغلاق المعرض" : "Close gallery",
      next: isArabic ? "الصورة التالية" : "Next photo",
      previous: isArabic ? "الصورة السابقة" : "Previous photo",
      open: isArabic ? "فتح الصورة" : "Open photo",
      thumbs: isArabic ? "صور المعرض" : "Gallery photos",
    }),
    [isArabic],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOpen = activeIndex !== null;
  const activeImage = activeIndex === null ? null : images[activeIndex];

  const close = useCallback(() => {
    setActiveIndex(null);
    openerRef.current?.focus();
    openerRef.current = null;
  }, []);

  const next = useCallback(() => {
    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
  }, [images.length]);

  const previous = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  // Body scroll lock + keyboard navigation while open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft") previous();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("overlay-open");
    };
  }, [isOpen, close, next, previous]);

  function open(index: number, event: React.MouseEvent<HTMLButtonElement>) {
    openerRef.current = event.currentTarget;
    setActiveIndex(index);
  }

  function onTouchStart(event: React.TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null || images.length < 2) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(delta) > 45) {
      if (delta < 0) next();
      else previous();
    }
    touchStartX.current = null;
  }

  return (
    <>
      <div className={galleryClass}>
        {images.map((image, index) => (
          <figure
            className={`${variant === "homepage" && index === 0 ? "feature" : ""} reveal-scale-up`}
            style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            key={`${image.image}-${index}`}
          >
            <button
              className="gallery-open-button"
              type="button"
              aria-label={`${labels.open}: ${image.title}`}
              onClick={(event) => open(index, event)}
            >
              <Image
                className="object-cover"
                src={image.image}
                alt={image.title}
                fill
                sizes={
                  variant === "homepage" && index === 0
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : "(min-width: 1024px) 33vw, 100vw"
                }
              />
              <span className="gallery-caption">{rich(image.title)}</span>
            </button>
          </figure>
        ))}
      </div>

      {mounted && isOpen && activeImage
        ? createPortal(
            <div
              className="lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={activeImage.title}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <button
                type="button"
                className="lightbox-backdrop"
                aria-label={labels.close}
                tabIndex={-1}
                onClick={close}
              />

              <div className="lightbox-bar">
                <span className="lightbox-counter" dir="ltr">
                  {(activeIndex ?? 0) + 1} / {images.length}
                </span>
                <button
                  type="button"
                  className="lightbox-close"
                  aria-label={labels.close}
                  onClick={close}
                  autoFocus
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="lightbox-stage"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {images.length > 1 ? (
                  <button
                    type="button"
                    className="lightbox-arrow lightbox-prev"
                    aria-label={labels.previous}
                    onClick={previous}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path
                        d="M15 5l-7 7 7 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : null}

                <figure className="lightbox-figure" key={activeIndex}>
                  <Image
                    className="lightbox-image"
                    src={activeImage.image}
                    alt={activeImage.title}
                    fill
                    sizes="min(1200px, 94vw)"
                    priority
                  />
                </figure>

                {images.length > 1 ? (
                  <button
                    type="button"
                    className="lightbox-arrow lightbox-next"
                    aria-label={labels.next}
                    onClick={next}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path
                        d="M9 5l7 7-7 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>

              {activeImage.title ? (
                <p className="lightbox-caption">{rich(activeImage.title)}</p>
              ) : null}

              {images.length > 1 ? (
                <div className="lightbox-thumbs" aria-label={labels.thumbs}>
                  {images.map((image, index) => (
                    <button
                      className={`lightbox-thumb${index === activeIndex ? " active" : ""}`}
                      type="button"
                      key={`${image.image}-thumb-${index}`}
                      aria-label={`${labels.open}: ${image.title}`}
                      aria-current={index === activeIndex}
                      onClick={() => setActiveIndex(index)}
                    >
                      <Image src={image.image} alt="" fill sizes="96px" className="object-cover" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
