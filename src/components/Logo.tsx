import Link from "next/link";
import PopFlower from "@/components/PopFlower";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  /** Text colour class, e.g. "text-blue" (default) or "text-cream" on dark. */
  tone?: "blue" | "cream";
  /** Overall size. */
  size?: "sm" | "md" | "lg";
  /** Render as a link to home (default true). */
  asLink?: boolean;
}

const SIZES = {
  sm: { text: "text-xl", flower: "size-[1.05em]" },
  md: { text: "text-2xl", flower: "size-[1.05em]" },
  lg: { text: "text-4xl sm:text-5xl", flower: "size-[1.05em]" },
} as const;

/** The FETA POP wordmark — the "O" in POP is the brand flower. */
export default function Logo({
  className,
  tone = "blue",
  size = "md",
  asLink = true,
}: LogoProps) {
  const s = SIZES[size];
  const mark = (
    <span
      className={cn(
        "font-display font-bold tracking-tight inline-flex items-baseline gap-[0.28em] leading-none select-none",
        tone === "blue" ? "text-blue" : "text-cream",
        s.text,
        className
      )}
    >
      <span>FETA</span>
      <span className="inline-flex items-center">
        P
        <PopFlower
          className={cn(
            s.flower,
            "mx-[0.04em] translate-y-[0.1em] transition-transform duration-300 group-hover/logo:rotate-45 motion-reduce:transition-none"
          )}
        />
        P
      </span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link
      href="/"
      className="group/logo inline-flex items-center rounded-lg"
      aria-label="FETA POP — home"
    >
      {mark}
    </Link>
  );
}
