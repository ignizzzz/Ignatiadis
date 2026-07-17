# FETA POP — brand website

Consumer website for **FETA POP**, a fictional modern Greek sweet-and-salty
snack bar built around crispy phyllo-wrapped feta bites — launching in
London, expanding city by city.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 ·
Framer Motion**.

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Routes

| Route        | What's there                                                        |
| ------------ | ------------------------------------------------------------------- |
| `/`          | Hero, product story, top sellers, crunch moment, share box, store, loyalty, social, final CTA |
| `/menu`      | Full menu with flavour/diet filters and allergen dialog             |
| `/order`     | Pickup/delivery flow: location, browse, customize, basket, checkout (mock payment) |
| `/our-story` | Editorial brand story                                               |
| `/locations` | Soho flagship, mock map, city finder, coming-soon cities            |
| `/loyalty`   | POP Club: card visual, rewards, sign-up demo, FAQ                   |
| `/contact`   | Enquiry form (general, catering, press, careers, franchise…)        |

## Project shape

- `src/data/` — typed products, locations, loyalty config (single source of truth; prices/calories are placeholders)
- `src/lib/` — types, formatting, opening hours, `OrderGateway` mock adapter (swap for a real ordering/payments backend)
- `src/context/BasketContext.tsx` — basket state, persisted to `localStorage`
- `src/components/` — reusable brand components (Header, ProductCard, LoyaltyCard, AllergenModal…)
- `public/images/README.md` — organized photo slots; drop real photography in and the placeholder illustrations swap out automatically

## Notes

- **No real payments** — checkout runs through a typed mock gateway with
  success/failure states (there's a demo toggle to preview the declined
  path).
- The domain in `src/lib/site.ts` (`fetapop.example`) is a placeholder —
  set it before deploying.
- Reduced-motion preferences are respected across all animation.
