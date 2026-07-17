import { useId } from "react";
import type { AccentColour, CategoryId } from "@/lib/types";

interface BiteVisualProps {
  category: CategoryId;
  accent: AccentColour;
  className?: string;
}

const GARNISH: Record<AccentColour, string> = {
  honey: "#6a7f3d", // oregano flecks
  coral: "#de4433", // chilli flakes
  olive: "#52642c", // pistachio crumb
  blue: "#ff6858", // seasonal confetti
};

/** Scattered sesame seeds. */
function Sesame({ seeds }: { seeds: [number, number, number][] }) {
  return (
    <g fill="#fdf3dd" stroke="#d99512" strokeWidth="0.6">
      {seeds.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4.5" ry="2.6" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </g>
  );
}

function Flecks({
  colour,
  spots,
}: {
  colour: string;
  spots: [number, number, number][];
}) {
  return (
    <g fill={colour}>
      {spots.map(([x, y, r], i) => (
        <rect key={i} x={x} y={y} width="7" height="3.2" rx="1.6" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </g>
  );
}

/** One golden phyllo parcel, reusable at any size via <g transform>. */
function Parcel({ ids, garnish }: { ids: { body: string; drizzle: string }; garnish: string }) {
  return (
    <g>
      {/* soft shadow */}
      <ellipse cx="200" cy="252" rx="118" ry="17" fill="#071f54" opacity="0.13" />
      {/* phyllo body */}
      <rect x="88" y="78" width="224" height="158" rx="44" fill={`url(#${ids.body})`} transform="rotate(-2.5 200 157)" />
      {/* flaky top shards */}
      <g fill="#fce3a6" opacity="0.9">
        <rect x="120" y="70" width="34" height="12" rx="6" transform="rotate(-12 137 76)" />
        <rect x="196" y="60" width="30" height="11" rx="5.5" transform="rotate(7 211 66)" />
        <rect x="258" y="72" width="26" height="10" rx="5" transform="rotate(-6 271 77)" />
      </g>
      {/* phyllo layer ridges */}
      <g stroke="#c9881a" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5">
        <path d="M112 128 Q 160 116 208 126 T 296 122" />
        <path d="M106 162 Q 158 150 210 160 T 298 156" />
        <path d="M112 196 Q 162 186 212 194 T 292 190" />
      </g>
      <g stroke="#fce3a6" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M116 118 Q 162 106 206 116 T 290 112" />
        <path d="M110 152 Q 160 140 212 150 T 294 146" />
      </g>
      {/* feta ooze at the bitten corner */}
      <path
        d="M282 196 q 26 -4 32 14 q 5 16 -12 22 q -20 8 -34 -4 q -12 -11 -2 -22 q 6 -8 16 -10 Z"
        fill="#fffdf6"
        stroke="#efe3cc"
        strokeWidth="2"
      />
      <path d="M287 208 q 12 -2 16 8" stroke="#efe3cc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* honey drizzle cascade */}
      <g stroke={`url(#${ids.drizzle})`} strokeLinecap="round" fill="none">
        <path d="M132 96 Q 200 78 268 96 Q 210 88 152 104 Q 214 96 258 112" strokeWidth="9" />
        <path d="M300 128 q 8 24 4 44 q -2 12 -4 18" strokeWidth="8" />
      </g>
      <circle cx="299" cy="200" r="7.5" fill="#d98a00" />
      {/* sesame + garnish */}
      <Sesame
        seeds={[
          [150, 122, -20],
          [186, 108, 30],
          [232, 118, -8],
          [262, 134, 24],
          [172, 156, 12],
          [218, 168, -26],
          [148, 186, 18],
          [246, 188, -14],
        ]}
      />
      <Flecks
        colour={garnish}
        spots={[
          [166, 132, 24],
          [208, 142, -18],
          [244, 156, 40],
          [186, 178, -32],
          [140, 158, 8],
        ]}
      />
    </g>
  );
}

/** Small parcel used inside share boxes. */
function MiniParcel({ x, y, rotate, garnish }: { x: number; y: number; rotate: number; garnish: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect x="-30" y="-24" width="60" height="48" rx="15" fill="#efb93f" />
      <rect x="-30" y="-24" width="60" height="20" rx="10" fill="#f7c95c" />
      <path d="M-18 -6 Q 0 -12 18 -6" stroke="#c9881a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M-16 8 Q 2 2 18 8" stroke="#c9881a" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
      <ellipse cx="-8" cy="-14" rx="3" ry="1.8" fill="#fdf3dd" transform="rotate(-16 -8 -14)" />
      <ellipse cx="8" cy="-10" rx="3" ry="1.8" fill="#fdf3dd" transform="rotate(20 8 -10)" />
      <rect x="2" y="2" width="5" height="2.4" rx="1.2" fill={garnish} transform="rotate(30 4 3)" />
    </g>
  );
}

export default function BiteVisual({ category, accent, className }: BiteVisualProps) {
  const uid = useId().replace(/[:]/g, "");
  const ids = { body: `pb-${uid}`, drizzle: `pd-${uid}` };
  const garnish = GARNISH[accent];

  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={ids.body} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#f7c95c" />
          <stop offset="55%" stopColor="#efb93f" />
          <stop offset="100%" stopColor="#e29c22" />
        </linearGradient>
        <linearGradient id={ids.drizzle} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc94d" />
          <stop offset="100%" stopColor="#d98a00" />
        </linearGradient>
      </defs>

      {category === "share" ? (
        <g>
          <ellipse cx="200" cy="262" rx="150" ry="14" fill="#071f54" opacity="0.12" />
          {/* blue takeaway box, overhead */}
          <rect x="36" y="26" width="328" height="240" rx="26" fill="#0d3b9c" />
          <rect x="36" y="26" width="328" height="240" rx="26" fill="none" stroke="#092d7a" strokeWidth="6" />
          {/* paper liner */}
          <rect x="58" y="48" width="284" height="196" rx="16" fill="#fff6e9" />
          <MiniParcel x={110} y={98} rotate={-8} garnish={garnish} />
          <MiniParcel x={186} y={92} rotate={6} garnish={garnish} />
          <MiniParcel x={262} y={100} rotate={-4} garnish={garnish} />
          <MiniParcel x={116} y={168} rotate={5} garnish={garnish} />
          <MiniParcel x={192} y={176} rotate={-7} garnish={garnish} />
          <MiniParcel x={268} y={170} rotate={9} garnish={garnish} />
          {/* dip pot */}
          <circle cx="306" cy="216" r="26" fill="#fffdf6" stroke="#e2d5bd" strokeWidth="3" />
          <path d="M294 214 q 12 -10 24 0 q -12 10 -24 0" fill="#f2b233" opacity="0.9" />
          {/* honey drizzle across the box */}
          <path
            d="M84 140 Q 160 120 236 142 T 330 138"
            stroke={`url(#${ids.drizzle})`}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
        </g>
      ) : category === "dips" ? (
        <g>
          <ellipse cx="200" cy="258" rx="120" ry="14" fill="#071f54" opacity="0.12" />
          {/* pot, overhead */}
          <circle cx="200" cy="152" r="112" fill={accent === "coral" ? "#ff6858" : accent === "olive" ? "#6a7f3d" : accent === "honey" ? "#f2b233" : "#0d3b9c"} />
          <circle cx="200" cy="152" r="94" fill="#fffdf6" />
          {/* swirl */}
          <path
            d="M200 92 a 60 60 0 1 1 -52 90 a 44 44 0 1 0 40 -66 a 28 28 0 1 1 -20 40"
            stroke="#efe3cc"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          {/* drizzle + garnish */}
          <path
            d="M156 128 Q 200 108 246 130 Q 208 122 168 140"
            stroke={`url(#${ids.drizzle})`}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <Flecks
            colour={garnish}
            spots={[
              [172, 168, 20],
              [216, 178, -24],
              [238, 148, 36],
            ]}
          />
          <Sesame
            seeds={[
              [186, 148, -12],
              [222, 132, 22],
            ]}
          />
        </g>
      ) : category === "drinks" ? (
        <g>
          <ellipse cx="200" cy="266" rx="86" ry="12" fill="#071f54" opacity="0.12" />
          {/* branded cup */}
          <path d="M142 74 L 258 74 L 244 258 L 156 258 Z" fill="#fff6e9" stroke="#e8d9bd" strokeWidth="3" />
          {/* liquid tint at top */}
          <path
            d="M146 90 L 254 90 L 250 138 L 150 138 Z"
            fill={accent === "coral" ? "#ff6858" : accent === "honey" ? "#f2b233" : "#0d3b9c"}
            opacity="0.28"
          />
          {/* brand band */}
          <path d="M150 148 L 250 148 L 246 196 L 154 196 Z" fill="#0d3b9c" />
          <g fill="#f2b233">
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse key={i} cx="200" cy="164" rx="3.4" ry="5.4" transform={`rotate(${i * 45} 200 172)`} />
            ))}
          </g>
          <circle cx="200" cy="172" r="4.6" fill="#ff6858" />
          {/* lid + straw */}
          <rect x="134" y="58" width="132" height="18" rx="9" fill="#0d3b9c" />
          <rect x="206" y="8" width="13" height="60" rx="6.5" fill={accent === "olive" ? "#6a7f3d" : "#ff6858"} transform="rotate(9 212 38)" />
          {/* ice cubes */}
          <rect x="162" y="98" width="24" height="24" rx="6" fill="#ffffff" opacity="0.55" transform="rotate(-10 174 110)" />
          <rect x="214" y="104" width="20" height="20" rx="5" fill="#ffffff" opacity="0.5" transform="rotate(14 224 114)" />
        </g>
      ) : category === "sides" ? (
        <g>
          <ellipse cx="200" cy="256" rx="128" ry="15" fill="#071f54" opacity="0.12" />
          {/* bowl */}
          <path d="M84 150 L 316 150 Q 312 236 200 240 Q 88 236 84 150 Z" fill="#0d3b9c" />
          <ellipse cx="200" cy="150" rx="116" ry="26" fill="#092d7a" />
          {/* contents */}
          {accent === "honey" ? (
            <g>
              {/* phyllo shards */}
              <path d="M136 136 l 44 -26 l 12 22 l -44 18 Z" fill="#f7c95c" stroke="#c9881a" strokeWidth="2" />
              <path d="M186 122 l 48 -14 l 6 24 l -46 12 Z" fill="#efb93f" stroke="#c9881a" strokeWidth="2" />
              <path d="M236 132 l 40 -20 l 10 20 l -38 18 Z" fill="#fce3a6" stroke="#c9881a" strokeWidth="2" />
              <Sesame seeds={[[176, 138, 14], [222, 130, -20], [254, 142, 8]]} />
            </g>
          ) : accent === "coral" ? (
            <g>
              {/* salad: tomato, cucumber, olive, feta */}
              <circle cx="152" cy="138" r="17" fill="#de4433" />
              <circle cx="192" cy="128" r="15" fill="#ff6858" />
              <circle cx="230" cy="140" r="16" fill="#de4433" />
              <circle cx="212" cy="120" r="11" fill="#8fae54" />
              <circle cx="170" cy="118" r="10" fill="#8fae54" />
              <circle cx="258" cy="126" r="9" fill="#3d4a22" />
              <rect x="196" y="132" width="26" height="18" rx="4" fill="#fffdf6" transform="rotate(-8 209 141)" />
              <rect x="136" y="118" width="22" height="16" rx="4" fill="#fffdf6" transform="rotate(10 147 126)" />
            </g>
          ) : (
            <g>
              {/* olives */}
              <circle cx="156" cy="132" r="14" fill="#52642c" />
              <circle cx="192" cy="122" r="15" fill="#3d4a22" />
              <circle cx="228" cy="132" r="14" fill="#52642c" />
              <circle cx="252" cy="122" r="12" fill="#3d4a22" />
              <circle cx="174" cy="146" r="12" fill="#3d4a22" />
              <circle cx="214" cy="148" r="13" fill="#52642c" />
              <path d="M150 108 q 10 -14 24 -10" stroke="#6a7f3d" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          )}
        </g>
      ) : (
        <Parcel ids={ids} garnish={garnish} />
      )}
    </svg>
  );
}
