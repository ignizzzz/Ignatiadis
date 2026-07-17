/**
 * Illustrated Soho storefront concept — placeholder for
 * /images/editorial/storefront.jpg photography.
 */
export default function StorefrontScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 440"
      className={className}
      role="img"
      aria-label="FETA POP storefront: blue facade, striped awning, warm counter and takeaway window"
    >
      {/* pavement */}
      <rect x="0" y="392" width="640" height="48" fill="#e8d9bd" />
      <rect x="0" y="392" width="640" height="6" fill="#d8c6a4" />

      {/* facade */}
      <rect x="40" y="36" width="560" height="356" rx="10" fill="#0d3b9c" />
      <rect x="40" y="36" width="560" height="356" rx="10" fill="none" stroke="#092d7a" strokeWidth="8" />

      {/* sign */}
      <rect x="88" y="62" width="464" height="64" rx="14" fill="#fff6e9" />
      <text
        x="320"
        y="108"
        textAnchor="middle"
        fontFamily="var(--font-baloo), 'Baloo 2', sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="2"
        fill="#0d3b9c"
      >
        FETA P
      </text>
      {/* flower O in the sign */}
      <g transform="translate(452 90)">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-12" rx="5" ry="8" transform={`rotate(${i * 45})`} fill="#f2b233" />
        ))}
        <circle r="6.5" fill="#ff6858" />
      </g>
      <text
        x="486"
        y="108"
        fontFamily="var(--font-baloo), 'Baloo 2', sans-serif"
        fontWeight="800"
        fontSize="44"
        fill="#0d3b9c"
      >
        P
      </text>

      {/* awning */}
      <g>
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M${76 + i * 49} 138 h49 l-8 34 q -16 14 -33 0 Z`}
            fill={i % 2 === 0 ? "#f2b233" : "#fff6e9"}
          />
        ))}
      </g>

      {/* window with warm interior */}
      <rect x="76" y="188" width="336" height="168" rx="12" fill="#3b2a12" />
      <rect x="84" y="196" width="320" height="152" rx="8" fill="#ffedc9" />
      {/* counter */}
      <rect x="84" y="300" width="320" height="48" fill="#b07b3e" />
      <rect x="84" y="296" width="320" height="10" fill="#8f5f2c" />
      {/* bites in the window */}
      {(
        [
          [130, 280],
          [186, 274],
          [242, 282],
          [298, 276],
          [354, 282],
        ] as const
      ).map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${i % 2 ? 6 : -5})`}>
          <rect x="-20" y="-15" width="40" height="30" rx="10" fill="#efb93f" />
          <path d="M-12 -3 Q 0 -8 12 -3" stroke="#c9881a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>
      ))}
      {/* hanging menu boards */}
      <rect x="120" y="210" width="112" height="44" rx="6" fill="#0d3b9c" />
      <g stroke="#fff6e9" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <path d="M132 224 h64" />
        <path d="M132 236 h88" />
      </g>
      <rect x="256" y="210" width="112" height="44" rx="6" fill="#0d3b9c" />
      <g stroke="#fff6e9" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <path d="M268 224 h80" />
        <path d="M268 236 h56" />
      </g>

      {/* door */}
      <rect x="444" y="188" width="120" height="204" rx="10" fill="#092d7a" />
      <rect x="456" y="200" width="96" height="120" rx="8" fill="#ffedc9" />
      <circle cx="548" cy="300" r="6" fill="#f2b233" />
      {/* open sign */}
      <rect x="472" y="220" width="64" height="26" rx="13" fill="#ff6858" />
      <text
        x="504"
        y="238"
        textAnchor="middle"
        fontFamily="var(--font-baloo), 'Baloo 2', sans-serif"
        fontWeight="700"
        fontSize="15"
        fill="#fff6e9"
      >
        OPEN
      </text>

      {/* stool + standing ledge */}
      <rect x="596" y="330" width="10" height="62" rx="4" fill="#8f5f2c" />
      <rect x="580" y="322" width="42" height="12" rx="6" fill="#b07b3e" />

      {/* string lights */}
      <path d="M40 158 Q 320 190 600 158" stroke="#f9d486" strokeWidth="3" fill="none" opacity="0.7" />
      {(
        [80, 160, 240, 320, 400, 480, 560] as const
      ).map((x, i) => (
        <circle key={i} cx={x} cy={172 + Math.sin(i) * 6} r="5" fill="#f2b233" />
      ))}
    </svg>
  );
}
