"use client";

import { useState } from "react";
import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";

type GalleryImage = { image: string; title: string; showHeadline?: boolean };

// Property photo album that opens with the first photos and a button to show the full album,
// so long albums do not push the rest of the page far down on phones.
export default function GalleryPreview({
  images,
  initial = 9,
}: {
  images: GalleryImage[];
  initial?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? images : images.slice(0, initial);

  return (
    <>
      <PhotoGalleryLightbox images={shown} locale="ar" variant="property" />
      {!showAll && images.length > initial ? (
        <div className="mt-6 flex justify-center">
          <button className="btn btn-secondary" type="button" onClick={() => setShowAll(true)}>
            عرض كل الصور ({images.length})
          </button>
        </div>
      ) : null}
    </>
  );
}
