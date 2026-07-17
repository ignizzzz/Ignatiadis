import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

/** Default share image: wordmark + tagline on Aegean blue. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d3b9c",
          color: "#fff6e9",
          fontWeight: 800,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ fontSize: 130, letterSpacing: -4, display: "flex" }}>FETA P</div>
          <svg viewBox="0 0 100 100" width="110" height="110">
            <g fill="#f2b233">
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="20"
                  rx="13"
                  ry="20"
                  transform={`rotate(${i * 45} 50 50)`}
                />
              ))}
            </g>
            <circle cx="50" cy="50" r="17" fill="#ff6858" />
          </svg>
          <div style={{ fontSize: 130, letterSpacing: -4, display: "flex" }}>P</div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 44,
            fontWeight: 600,
            color: "#f2b233",
            display: "flex",
          }}
        >
          Crunch outside. Ooze inside.
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 26,
            fontWeight: 400,
            color: "rgba(255, 246, 233, 0.75)",
            display: "flex",
          }}
        >
          Crispy phyllo · Creamy Greek feta · Real honey · London
        </div>
      </div>
    ),
    size
  );
}
