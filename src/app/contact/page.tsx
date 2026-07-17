import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to FETA POP — general enquiries, store support, catering, partnerships, press, careers and franchise interest.",
};

const CHANNELS = [
  {
    title: "General & store",
    copy: "Orders, feedback, lost umbrellas — the team reads everything.",
  },
  {
    title: "Catering",
    copy: "Share boxes at scale for offices, launches and parties that deserve better sandwiches.",
  },
  {
    title: "Partnerships & press",
    copy: "Collabs, media kits and interview requests for the founding team.",
  },
  {
    title: "Careers",
    copy: "We hire for warmth first, phyllo skills second (we can teach the fold).",
  },
  {
    title: "Franchise",
    copy: "Serious about bringing FETA POP to your city? Start the conversation.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <Reveal>
        <SectionHeading
          as="h1"
          eyebrow="talk to us"
          title="Say yia sou."
          lead="Questions, ideas, big plans, small complaints — pick a topic and we'll route it to the right human."
        />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <ul className="space-y-3">
            {CHANNELS.map((channel) => (
              <li key={channel.title} className="rounded-3xl bg-cream-soft p-5 sm:p-6">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-blue">
                  {channel.title}
                </h2>
                <p className="mt-1.5 text-sm text-blue-ink/70">{channel.copy}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-blue-ink/60">
            Prefer email? Everything lands at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-semibold text-blue underline underline-offset-4"
            >
              {SITE.email}
            </a>{" "}
            <span className="text-blue-ink/40">(placeholder address)</span> and
            gets sorted by topic.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2.5rem] bg-cream-soft/70 p-6 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
