import type { Metadata } from "next";
import Button from "@/components/Button";
import LocationCard from "@/components/LocationCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CityFinder from "@/components/locations/CityFinder";
import MockMap from "@/components/locations/MockMap";
import { FLAGSHIP, LOCATIONS } from "@/data/locations";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find FETA POP in Soho, London — opening hours, directions, delivery zones and accessibility. More cities coming soon.",
};

/** Structured business data for the flagship (fictional concept store). */
const flagshipJsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: FLAGSHIP.name,
  url: `${SITE.url}/locations`,
  servesCuisine: "Greek",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    streetAddress: FLAGSHIP.addressLines?.[0],
    addressLocality: "London",
    postalCode: "W1F 0PP",
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "11:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "12:00",
      closes: "19:00",
    },
  ],
};

export default function LocationsPage() {
  const comingSoon = LOCATIONS.filter((l) => l.status === "coming-soon");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(flagshipJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="come say yia sou"
          title="Find FETA POP"
          lead="One bright blue corner in Soho for now — with more cities warming up in the oven."
        />
      </Reveal>

      {/* Flagship + map */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <LocationCard location={FLAGSHIP} />
        </Reveal>
        <Reveal delay={0.1}>
          <MockMap />
          <div className="mt-6">
            <CityFinder />
          </div>
        </Reveal>
      </div>

      {/* Coming soon */}
      <section className="mt-16 sm:mt-24" aria-labelledby="coming-soon-heading">
        <Reveal>
          <h2
            id="coming-soon-heading"
            className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-blue"
          >
            Warming up next
          </h2>
          <p className="mt-2 max-w-xl text-blue-ink/70">
            The plan: same bite, same honey, new postcodes. These are the
            cities on the shortlist.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {comingSoon.map((location, i) => (
            <Reveal key={location.id} delay={i * 0.07}>
              <LocationCard location={location} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 sm:mt-24 rounded-[2.5rem] bg-honey-soft/60 p-8 sm:p-12 text-center">
        <Reveal>
          <p className="font-hand text-2xl sm:text-3xl text-coral">can’t make it to Soho?</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-blue">
            The bites can travel.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-blue-ink/75">
            Delivery covers central London — check your postcode in the order flow.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/order" variant="blue" size="lg">
              Order delivery
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Suggest a city
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
