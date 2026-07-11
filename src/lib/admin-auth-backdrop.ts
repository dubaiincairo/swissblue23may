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
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/King_Fahd%E2%80%99s_Fountain.jpg/1280px-King_Fahd%E2%80%99s_Fountain.jpg",
    focus: "bottom",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Riyadh_Skyline.jpg/1280px-Riyadh_Skyline.jpg",
    focus: "center",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Hegra%2C_Al-Ula%2C_Saudi_Arabia.png/1280px-Hegra%2C_Al-Ula%2C_Saudi_Arabia.png",
    focus: "right",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sarawat_Mountains%2C_Asir_Region%2C_Saudi_Arabia_%282%29.jpg/1280px-Sarawat_Mountains%2C_Asir_Region%2C_Saudi_Arabia_%282%29.jpg",
    focus: "bottom",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Uruq_Bani_Ma%27arid_Reserve%2C_Saudi_Arabia_%282025%29.jpg/1280px-Uruq_Bani_Ma%27arid_Reserve%2C_Saudi_Arabia_%282025%29.jpg",
    focus: "center",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Old_Jeddah_%28Al_Balad%29%2C_Saudi_Arabia_in_November_2022.jpg/1280px-Old_Jeddah_%28Al_Balad%29%2C_Saudi_Arabia_in_November_2022.jpg",
    focus: "center",
  },
];

function nonEmptyString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
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
