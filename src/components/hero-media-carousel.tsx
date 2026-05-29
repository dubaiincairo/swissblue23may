"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type HeroSlide = {
  kind: string;
  source: string;
  alt: string;
};

export default function HeroMediaCarousel({
  slides,
  fallbackImage,
  fallbackAlt,
}: {
  slides?: HeroSlide[];
  fallbackImage: string;
  fallbackAlt: string;
}) {
  const mediaSlides = useMemo(() => {
    const cleanSlides = (slides ?? []).filter((slide) => slide.source);

    return cleanSlides.length
      ? cleanSlides
      : [{ kind: "image", source: fallbackImage, alt: fallbackAlt }];
  }, [fallbackAlt, fallbackImage, slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleSlides = mediaSlides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % mediaSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, mediaSlides.length]);

  return (
    <div className="hero-media-carousel" aria-label="Hero media carousel">
      {mediaSlides.map((slide, index) => {
        const isActive = index === activeIndex;
        const isVideo = slide.kind === "video" || /\.(mp4|mov|webm)(\?|$)/i.test(slide.source);

        return (
          <div
            className={isActive ? "hero-media-slide active" : "hero-media-slide"}
            key={`${slide.source}-${index}`}
            aria-hidden={!isActive}
          >
            {isVideo ? (
              <video
                className="h-full w-full object-cover kenburns-active"
                src={slide.source}
                autoPlay={isActive}
                loop
                muted
                playsInline
                preload={isActive ? "auto" : "metadata"}
              />
            ) : (
              <Image
                className="object-cover kenburns-active"
                src={slide.source}
                alt={slide.alt || fallbackAlt}
                fill
                priority={index === 0}
                sizes="100vw"
              />
            )}
          </div>
        );
      })}

      {hasMultipleSlides ? (
        <div className="hero-carousel-dots" aria-label="Hero media slides">
          {mediaSlides.map((slide, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              key={`${slide.source}-dot-${index}`}
              type="button"
              aria-label={`Show hero media ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
