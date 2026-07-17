import { cn } from "@/lib/cn";

interface PopFlowerProps {
  className?: string;
  /** Petal colour. */
  petal?: string;
  /** Centre colour. */
  centre?: string;
  title?: string;
}

/**
 * The FETA POP flower — the "O" of the wordmark and the brand's pop symbol.
 * Eight rounded petals around a bold centre.
 */
export default function PopFlower({
  className,
  petal = "var(--color-honey)",
  centre = "var(--color-coral)",
  title,
}: PopFlowerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("inline-block", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <g fill={petal}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="20"
            rx="13"
            ry="20"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="17" fill={centre} />
    </svg>
  );
}
