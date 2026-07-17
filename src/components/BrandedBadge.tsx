import { cn } from "@/lib/cn";

type BadgeTone = "honey" | "coral" | "olive" | "blue" | "cream";

const TONES: Record<BadgeTone, string> = {
  honey: "bg-honey text-blue-ink",
  coral: "bg-coral text-cream",
  olive: "bg-olive text-cream",
  blue: "bg-blue text-cream",
  cream: "bg-cream text-blue border border-blue/15",
};

interface BrandedBadgeProps {
  tone?: BadgeTone;
  className?: string;
  /** Slight playful rotation, e.g. -2 or 3 (degrees). */
  tilt?: number;
  children: React.ReactNode;
}

/** Small brand annotation pill — "Made fresh daily", "Real Greek feta"… */
export default function BrandedBadge({
  tone = "honey",
  className,
  tilt = 0,
  children,
}: BrandedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display font-bold text-sm leading-none shadow-pop",
        TONES[tone],
        className
      )}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      {children}
    </span>
  );
}
