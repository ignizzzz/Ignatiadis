import Button from "@/components/Button";
import OpenNowPill from "@/components/OpenNowPill";
import { cn } from "@/lib/cn";
import type { StoreLocation } from "@/lib/types";

interface LocationCardProps {
  location: StoreLocation;
  className?: string;
}

export default function LocationCard({ location, className }: LocationCardProps) {
  if (location.status === "coming-soon") {
    return (
      <article
        className={cn(
          "flex flex-col justify-between rounded-[2rem] border-2 border-dashed border-blue/25 p-6 sm:p-8",
          className
        )}
      >
        <div>
          <p className="font-hand text-2xl text-coral">Coming soon</p>
          <h3 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-blue">
            {location.city}
          </h3>
          {location.openingNote ? (
            <p className="mt-2 text-blue-ink/70">{location.openingNote}</p>
          ) : null}
        </div>
        <p className="mt-6 text-sm text-blue-ink/60">
          Want it sooner? Tell us where to pop up next.
        </p>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "rounded-[2rem] bg-cream-soft p-6 sm:p-8 shadow-pop",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-blue">
            {location.name}
          </h3>
          {location.addressLines ? (
            <p className="mt-2 text-blue-ink/75">
              {location.addressLines.join(", ")}
            </p>
          ) : null}
        </div>
        <OpenNowPill location={location} />
      </div>

      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        {location.hours ? (
          <div>
            <dt className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
              Opening hours
            </dt>
            <dd className="mt-2">
              <ul className="space-y-1 text-blue-ink/80">
                {location.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="tabular-nums">{h.hours}</span>
                  </li>
                ))}
              </ul>
              {location.specialHoursNote ? (
                <p className="mt-2 text-sm text-blue-ink/60">{location.specialHoursNote}</p>
              ) : null}
            </dd>
          </div>
        ) : null}

        {location.services ? (
          <div>
            <dt className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
              Services
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {location.services.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-cream px-3 py-1 text-sm font-medium text-blue-ink/80"
                >
                  {s}
                </span>
              ))}
            </dd>
            {location.deliveryZones ? (
              <p className="mt-3 text-sm text-blue-ink/60">
                Delivery to {location.deliveryZones.join(", ")} postcodes.
              </p>
            ) : null}
          </div>
        ) : null}

        {location.accessibility ? (
          <div>
            <dt className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
              Accessibility
            </dt>
            <dd className="mt-2">
              <ul className="space-y-1 text-blue-ink/80">
                {location.accessibility.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <svg viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-olive" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                      <path d="M4 12.5l5 5L20 6.5" />
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}

        {location.menuNotes ? (
          <div>
            <dt className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
              Menu notes
            </dt>
            <dd className="mt-2 text-blue-ink/80">{location.menuNotes}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/order" variant="honey">
          Order from here
        </Button>
        {location.directionsUrl ? (
          <Button
            href={location.directionsUrl}
            variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
          </Button>
        ) : null}
      </div>
    </article>
  );
}
