import type { Metadata } from "next";
import AllergenModal from "@/components/AllergenModal";
import Button from "@/components/Button";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionHeading from "@/components/SectionHeading";
import MenuExplorer from "@/components/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Signature phyllo-feta bites, sweet & spicy specials, share boxes, dips and drinks. See allergens, dietary info and prices.",
};

export default function MenuPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
          <SectionHeading
            as="h1"
            eyebrow="pick your pop"
            title="The menu"
            lead="Every bite starts with real Greek feta and hand-folded phyllo, baked to order. The rest is up to you."
          />
          <div className="mb-1 flex flex-wrap gap-3" id="allergens">
            <AllergenModal />
          </div>
        </div>

        <MenuExplorer />

        <div className="border-t border-blue/10 py-10 text-sm text-blue-ink/60">
          <p className="max-w-2xl">
            Prices are launch placeholders and include VAT. Calories are
            indicative placeholder values for an average adult’s daily
            reference intake, not a nutritional claim. Everything is baked in
            a kitchen that handles gluten, milk, sesame and nuts — if you have
            an allergy, check the allergen information above or ask the team.
          </p>
        </div>
      </div>

      <MarqueeStrip
        tone="blue"
        phrases={[
          "One more bite.",
          "More honey. More joy.",
          "Greek flavour, made to move.",
          "Small bite. Serious crunch.",
        ]}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
        <SectionHeading
          align="center"
          eyebrow="hungry now?"
          title="Skip the queue."
          lead="Order ahead and your box is waiting on the collection shelf."
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/order" variant="honey" size="lg">
            Order FETA POP
          </Button>
          <Button href="/locations" variant="outline" size="lg">
            Find a store
          </Button>
        </div>
      </section>
    </>
  );
}
