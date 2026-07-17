import type { Metadata } from "next";
import BiteVisual from "@/components/BiteVisual";
import Button from "@/components/Button";
import MarqueeStrip from "@/components/MarqueeStrip";
import PopFlower from "@/components/PopFlower";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StoryBlock from "@/components/StoryBlock";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why we wrapped Greece's most famous cheese in crispy phyllo, covered it in honey and opened in London. The FETA POP story.",
};

function QuoteCard({ children }: { children: React.ReactNode }) {
  return (
    <figure className="relative rounded-[2.5rem] bg-blue p-8 sm:p-10 text-cream shadow-lift">
      <PopFlower className="absolute -right-1 -top-4 size-12 rotate-12 sm:-right-4 sm:size-14" />
      <blockquote className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-[1.05] tracking-tight">
        {children}
      </blockquote>
    </figure>
  );
}

export default function OurStoryPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-20 pb-6">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="the whole story"
            title={
              <>
                Greece’s loudest
                <br />
                quiet ingredient.
              </>
            }
            lead="Feta has been doing its thing for centuries — salty, creamy, completely sure of itself. We just gave it a crunchier outfit and a city to run around in."
          />
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 divide-y divide-blue/8">
        {/* Why feta */}
        <StoryBlock
          eyebrow="why feta"
          title="The cheese that needs no introduction"
          aside={
            <QuoteCard>
              Everyone knows feta.
              <br />
              <span className="text-honey">Nobody snacks it.</span>
              <br />
              We fixed that.
            </QuoteCard>
          }
        >
          <p>
            Feta is one of the most recognized foods on the planet — the anchor
            of every Greek salad, the white block in every European fridge. But
            outside Greece it stays in one lane: crumbled, cubed, sidelined.
          </p>
          <p>
            We thought the world’s most famous cheese deserved a starring role.
            Warm, whipped soft inside golden phyllo, eaten with one hand on the
            way somewhere better.
          </p>
        </StoryBlock>

        {/* Sweet & salty */}
        <StoryBlock
          eyebrow="the idea"
          title="Sweet and salty were always meant to meet"
          reverse
          aside={
            <div className="rounded-[2.5rem] bg-[radial-gradient(120%_120%_at_30%_20%,#fff3d6_0%,#fbdfa4_100%)] p-6 shadow-pop">
              <BiteVisual category="signature" accent="honey" className="w-full" />
            </div>
          }
        >
          <p>
            In Greece, feta with honey is not an invention — it is a habit.
            Fried cheese, a spoonful of honey, sesame if you’re lucky. Tavernas
            have served it forever without making a fuss.
          </p>
          <p>
            FETA POP takes that taverna instinct and turns it into a format:
            crispy phyllo outside, molten feta inside, real Greek honey over
            the top. Salty then sweet then salty again. It should be
            complicated. It isn’t.
          </p>
        </StoryBlock>

        {/* Ingredients */}
        <StoryBlock
          eyebrow="the larder"
          title="A short menu of serious ingredients"
          aside={
            <ul className="grid grid-cols-2 gap-3">
              {[
                { name: "Greek feta", note: "PDO barrel-aged", tone: "bg-cream-soft" },
                { name: "Phyllo", note: "paper-thin, hand-folded", tone: "bg-honey-soft" },
                { name: "Greek honey", note: "single-origin", tone: "bg-honey-soft" },
                { name: "Sesame & herbs", note: "toasted daily", tone: "bg-cream-soft" },
                { name: "Pistachio", note: "crushed to order", tone: "bg-cream-soft" },
                { name: "Chilli", note: "for the brave-ish", tone: "bg-honey-soft" },
              ].map((item) => (
                <li key={item.name} className={`rounded-3xl ${item.tone} p-5`}>
                  <p className="font-display font-extrabold text-blue leading-tight">{item.name}</p>
                  <p className="mt-1 text-sm text-blue-ink/60">{item.note}</p>
                </li>
              ))}
            </ul>
          }
          reverse={false}
        >
          <p>
            We keep the list short on purpose. Real feta from Greece. Honey
            from Greek producers we can name. Phyllo made thin enough to
            shatter, herbs and seeds toasted the same morning they’re used.
          </p>
          <p>
            Mediterranean food doesn’t need twenty ingredients — it needs six
            good ones and the confidence to stop there.
          </p>
        </StoryBlock>

        {/* Fast-casual culture */}
        <StoryBlock
          eyebrow="the format"
          title="Street food pace, taverna soul"
          reverse
          aside={
            <QuoteCard>
              Ninety seconds
              <br />
              from “hello” to
              <br />
              <span className="text-honey">first crunch.</span>
            </QuoteCard>
          }
        >
          <p>
            Modern cities eat standing up, between things, phone in the other
            hand. We built FETA POP for exactly that: a counter, an oven, a
            queue that moves, and food that peaks in the first three minutes.
          </p>
          <p>
            No white tablecloths, no bouzouki playlist, no Parthenon on the
            wall. The Greekness is in the food, not the decor.
          </p>
        </StoryBlock>

        {/* Sourcing + freshness */}
        <StoryBlock
          eyebrow="how we work"
          title="Fresh is a schedule, not a slogan"
          aside={
            <ul className="space-y-3">
              {[
                "Baked to order, never held under heat lamps",
                "Feta and honey shipped from Greek producers",
                "Phyllo folded by hand every morning",
                "Seasonal specials follow the Mediterranean calendar",
                "Packaging designed to be recycled, not collected",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl bg-cream-soft px-5 py-4 text-blue-ink/85">
                  <PopFlower className="mt-0.5 size-5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          }
        >
          <p>
            Every bite is assembled and baked after you order it — that’s why
            the phyllo cracks. Our feta and honey come from Greek producers we
            work with directly, and our seasonal toppings follow what the
            Mediterranean actually grows, when it actually grows it.
          </p>
          <p>
            We are a young brand. We would rather make honest claims we can
            keep than heritage stories we borrowed.
          </p>
        </StoryBlock>

        {/* Ambition */}
        <StoryBlock
          eyebrow="where this goes"
          title="London first. Then everywhere people snack."
          reverse
          aside={
            <div className="rounded-[2.5rem] bg-blue p-8 text-cream shadow-lift">
              <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-honey">
                The map so far
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { city: "London — Soho", status: "Open now" },
                  { city: "London — Shoreditch", status: "Spring 2027" },
                  { city: "Manchester", status: "Scouting" },
                  { city: "Berlin", status: "In the works" },
                ].map((stop) => (
                  <li key={stop.city} className="flex items-center justify-between gap-4 border-b border-cream/10 pb-3 last:border-0">
                    <span className="font-display font-bold">{stop.city}</span>
                    <span className="text-sm text-cream/70">{stop.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <p>
            Soho is our first counter, not our last. The plan is simple:
            prove that modern Greek snacking travels, one city at a time —
            same bite, same honey, same three-second ritual.
          </p>
          <p>
            If feta can make it out of the salad, it can make it anywhere.
          </p>
        </StoryBlock>
      </div>

      <MarqueeStrip
        tone="coral"
        phrases={[
          "Born from Greek flavour",
          "Made for modern cities",
          "Honey meets feta",
          "Snack different",
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 text-center">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="taste the story"
            title="Words only get you so far."
            lead="The rest is crunch. Come and try the bite that started it."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/order" variant="honey" size="lg">
              Order FETA POP
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              See the menu
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
