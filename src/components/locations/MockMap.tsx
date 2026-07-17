/**
 * Stylized map placeholder for the Soho flagship. Swap for a real maps
 * embed (Google Maps / Mapbox) at launch — the pin marks Meliora Yard.
 */
export default function MockMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-[2rem] shadow-pop">
        <svg viewBox="0 0 600 400" className="block w-full" role="img" aria-label="Stylized map showing the FETA POP Soho flagship location">
          <rect width="600" height="400" fill="#eef2e2" />
          {/* blocks */}
          <g fill="#dde3c9">
            <rect x="20" y="24" width="150" height="100" rx="8" />
            <rect x="200" y="24" width="180" height="70" rx="8" />
            <rect x="410" y="24" width="170" height="120" rx="8" />
            <rect x="20" y="160" width="110" height="130" rx="8" />
            <rect x="160" y="126" width="130" height="110" rx="8" />
            <rect x="320" y="176" width="120" height="90" rx="8" />
            <rect x="470" y="176" width="110" height="130" rx="8" />
            <rect x="20" y="320" width="180" height="60" rx="8" />
            <rect x="230" y="300" width="160" height="80" rx="8" />
            <rect x="420" y="336" width="160" height="44" rx="8" />
          </g>
          {/* streets */}
          <g stroke="#fff6e9" strokeWidth="14" strokeLinecap="round">
            <path d="M0 142 H 600" />
            <path d="M0 300 H 600" />
            <path d="M186 0 V 400" />
            <path d="M400 0 V 400" />
            <path d="M186 142 Q 300 220 400 300" strokeWidth="10" />
          </g>
          {/* park */}
          <circle cx="520" cy="90" r="26" fill="#a9bd7e" />
          {/* pin */}
          <g transform="translate(293 190)">
            <path d="M0 44 C 0 44 -30 12 -30 -6 a 30 30 0 1 1 60 0 C 30 12 0 44 0 44 Z" fill="#ff6858" />
            <g transform="translate(0 -8)">
              {Array.from({ length: 8 }).map((_, i) => (
                <ellipse key={i} cx="0" cy="-8" rx="3.6" ry="6" transform={`rotate(${i * 45})`} fill="#fff6e9" />
              ))}
              <circle r="4.5" fill="#f2b233" />
            </g>
          </g>
          <rect x="220" y="244" width="146" height="30" rx="15" fill="#0d3b9c" />
          <text x="293" y="264" textAnchor="middle" fontFamily="var(--font-baloo), 'Baloo 2', sans-serif" fontWeight="700" fontSize="15" fill="#fff6e9">
            FETA POP Soho
          </text>
        </svg>
        <p className="absolute bottom-3 right-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-blue-ink/60">
          Map placeholder — live map at launch
        </p>
      </div>
    </div>
  );
}
