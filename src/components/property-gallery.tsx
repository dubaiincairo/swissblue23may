"use client";

import Image from "next/image";
import { useState } from "react";
import { rich } from "@/components/rich-text";

type GalleryImage = {
  readonly image: string;
  readonly title: string;
};

export function PropertyGallery({
  images,
  locale,
}: {
  images: ReadonlyArray<GalleryImage>;
  locale: "ar" | "en";
}) {
  const isArabic = locale === "ar";
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) {
    return null;
  }

  const main = images[0];
  const thumbs = images.slice(1, 6);
  const remaining = Math.max(images.length - 6, 0);

  return (
    <>
      <div className="property-gallery">
        <button
          type="button"
          className="property-gallery-main"
          onClick={() => setActiveIndex(0)}
          aria-label={isArabic ? `فتح ${main.title}` : `Open ${main.title}`}
        >
          <Image
            className="object-cover"
            src={main.image}
            alt={main.title}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            priority
          />
        </button>
        {thumbs.length ? (
          <div className="property-gallery-thumbs">
            {thumbs.map((thumb, index) => {
              const isLast = index === thumbs.length - 1 && remaining > 0;
              return (
                <button
                  key={`${thumb.image}-${index}`}
                  type="button"
                  className="property-gallery-thumb"
                  onClick={() => setActiveIndex(index + 1)}
                  aria-label={isArabic ? `فتح ${thumb.title}` : `Open ${thumb.title}`}
                >
                  <Image
                    className="object-cover"
                    src={thumb.image}
                    alt={thumb.title}
                    fill
                    sizes="(min-width: 1024px) 26vw, 50vw"
                  />
                  {isLast ? (
                    <span className="property-gallery-cta">
                      <span>+{remaining}</span>
                      {isArabic ? "صور إضافية" : "More photos"}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {activeIndex !== null ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={images[activeIndex].title}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <button
            className="gallery-lightbox-backdrop"
            type="button"
            aria-label={isArabic ? "إغلاق" : "Close"}
            onClick={() => setActiveIndex(null)}
          />
          <div className="gallery-lightbox-panel">
            <div className="gallery-lightbox-topbar">
              <div>
                <span>
                  {isArabic ? "الصورة" : "Photo"} {activeIndex + 1} / {images.length}
                </span>
                <h3>{rich(images[activeIndex].title)}</h3>
              </div>
              <button type="button" onClick={() => setActiveIndex(null)}>
                {isArabic ? "إغلاق" : "Close"}
              </button>
            </div>

            <div className="gallery-lightbox-stage">
              {images.length > 1 ? (
                <button
                  className="gallery-lightbox-control"
                  type="button"
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === null
                        ? current
                        : (current - 1 + images.length) % images.length,
                    )
                  }
                >
                  {isArabic ? "السابق" : "Previous"}
                </button>
              ) : null}
              <figure>
                <Image
                  className="object-cover"
                  src={images[activeIndex].image}
                  alt={images[activeIndex].title}
                  fill
                  sizes="min(1180px, 92vw)"
                  priority
                />
              </figure>
              {images.length > 1 ? (
                <button
                  className="gallery-lightbox-control"
                  type="button"
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === null ? current : (current + 1) % images.length,
                    )
                  }
                >
                  {isArabic ? "التالي" : "Next"}
                </button>
              ) : null}
            </div>

            <div
              className="gallery-lightbox-thumbs"
              aria-label={isArabic ? "صور الفندق" : "Property photos"}
            >
              {images.map((image, index) => (
                <button
                  key={`${image.image}-thumb-${index}`}
                  className={index === activeIndex ? "active" : ""}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={image.title}
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
