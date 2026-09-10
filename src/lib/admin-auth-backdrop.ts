export type AdminAuthBackdropLayout = "tiles" | "slices";

export type AdminAuthBackdropPhoto = {
  image: string;
  focus: string;
};

export type AdminAuthBackdrop = {
  layout: AdminAuthBackdropLayout;
  photos: AdminAuthBackdropPhoto[];
};

export const ADMIN_AUTH_BACKDROP_PHOTO_COUNT = 6;

const DEFAULT_PHOTOS: AdminAuthBackdropPhoto[] = [
  {
    image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
    focus: "bottom",
  },
  {
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1400&q=80",
    focus: "center",
  },
  {
    image: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1400&q=80",
    focus: "center",
  },
  {
    image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg",
    focus: "bottom",
  },
  {
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80",
    focus: "center",
  },
  {
    image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg",
    focus: "center",
  },
];

const BROKEN_LEGACY_IMAGES = new Set([
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Hegra%2C_Al-Ula%2C_Saudi_Arabia.png/1280px-Hegra%2C_Al-Ula%2C_Saudi_Arabia.png",
]);

function nonEmptyString(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed || BROKEN_LEGACY_IMAGES.has(trimmed)) return fallback;
  return trimmed;
}

export function createDefaultAdminAuthBackdrop(): AdminAuthBackdrop {
  return {
    layout: "tiles",
    photos: DEFAULT_PHOTOS.map((photo) => ({ ...photo })),
  };
}

export function normalizeAdminAuthBackdrop(value: unknown): AdminAuthBackdrop {
  const fallback = createDefaultAdminAuthBackdrop();
  const candidate = value && typeof value === "object" && !Array.isArray(value)
    ? value as { layout?: unknown; photos?: unknown }
    : null;
  const candidatePhotos = Array.isArray(candidate?.photos) ? candidate.photos : [];

  return {
    layout: candidate?.layout === "slices" ? "slices" : "tiles",
    photos: Array.from({ length: ADMIN_AUTH_BACKDROP_PHOTO_COUNT }, (_, index) => {
      const photo = candidatePhotos[index];
      const source = photo && typeof photo === "object" && !Array.isArray(photo)
        ? photo as { image?: unknown; focus?: unknown }
        : null;

      return {
        image: nonEmptyString(source?.image, fallback.photos[index].image),
        focus: nonEmptyString(source?.focus, fallback.photos[index].focus),
      };
    }),
  };
}
