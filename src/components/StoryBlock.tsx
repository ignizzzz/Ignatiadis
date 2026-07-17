import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

interface StoryBlockProps {
  eyebrow?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  /** Visual column (illustration, quote card…). */
  aside?: React.ReactNode;
  /** Place the aside on the left on desktop. */
  reverse?: boolean;
  className?: string;
}

/** Editorial two-column story section used on /our-story. */
export default function StoryBlock({
  eyebrow,
  title,
  children,
  aside,
  reverse = false,
  className,
}: StoryBlockProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <Reveal>
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-16",
            aside && "lg:grid-cols-2"
          )}
        >
          <div className={cn(aside && reverse && "lg:order-2")}>
            {eyebrow ? (
              <p className="font-hand text-2xl sm:text-3xl text-coral">{eyebrow}</p>
            ) : null}
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-blue text-balance">
              {title}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-blue-ink/80">
              {children}
            </div>
          </div>
          {aside ? (
            <div className={cn(reverse && "lg:order-1")}>{aside}</div>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
