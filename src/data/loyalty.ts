import type { Faq, LoyaltyReward } from "@/lib/types";

/**
 * Loyalty programme configuration. Financial values are placeholders —
 * tune STAMPS_FOR_REWARD and reward copy before launch.
 */
export const LOYALTY_CONFIG = {
  programmeName: "POP Club",
  stampsForReward: 8,
  /** Mock state shown on the loyalty page demo card. */
  demoStamps: 5,
  demoMemberName: "Alex",
};

export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    title: "Free bite",
    detail: `Collect ${LOYALTY_CONFIG.stampsForReward} stamps, choose any signature bite on us.`,
  },
  {
    title: "Birthday surprise",
    detail: "Something sweet lands in your app during your birthday week.",
  },
  {
    title: "First taste",
    detail: "Try new flavours before they hit the menu boards.",
  },
  {
    title: "Member drops",
    detail: "Limited collabs and merch, members only.",
  },
];

export const LOYALTY_FAQS: Faq[] = [
  {
    question: "How do I earn stamps?",
    answer:
      "One stamp per qualifying order, in store or online. Scan your POP Club code at the counter or order signed in — the stamp lands automatically.",
  },
  {
    question: "Do stamps expire?",
    answer:
      "Stamps stay valid for 12 months from the day you earn them. We will nudge you before any expire — we want you to spend them.",
  },
  {
    question: "Can I use rewards with other offers?",
    answer:
      "One reward per order, and rewards cannot be combined with other promotions. Full details live in the programme terms.",
  },
  {
    question: "Is POP Club free?",
    answer: "Completely. Joining takes under a minute and costs nothing.",
  },
  {
    question: "What happens to my data?",
    answer:
      "We use your details to run the programme and, only if you opt in, to tell you about new flavours. You can close your account any time.",
  },
];
