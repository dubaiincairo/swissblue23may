// Image-field detection, guidance copy, and client-side logo background removal.
import type { Language } from "./types";

export function isLongField(name: string, value: string) {
  return (
    value.length > 86 ||
    ["description", "locationHighlight", "positioning", "summary", "text"].includes(name)
  );
}

export function isImageField(name: string, path: Array<string | number>, value: string) {
  const imageKeys = new Set([
    "image",
    "logo",
    "arabicLogo",
    "mainHero",
    "jeddah",
    "jazan",
  ]);
  const isGalleryImage = path.some((segment) => segment === "gallery") && name === "image";
  const isHeroSlideSource = path.some((segment) => segment === "mainHeroSlides") && name === "source";
  const looksLikeImage =
    /^https?:\/\//.test(value) &&
    /\.(avif|jpe?g|png|svg|webp|mp4|mov|webm)(\?|$)/i.test(value);

  return imageKeys.has(name) || isGalleryImage || isHeroSlideSource || (name === "gallery" && looksLikeImage);
}

export function imageGuidance(name: string, path: Array<string | number>) {
  const location = path.join(".");

  if (name === "logo" || name === "arabicLogo") {
    return "Recommended: SVG or transparent PNG, around 380 x 160 px. The same logo is used everywhere; over the dark hero it is auto-inverted to white. Accepted: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("mainHeroSlides")) {
    return "Recommended: 1920 x 1080 px landscape. Accepted: JPG, PNG, WebP, AVIF, SVG, MP4, MOV, WebM.";
  }

  if (name === "mainHero" || location.includes("hero")) {
    return "Recommended: 1920 x 1080 px or wider landscape. Accepted: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("gallery")) {
    return "Recommended: 1600 x 1100 px landscape. Accepted: JPG, PNG, WebP, AVIF, SVG.";
  }

  return "Recommended: 1200 x 800 px landscape. Accepted: JPG, PNG, WebP, AVIF, SVG.";
}

export function localizedImageGuidance(name: string, path: Array<string | number>, language: Language) {
  if (language !== "ar") {
    return imageGuidance(name, path);
  }

  const location = path.join(".");

  if (name === "logo" || name === "arabicLogo") {
    return "المقاس المقترح: SVG أو PNG شفاف بحجم يقارب 380 x 160 بكسل. يتم استخدام نفس الشعار في كل مكان، ويتم قلب لونه تلقائيا إلى الأبيض فوق البانر الداكن. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("mainHeroSlides")) {
    return "المقاس المقترح: 1920 x 1080 بكسل بنسبة أفقية. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG, MP4, MOV, WebM.";
  }

  if (name === "mainHero" || location.includes("hero")) {
    return "المقاس المقترح: 1920 x 1080 بكسل أو صورة أفقية أكبر. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("gallery")) {
    return "المقاس المقترح: 1600 x 1100 بكسل بصورة أفقية. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
  }

  return "المقاس المقترح: 1200 x 800 بكسل بصورة أفقية. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
}

export function isLogoField(name: string) {
  return name === "logo" || name === "arabicLogo";
}

export function acceptsVideo(name: string, path: Array<string | number>) {
  return path.some((segment) => segment === "mainHeroSlides") && name === "source";
}

export function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read the logo image."));
    };
    image.src = url;
  });
}

export function colorDistance(
  red: number,
  green: number,
  blue: number,
  targetRed: number,
  targetGreen: number,
  targetBlue: number,
) {
  return Math.sqrt(
    (red - targetRed) ** 2 +
      (green - targetGreen) ** 2 +
      (blue - targetBlue) ** 2,
  );
}

export async function removeLogoBackground(file: File) {
  if (file.type === "image/svg+xml") {
    return file;
  }

  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  const samplePoints = [
    [0, 0],
    [canvas.width - 1, 0],
    [0, canvas.height - 1],
    [canvas.width - 1, canvas.height - 1],
  ];
  const background = samplePoints.reduce(
    (total, [x, y]) => {
      const index = (y * canvas.width + x) * 4;
      return {
        red: total.red + data[index],
        green: total.green + data[index + 1],
        blue: total.blue + data[index + 2],
      };
    },
    { red: 0, green: 0, blue: 0 },
  );
  const targetRed = background.red / samplePoints.length;
  const targetGreen = background.green / samplePoints.length;
  const targetBlue = background.blue / samplePoints.length;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const distance = colorDistance(red, green, blue, targetRed, targetGreen, targetBlue);
    const isNearWhite = red > 242 && green > 242 && blue > 242;

    if (distance < 44 || isNearWhite) {
      data[index + 3] = 0;
    } else if (distance < 72) {
      data[index + 3] = Math.min(data[index + 3], Math.round(((distance - 44) / 28) * 255));
    }
  }

  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

  if (!blob) {
    return file;
  }

  const cleanName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${cleanName}-transparent.png`, { type: "image/png" });
}

