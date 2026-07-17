import Logo from "@/components/Logo";
import PopFlower from "@/components/PopFlower";
import { cn } from "@/lib/cn";
import { LOYALTY_CONFIG } from "@/data/loyalty";

interface LoyaltyCardProps {
  stamps: number;
  memberName?: string;
  className?: string;
  /** Adds a gentle float animation. */
  floating?: boolean;
}

/** The POP Club digital loyalty card with punch-style stamps. */
export default function LoyaltyCard({
  stamps,
  memberName = "Member",
  className,
  floating = false,
}: LoyaltyCardProps) {
  const total = LOYALTY_CONFIG.stampsForReward;
  const remaining = Math.max(total - stamps, 0);

  return (
    <div
      className={cn(
        "relative w-full max-w-sm rounded-[1.75rem] bg-blue p-6 text-cream shadow-lift",
        floating && "animate-float motion-reduce:animate-none",
        className
      )}
      role="img"
      aria-label={`POP Club loyalty card for ${memberName}: ${stamps} of ${total} stamps collected`}
    >
      {/* Card texture accents */}
      <PopFlower
        className="absolute -right-1 -top-4 size-14 rotate-12 sm:-right-4 sm:size-16"
        petal="var(--color-honey)"
        centre="var(--color-coral)"
      />

      <div className="flex items-center justify-between gap-4">
        <Logo tone="cream" size="sm" asLink={false} />
        <span className="rounded-full bg-honey px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-blue-ink">
          {LOYALTY_CONFIG.programmeName}
        </span>
      </div>

      <p className="mt-6 font-hand text-2xl text-honey">Hey {memberName}!</p>
      <p className="mt-1 text-sm text-cream/80">
        {remaining === 0
          ? "Free bite unlocked — claim it on your next visit."
          : `${remaining} more stamp${remaining === 1 ? "" : "s"} until a free bite.`}
      </p>

      <div className="mt-5 grid grid-cols-4 gap-3" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < stamps;
          return (
            <span
              key={i}
              className={cn(
                "flex aspect-square items-center justify-center rounded-full border-2",
                filled ? "border-honey bg-honey/15" : "border-cream/25 border-dashed"
              )}
            >
              {filled ? (
                <PopFlower className="size-3/5" />
              ) : (
                <span className="font-display text-sm font-bold text-cream/40">{i + 1}</span>
              )}
            </span>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-cream/60">
        <span className="font-mono tracking-[0.2em]">•••• 2748</span>
        <span>
          {stamps}/{total} stamps
        </span>
      </div>
    </div>
  );
}
