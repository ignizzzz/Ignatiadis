import BiteVisual from "@/components/BiteVisual";
import PopFlower from "@/components/PopFlower";
import { SITE } from "@/lib/site";

/**
 * Editorial social/community grid. Tiles are organized image slots —
 * swap the illustrated placeholders for real campaign photography in
 * /public/images/social (see public/images/README.md).
 */
export default function SocialGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 auto-rows-[minmax(140px,1fr)]">
      {/* 01 — hero macro, double size */}
      <figure className="relative col-span-2 row-span-2 overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_120%_at_30%_20%,#fff3d6_0%,#fbdfa4_100%)]">
        <BiteVisual category="signature" accent="honey" className="absolute inset-0 size-full p-6" />
        <figcaption className="absolute bottom-4 left-5 font-hand text-2xl text-blue-ink/85">
          the honey moment
        </figcaption>
      </figure>

      {/* 02 — typographic tile */}
      <div className="flex items-center justify-center rounded-[2rem] bg-coral p-5 text-center">
        <p className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-cream">
          One
          <br />
          more
          <br />
          bite.
        </p>
      </div>

      {/* 03 — share box overhead */}
      <figure className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_120%_at_30%_20%,#e8eefb_0%,#c9d8f5_100%)]">
        <BiteVisual category="share" accent="honey" className="absolute inset-0 size-full p-4" />
        <figcaption className="sr-only">Share box, shot from above</figcaption>
      </figure>

      {/* 04 — hot honey macro */}
      <figure className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_120%_at_30%_20%,#ffe9e2_0%,#ffcdc2_100%)]">
        <BiteVisual category="sweet-spicy" accent="coral" className="absolute inset-0 size-full p-4" />
        <figcaption className="absolute bottom-3 left-4 font-hand text-xl text-blue-ink/80">
          hot honey szn
        </figcaption>
      </figure>

      {/* 05 — brand tile */}
      <div className="flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-blue p-5 text-center">
        <PopFlower className="size-10" />
        <p className="font-display font-bold text-cream leading-tight">
          @fetapop
        </p>
        <p className="text-xs text-cream/70">Tag us. Best crunch wins.</p>
      </div>

      {/* 06 — dip swirl */}
      <figure className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_120%_at_30%_20%,#f0f3e0_0%,#dde5c0_100%)]">
        <BiteVisual category="dips" accent="coral" className="absolute inset-0 size-full p-4" />
        <figcaption className="sr-only">Spicy feta dip with a swirl</figcaption>
      </figure>

      {/* 07 — typographic tile, wide */}
      <div className="col-span-2 flex items-center justify-between gap-4 rounded-[2rem] bg-honey px-6 py-5">
        <p className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-blue-ink">
          Made to photograph.
          <br />
          Better to eat.
        </p>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-blue-ink px-5 py-3 font-display font-bold text-cream transition-transform hover:scale-105 motion-reduce:hover:scale-100"
        >
          Follow
        </a>
      </div>
    </div>
  );
}
