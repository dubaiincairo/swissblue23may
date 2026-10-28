"use client";

import { useState } from "react";
import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";

type GalleryImage = { image: string; title: string; showHeadline?: boolean };

// Property photo album that opens with the first photos and a button to show the full album,
// so long albums do not push the rest of the page far down on phones.
export default function GalleryPreview({
  images,
  locale = "ar",
  initial = 9,
}: {
  images: GalleryImage[];
  locale?: "ar" | "en";
  initial?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? images : images.slice(0, initial);

  return (
    <>
      <PhotoGalleryLightbox images={shown} locale={locale} variant="property" />
      {!showAll && images.length > initial ? (
        <div className="mt-6 flex justify-center">
          <button className="btn btn-secondary" type="button" onClick={() => setShowAll(true)}>
            {locale === "ar" ? "عرض كل الصور" : "Show all photos"} ({images.length})
          </button>
        </div>
      ) : null}
    </>
  );
}
