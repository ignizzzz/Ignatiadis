"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const WORDS = [
  { word: "Crack.", note: "shatter the phyllo" },
  { word: "Drizzle.", note: "let the honey run" },
  { word: "Pop.", note: "one bite, gone" },
];

/**
 * Immersive editorial section built on the physical eating moment.
 * The honey line grows with scroll; sesame particles drift in.
 */
export default function CrunchMoment() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const honeyScale = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section
      ref={ref}
      aria-label="The FETA POP eating moment"
      className="relative overflow-hidden bg-blue-ink py-20 sm:py-28"
    >
      {/* drifting sesame particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {(
          [
            [8, 18, 0],
            [22, 72, 1.2],
            [46, 30, 0.6],
            [64, 80, 1.6],
            [78, 22, 0.3],
            [90, 60, 1],
            [34, 55, 1.4],
            [56, 12, 0.8],
          ] as const
        ).map(([left, top, delay], i) => (
          <motion.span
            key={i}
            className="absolute block h-2 w-3.5 rounded-full bg-honey/60"
            style={{ left: `${left}%`, top: `${top}%`, rotate: `${(i * 47) % 90}deg` }}
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.9 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-hand text-2xl sm:text-3xl text-honey">
          the three-second ritual
        </p>

        <div className="mt-6 space-y-2 sm:space-y-4">
          {WORDS.map((item, i) => (
            <motion.div
              key={item.word}
              initial={reduceMotion ? undefined : { opacity: 0, x: -32 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.14, duration: 0.55, ease: [0.22, 0.65, 0.3, 0.9] }}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1"
            >
              <span className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-cream text-[clamp(3.2rem,12vw,8rem)]">
                {item.word}
              </span>
              <span className="font-hand text-xl sm:text-2xl text-cream/50">
                {item.note}
              </span>
            </motion.div>
          ))}
        </div>

        {/* honey line that follows scroll */}
        <div className="mt-12 h-3 overflow-hidden rounded-full bg-cream/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-honey to-honey-deep"
            style={reduceMotion ? undefined : { scaleX: honeyScale, transformOrigin: "left" }}
          />
        </div>
        <p className="mt-4 max-w-md text-cream/70 leading-relaxed">
          Baked to order, never sitting under a lamp. Hot phyllo, cool honey,
          and about three seconds between first crack and empty wrapper.
        </p>
      </div>
    </section>
  );
}
