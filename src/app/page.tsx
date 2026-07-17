import type { Metadata } from "next";
import BiteVisual from "@/components/BiteVisual";
import Button from "@/components/Button";
import LoyaltyCard from "@/components/LoyaltyCard";
import MarqueeStrip from "@/components/MarqueeStrip";
import PopFlower from "@/components/PopFlower";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SocialGrid from "@/components/SocialGrid";
import CrunchMoment from "@/components/home/CrunchMoment";
import Hero from "@/components/home/Hero";
import StorefrontScene from "@/components/home/StorefrontScene";
import { LOYALTY_CONFIG, LOYALTY_REWARDS } from "@/data/loyalty";
import { TOP_SELLERS } from "@/data/menu";

export const metadata: Metadata = {
  title: "FETA POP — Crunch outside. Ooze inside.",
  description:
    "Crispy phyllo-wrapped Greek feta bites with real Greek honey. Order for pickup or delivery in London — small bite, big flavour.",
};

const LAYERS = [
  {
    number: "01",
    name: "Crispy phyllo",
    copy: "Paper-thin layers, baked golden. The crack you hear across the room.",
    icon: (
      <svg viewBox="0 0 48 48" className="size-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
        <path d="M8 18 Q 24 10 40 18" />
        <path d="M8 26 Q 24 18 40 26" />
        <path d="M8 34 Q 24 26 40 34" />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Creamy feta",
    copy: "Real Greek feta, warmed until it gives way. Salty, soft, serious.",
    icon: (
      <svg viewBox="0 0 48 48" className="size-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 18 L 24 10 L 38 18 L 38 32 L 24 40 L 10 32 Z" />
        <path d="M10 18 L 24 26 L 38 18" />
        <path d="M24 26 V 40" />
      </svg>
    ),
  },
  {
    number: "03",
    name: "Natural honey",
    copy: "Single-origin Greek honey, poured while the phyllo is still hot.",
    icon: (
      <svg viewBox="0 0 48 48" className="size-10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
        <path d="M24 8 C 24 8 12 24 12 31 a 12 12 0 0 0 24 0 C 36 24 24 8 24 8 Z" />
        <path d="M19 31 a 5 5 0 0 0 5 5" />
      </svg>
    ),
  },
  {
    number: "04",
    name: "Bold toppings",
    copy: "Sesame, herbs, pistachio, chilli — the finish that names the bite.",
    icon: (
      <svg viewBox="0 0 48 48" className="size-10" fill="currentColor" aria-hidden="true">
        <ellipse cx="14" cy="16" rx="5" ry="3" transform="rotate(-20 14 16)" />
        <ellipse cx="32" cy="12" rx="5" ry="3" transform="rotate(15 32 12)" />
        <ellipse cx="24" cy="26" rx="5" ry="3" transform="rotate(-8 24 26)" />
        <ellipse cx="12" cy="34" rx="5" ry="3" transform="rotate(24 12 34)" />
        <ellipse cx="34" cy="34" rx="5" ry="3" transform="rotate(-18 34 34)" />
      </svg>
    ),
  },
];

const STORE_FEATURES = [
  "Blue storefront you can spot from the corner",
  "Warm wood counter, open prep — watch the fold",
  "Order-ahead collection shelf",
  "A few stools, mostly standing — this is street food",
  "A wall made for photos (you will know it)",
];

export default function HomePage() {
  return (
    <>
      {/* 2. Hero */}
      <Hero />

      <MarqueeStrip
        phrases={[
          "Small bite. Big flavour.",
          "Honey meets feta",
          "Made fresh. Gone fast.",
          "Pop into something good",
        ]}
      />

      {/* 3. Signature product introduction */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="what's inside"
            title={
              <>
                Meet your new
                <br />
                favourite bite.
              </>
            }
            lead="Four layers. No shortcuts. Every FETA POP is folded by hand and baked to order."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.number} delay={i * 0.08}>
              <div className="group h-full rounded-[2rem] bg-cream-soft p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <span className="text-honey-deep">{layer.icon}</span>
                  <span className="font-display text-5xl font-extrabold text-blue/10">
                    {layer.number}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-blue">
                  {layer.name}
                </h3>
                <p className="mt-2 leading-snug text-blue-ink/70">{layer.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Top sellers */}
      <section className="bg-cream-soft/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="the line-up"
                title="Top sellers"
                lead="The four that built the queue. All vegetarian, all baked to order."
              />
              <Button href="/menu" variant="outline" className="mb-1">
                Full menu
              </Button>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {TOP_SELLERS.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.07}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The crunch moment */}
      <CrunchMoment />

      {/* 6. Share box */}
      <section className="bg-honey-soft/50 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="rounded-[2.5rem] bg-[radial-gradient(120%_120%_at_30%_20%,#e8eefb_0%,#c9d8f5_100%)] p-6 shadow-lift">
              <BiteVisual category="share" accent="honey" className="w-full" />
            </div>
            <PopFlower className="absolute -right-1 -top-5 size-14 rotate-12 sm:-right-5" />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="for the table"
              title={
                <>
                  More bites.
                  <br />
                  More honey.
                  <br />
                  Better together.
                </>
              }
              lead="Eight bites, up to three flavours and a dip in our blue box. Built for desk lunches, park benches and people who said they weren't hungry."
            />
            <div className="mt-8">
              <Button href="/order" variant="blue" size="lg">
                Build a Share Box
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Brand story teaser */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-hand text-2xl sm:text-3xl text-coral">our story, short version</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-blue text-balance">
              Born from Greek flavour.
              <br />
              Made for modern cities.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blue-ink/75">
              Feta is Greece’s most famous export. We wrapped it in phyllo,
              covered it in honey and gave it a travel card. Sweet meets salty,
              Athens meets London — and the queue starts here.
            </p>
            <div className="mt-8">
              <Button href="/our-story" variant="outline" size="lg">
                Read the full story
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 8. Store experience */}
      <section className="bg-blue py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              tone="cream"
              eyebrow="find us in Soho"
              title="Your new snack stop."
              lead="A bright blue corner with the smell of hot phyllo drifting out the door. In, out and back to the city in ninety seconds."
            />
            <ul className="mt-8 space-y-3">
              {STORE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-cream/85">
                  <PopFlower className="mt-1 size-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/locations" variant="honey" size="lg">
                Find FETA POP
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
              <StorefrontScene className="block w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Loyalty */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex justify-center lg:order-2">
            <LoyaltyCard
              stamps={LOYALTY_CONFIG.demoStamps}
              memberName={LOYALTY_CONFIG.demoMemberName}
              floating
            />
          </Reveal>
          <Reveal className="lg:order-1">
            <SectionHeading
              eyebrow="POP Club"
              title={
                <>
                  Pop more.
                  <br />
                  Get more.
                </>
              }
              lead={`Digital stamps with every order. ${LOYALTY_CONFIG.stampsForReward} stamps in, your next bite is free — plus birthday surprises and first taste of new flavours.`}
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {LOYALTY_REWARDS.map((reward) => (
                <li
                  key={reward.title}
                  className="rounded-full bg-cream-soft px-4 py-2 font-display font-bold text-blue"
                >
                  {reward.title}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/loyalty" variant="coral" size="lg">
                Join FETA POP
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Social & community */}
      <section className="bg-cream-soft/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="seen on your feed"
              title={
                <>
                  Made to photograph.
                  <br />
                  Better to eat.
                </>
              }
              lead="Honey pours, box openings and the occasional queue selfie. Tag @fetapop and we might repost you."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <SocialGrid />
          </Reveal>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="relative overflow-hidden bg-coral py-20 sm:py-28">
        <PopFlower
          className="absolute -left-10 -top-10 size-40 opacity-25"
          petal="var(--color-cream)"
          centre="var(--color-honey)"
        />
        <PopFlower
          className="absolute -bottom-14 -right-10 size-52 opacity-25"
          petal="var(--color-cream)"
          centre="var(--color-honey)"
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-display font-extrabold uppercase leading-[0.9] tracking-tight text-cream text-[clamp(3rem,10vw,6.5rem)]">
              Ready to pop?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-cream/90">
              Baked to order, ready in minutes. Made fresh. Gone fast.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/order" variant="honey" size="lg" className="w-full sm:w-auto">
                Order Now
              </Button>
              <Button href="/locations" variant="outline-cream" size="lg" className="w-full sm:w-auto">
                Find a Store
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
