/** Central site configuration. Swap the domain before launch. */
export const SITE = {
  name: "FETA POP",
  tagline: "Crunch outside. Ooze inside.",
  description:
    "Crispy phyllo-wrapped Greek feta bites with real Greek honey. Modern Greek snacking, made in London.",
  url: "https://fetapop.example",
  instagram: "https://instagram.com/fetapop",
  tiktok: "https://tiktok.com/@fetapop",
  email: "hello@fetapop.example",
};

export const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our Story" },
  { href: "/locations", label: "Locations" },
  { href: "/loyalty", label: "Loyalty" },
] as const;

export const FOOTER_LINK_GROUPS = [
  {
    title: "Eat",
    links: [
      { href: "/menu", label: "Menu" },
      { href: "/order", label: "Order" },
      { href: "/menu#allergens", label: "Allergen information" },
    ],
  },
  {
    title: "Visit",
    links: [
      { href: "/locations", label: "Locations" },
      { href: "/our-story", label: "Our story" },
      { href: "/loyalty", label: "POP Club" },
    ],
  },
  {
    title: "Talk",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/contact?topic=careers", label: "Careers" },
      { href: "/contact?topic=franchise", label: "Franchise" },
      { href: "/contact?topic=press", label: "Press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Privacy" },
      { href: "/contact", label: "Terms" },
    ],
  },
] as const;
