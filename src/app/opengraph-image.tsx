import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Swiss Blue Hotels and Serviced Apartments";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const socialPhoto =
  "https://images.unsplash.com/photo-1707449908429-e0189297d671?auto=format&fit=crop&w=1600&q=88";

export default function OpenGraphImage() {
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
          alt="Jeddah waterfront in Saudi Arabia"
          height="630"
          src={socialPhoto}
          style={{ height: "100%", objectFit: "cover", width: "100%" }}
          width="1200"
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(5, 24, 59, 0.94) 0%, rgba(9, 41, 91, 0.72) 43%, rgba(5, 24, 59, 0.16) 100%)",
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
            gap: 22,
            height: "100%",
            justifyContent: "center",
            left: 84,
            position: "absolute",
            top: 0,
            width: 610,
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: 18 }}>
            <div
              style={{
                alignItems: "center",
                background: "#ffffff",
                borderRadius: 16,
                color: "#17498f",
                display: "flex",
                fontSize: 35,
                fontWeight: 800,
                height: 72,
                justifyContent: "center",
                width: 72,
              }}
            >
              SB
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 24, fontWeight: 800 }}>SWISS BLUE</span>
              <span style={{ color: "#cce1ff", fontSize: 18 }}>Hotels &amp; Serviced Apartments</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: 0, lineHeight: 1.05 }}>
              Your stay in Saudi Arabia, made easy.
            </span>
            <span style={{ color: "#d9e8ff", fontSize: 24, lineHeight: 1.35 }}>
              Hotels, suites, and serviced apartments for every journey.
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
