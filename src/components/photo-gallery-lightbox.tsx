"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const galleryClass = variant === "property" ? "gallery-grid" : "hotel-showcase-grid";

  const labels = useMemo(
    () => ({
      close: isArabic ? "إغلاق المعرض" : "Close gallery",
      next: isArabic ? "الصورة التالية" : "Next photo",
      previous: isArabic ? "الصورة السابقة" : "Previous photo",
      open: isArabic ? "فتح الصورة" : "Open photo",
      count: isArabic ? "الصورة" : "Photo",
    }),
    [isArabic],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length]);

  function showPrevious() {
    setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
  }

  function showNext() {
    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
  }

  return (
    <>
      <div className={galleryClass}>
        {images.map((image, index) => (
          <figure className={variant === "homepage" && index === 0 ? "feature" : ""} key={`${image.image}-${index}`}>
            <button
              className="gallery-open-button"
              type="button"
              aria-label={`${labels.open}: ${image.title}`}
              onClick={() => setActiveIndex(index)}
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
              <span className="gallery-caption">{image.title}</span>
            </button>
          </figure>
        ))}
      </div>

      {activeImage ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} dir={isArabic ? "rtl" : "ltr"}>
          <button className="gallery-lightbox-backdrop" type="button" aria-label={labels.close} onClick={() => setActiveIndex(null)} />
          <div className="gallery-lightbox-panel">
            <div className="gallery-lightbox-topbar">
              <div>
                <span>
                  {labels.count} {(activeIndex ?? 0) + 1} / {images.length}
                </span>
                <h3>{activeImage.title}</h3>
              </div>
              <button type="button" onClick={() => setActiveIndex(null)}>
                {labels.close}
              </button>
            </div>

            <div className="gallery-lightbox-stage">
              {images.length > 1 ? (
                <button className="gallery-lightbox-control" type="button" onClick={showPrevious}>
                  {labels.previous}
                </button>
              ) : null}
              <figure>
                <Image
                  className="object-contain"
                  src={activeImage.image}
                  alt={activeImage.title}
                  fill
                  sizes="min(1180px, 92vw)"
                  priority
                />
              </figure>
              {images.length > 1 ? (
                <button className="gallery-lightbox-control" type="button" onClick={showNext}>
                  {labels.next}
                </button>
              ) : null}
            </div>

            <div className="gallery-lightbox-thumbs" aria-label={isArabic ? "صور المعرض" : "Gallery photos"}>
              {images.map((image, index) => (
                <button
                  className={index === activeIndex ? "active" : ""}
                  type="button"
                  key={`${image.image}-thumb-${index}`}
                  aria-label={`${labels.open}: ${image.title}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image src={image.image} alt="" fill sizes="110px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
