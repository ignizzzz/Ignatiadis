import PopFlower from "@/components/PopFlower";
import { cn } from "@/lib/cn";

interface MarqueeStripProps {
  phrases: string[];
  className?: string;
  tone?: "honey" | "blue" | "coral";
}

const TONES = {
  honey: "bg-honey text-blue-ink",
  blue: "bg-blue text-cream",
  coral: "bg-coral text-cream",
};

/** Full-width scrolling brand phrase ticker. */
export default function MarqueeStrip({ phrases, className, tone = "honey" }: MarqueeStripProps) {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {phrases.map((phrase, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
            {phrase}
          </span>
          <PopFlower
            className="size-6 sm:size-7"
            petal="currentColor"
            centre={tone === "honey" ? "var(--color-coral)" : "var(--color-honey)"}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden py-4 sm:py-5", TONES[tone], className)}>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
