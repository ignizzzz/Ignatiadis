"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

/**
 * Hero visual: macro phyllo-feta bite with an animated honey pour.
 * Placeholder illustration — swap for /images/editorial/hero-macro.jpg
 * photography when available (see public/images/README.md).
 */
export default function HeroBite({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/[:]/g, "");
  const bodyId = `hb-${uid}`;
  const pourId = `hp-${uid}`;

  return (
    <svg
      viewBox="0 0 520 500"
      className={className}
      role="img"
      aria-label="Crispy phyllo feta bite with honey pouring over it"
    >
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#f7c95c" />
          <stop offset="55%" stopColor="#efb93f" />
          <stop offset="100%" stopColor="#e0981f" />
        </linearGradient>
        <linearGradient id={pourId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffce57" />
          <stop offset="100%" stopColor="#d98a00" />
        </linearGradient>
      </defs>

      {/* backdrop pop */}
      <circle cx="264" cy="270" r="205" fill="#fbdfa4" opacity="0.55" />

      {/* honey pour from above */}
      <motion.path
        d="M263 8 C 261 60 266 96 262 138 C 259 168 264 190 262 214"
        stroke={`url(#${pourId})`}
        strokeWidth="17"
        strokeLinecap="round"
        fill="none"
        initial={reduceMotion ? undefined : { pathLength: 0 }}
        animate={reduceMotion ? undefined : { pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.25 }}
      />

      {/* pooled honey on top of the bite */}
      <motion.g
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.7 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.15 }}
        style={{ transformOrigin: "262px 226px" }}
      >
        <ellipse cx="262" cy="226" rx="58" ry="16" fill="#eda912" opacity="0.9" />
        <ellipse cx="248" cy="222" rx="20" ry="6" fill="#ffd88a" opacity="0.85" />
      </motion.g>

      {/* shadow */}
      <ellipse cx="262" cy="452" rx="168" ry="24" fill="#071f54" opacity="0.14" />

      {/* the bite */}
      <g transform="rotate(-2.5 262 330)">
        <rect x="112" y="216" width="304" height="212" rx="58" fill={`url(#${bodyId})`} />
        {/* flaky shards on top edge */}
        <g fill="#fce3a6" opacity="0.95">
          <rect x="150" y="206" width="46" height="16" rx="8" transform="rotate(-12 173 214)" />
          <rect x="252" y="196" width="40" height="15" rx="7.5" transform="rotate(7 272 203)" />
          <rect x="336" y="208" width="36" height="14" rx="7" transform="rotate(-6 354 215)" />
        </g>
        {/* phyllo ridges */}
        <g stroke="#c9881a" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.5">
          <path d="M144 282 Q 208 266 268 280 T 388 276" />
          <path d="M138 328 Q 206 312 272 326 T 392 322" />
          <path d="M146 374 Q 210 360 274 372 T 384 368" />
        </g>
        <g stroke="#fce3a6" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M150 268 Q 212 254 270 266 T 382 262" />
          <path d="M144 314 Q 208 300 274 312 T 388 308" />
        </g>
        {/* feta ooze */}
        <path
          d="M376 372 q 38 -6 47 20 q 7 24 -18 32 q -29 11 -49 -6 q -17 -15 -3 -31 q 9 -11 23 -15 Z"
          fill="#fffdf6"
          stroke="#efe3cc"
          strokeWidth="3"
        />
        <path d="M384 390 q 17 -3 23 12" stroke="#efe3cc" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* honey run-off down the side */}
        <path
          d="M404 268 q 12 34 6 62 q -3 17 -6 26"
          stroke={`url(#${pourId})`}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="402" cy="368" r="9" fill="#d98a00" />
      </g>

      {/* sesame + garnish floating in */}
      <g fill="#fdf3dd" stroke="#d99512" strokeWidth="0.8">
        {(
          [
            [196, 262, -20],
            [242, 246, 30],
            [300, 256, -8],
            [342, 272, 24],
            [222, 300, 12],
            [286, 312, -26],
            [196, 340, 18],
            [322, 336, -14],
            [258, 356, 30],
          ] as const
        ).map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6.5" ry="3.8" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
      <g fill="#6a7f3d">
        {(
          [
            [230, 274, 24],
            [306, 286, -18],
            [352, 306, 40],
            [262, 330, -32],
          ] as const
        ).map(([x, y, r], i) => (
          <rect key={i} x={x} y={y} width="10" height="4.4" rx="2.2" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}
