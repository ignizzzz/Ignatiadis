import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** App icon: the POP flower on Aegean blue. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d3b9c",
          borderRadius: 14,
        }}
      >
        <svg viewBox="0 0 100 100" width="48" height="48">
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
      </div>
    ),
    size
  );
}
