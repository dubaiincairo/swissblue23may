import { ImageResponse } from "next/og";
import { getEditableContent } from "@/lib/editable-content";

export const runtime = "nodejs";

export const alt = "Swiss Blue Hotels and Serviced Apartments";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type HeroSlide = {
  kind: string;
  source: string;
  focus?: string;
};

function heroPhoto(slides: HeroSlide[], fallback: string) {
  return (
    slides.find((slide) => slide.source && (slide.kind === "image" || !/\.(mp4|mov|webm)(\?|$)/i.test(slide.source)))
      ?.source ?? fallback
  );
}

export default async function OpenGraphImage() {
  const { en } = await getEditableContent();
  const hero = en.homepage.hero;
  const image = heroPhoto(en.media.mainHeroSlides, en.media.mainHero);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#082c64",
          color: "white",
          display: "flex",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <img
          alt="Swiss Blue hospitality destination"
          height="630"
          src={image}
          style={{ height: "100%", objectFit: "cover", width: "100%" }}
          width="1200"
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(8, 28, 70, 0.88) 0%, rgba(18, 70, 168, 0.6) 48%, rgba(8, 28, 70, 0.12) 100%)",
            display: "flex",
            height: "100%",
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            height: "100%",
            justifyContent: "space-between",
            left: 76,
            paddingBottom: 58,
            paddingTop: 62,
            position: "absolute",
            top: 0,
            width: 685,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ alignItems: "center", display: "flex", gap: 14 }}>
              <div
                style={{
                  alignItems: "center",
                  background: "#ffffff",
                  borderRadius: 12,
                  color: "#17498f",
                  display: "flex",
                  fontSize: 29,
                  fontWeight: 800,
                  height: 58,
                  justifyContent: "center",
                  width: 58,
                }}
              >
                SB
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 0 }}>SWISS BLUE</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ color: "#d6e7ff", fontSize: 17, fontWeight: 700, letterSpacing: 0 }}>
                {hero.eyebrow}
              </span>
              <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: 0, lineHeight: 1.08 }}>
                {hero.title}
              </span>
              <span style={{ color: "#e4efff", fontSize: 21, lineHeight: 1.35, maxWidth: 620 }}>
                {hero.text}
              </span>
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.96)",
              borderRadius: 12,
              color: "#132545",
              display: "flex",
              gap: 18,
              padding: "16px 18px",
              width: 580,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 286 }}>
              <span style={{ color: "#7a8699", fontSize: 13, fontWeight: 700 }}>DIRECT BOOKING</span>
              <span style={{ fontSize: 19, fontWeight: 750 }}>{hero.primaryCta}</span>
            </div>
            <div
              style={{
                alignItems: "center",
                background: "#2b6fe8",
                borderRadius: 8,
                color: "#ffffff",
                display: "flex",
                fontSize: 16,
                fontWeight: 800,
                height: 44,
                justifyContent: "center",
                width: 220,
              }}
            >
              {hero.secondaryCta}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
