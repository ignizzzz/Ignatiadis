import { cn } from "@/lib/cn";

interface IngredientBadgeProps {
  className?: string;
  children: React.ReactNode;
}

/** Small chip used for ingredients and dietary hints. */
export default function IngredientBadge({
  className,
  children,
}: IngredientBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-blue/15 bg-cream px-2.5 py-1 text-xs font-medium text-blue-ink/80 leading-none",
        className
      )}
    >
      {children}
    </span>
  );
}
