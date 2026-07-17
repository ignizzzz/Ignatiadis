import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small handwritten or uppercase intro line. */
  eyebrow?: string;
  /** Render the eyebrow in the handwritten accent font. */
  handwritten?: boolean;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "blue" | "cream";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  eyebrow,
  handwritten = true,
  title,
  lead,
  align = "left",
  tone = "blue",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            handwritten
              ? "font-hand text-2xl sm:text-3xl"
              : "font-display font-bold text-sm uppercase tracking-[0.2em]",
            tone === "blue" ? "text-coral" : "text-honey"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-display font-extrabold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl text-balance",
          eyebrow && "mt-2",
          tone === "blue" ? "text-blue" : "text-cream"
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "blue" ? "text-blue-ink/75" : "text-cream/85"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
