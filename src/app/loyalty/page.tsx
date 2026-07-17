import type { Metadata } from "next";
import Button from "@/components/Button";
import LoyaltyCard from "@/components/LoyaltyCard";
import PopFlower from "@/components/PopFlower";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import LoyaltyJoin from "@/components/loyalty/LoyaltyJoin";
import { LOYALTY_CONFIG, LOYALTY_FAQS, LOYALTY_REWARDS } from "@/data/loyalty";

export const metadata: Metadata = {
  title: "POP Club Loyalty",
  description:
    "Join POP Club — collect a stamp with every FETA POP order and unlock free bites, birthday surprises and first taste of new flavours.",
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Join in a minute",
    copy: "Sign up free, get your digital card in your wallet app.",
  },
  {
    step: "2",
    title: "Pop, scan, stamp",
    copy: "Every qualifying order earns a stamp — in store or online.",
  },
  {
    step: "3",
    title: "Eat the reward",
    copy: `${LOYALTY_CONFIG.stampsForReward} stamps in, any signature bite is free. Then we start again.`,
  },
];

export default function LoyaltyPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-blue">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              as="h1"
              tone="cream"
              eyebrow="POP Club"
              title={
                <>
                  Pop more.
                  <br />
                  Get more.
                </>
              }
              lead="A loyalty card that behaves like a punch card, lives in your phone and pays out in feta."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#join" variant="honey" size="lg">
                Join FETA POP
              </Button>
              <Button href="#faq" variant="outline-cream" size="lg">
                How it works
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="flex justify-center">
            <LoyaltyCard
              stamps={LOYALTY_CONFIG.demoStamps}
              memberName={LOYALTY_CONFIG.demoMemberName}
              floating
            />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="how-heading">
        <Reveal>
          <h2
            id="how-heading"
            className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-blue"
          >
            How it works
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <div className="h-full rounded-[2rem] bg-cream-soft p-6 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-full bg-honey font-display text-xl font-extrabold text-blue-ink">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-blue">
                  {item.title}
                </h3>
                <p className="mt-2 text-blue-ink/70">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section className="bg-cream-soft/60 py-16 sm:py-24" aria-labelledby="rewards-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2
              id="rewards-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-blue"
            >
              What you unlock
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LOYALTY_REWARDS.map((reward, i) => (
              <Reveal key={reward.title} delay={i * 0.07}>
                <div className="h-full rounded-[2rem] bg-cream p-6 shadow-pop">
                  <PopFlower className="size-9" />
                  <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-blue">
                    {reward.title}
                  </h3>
                  <p className="mt-2 text-sm text-blue-ink/70">{reward.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join */}
      <section id="join" className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="one minute, honestly"
            title="Get your card."
            lead="Free to join, easy to use, dangerously easy to fill."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <LoyaltyJoin />
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 sm:px-6 pb-16 sm:pb-24" aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-blue"
        >
          Questions, answered
        </h2>
        <div className="mt-8 space-y-3">
          {LOYALTY_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl bg-cream-soft open:bg-honey-soft/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display font-bold text-blue [&::-webkit-details-marker]:hidden">
                {faq.question}
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 shrink-0 transition-transform group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-blue-ink/75">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border-2 border-dashed border-blue/20 p-6 text-sm text-blue-ink/60">
          <h3 className="font-display font-bold uppercase tracking-[0.18em] text-blue-ink/70">
            Programme terms — placeholder
          </h3>
          <p className="mt-2">
            Full POP Club terms and conditions (eligibility, stamp rules,
            reward redemption, data handling and programme changes) will be
            published here before launch. Reward thresholds shown are
            configurable placeholders, not final commercial values.
          </p>
        </div>
      </section>
    </>
  );
}
