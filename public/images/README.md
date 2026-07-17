# FETA POP image assets

The site currently renders branded placeholder illustrations everywhere a
photograph belongs. To swap in real photography, drop files here and set
the matching `photo` field in `src/data/menu.ts` (products) — the UI
switches to `next/image` automatically.

## Expected files

### Products — `/public/images/products/`

One square image (≥ 1200×1200) per product id:

- `the-classic.jpg`
- `pistachio-pop.jpg`
- `greek-garden.jpg`
- `mini-bites.jpg`
- `hot-honey.jpg`
- `chilli-feta.jpg`
- `seasonal-pop.jpg`
- `zaatar-crunch.jpg`
- `lemon-herb.jpg`
- `olive-grove.jpg`
- `share-box.jpg`
- `party-box.jpg`
- `phyllo-crisps.jpg`
- `greek-salad-cup.jpg`
- `olive-cup.jpg`
- `greek-yoghurt-dip.jpg`
- `spicy-feta-dip.jpg`
- `lemon-herb-dip.jpg`
- `honey-pot.jpg`
- `lemonada.jpg`
- `sour-cherry-spritz.jpg`
- `freddo-espresso.jpg`
- `sparkling-water.jpg`

### Editorial — `/public/images/editorial/`

- `hero-macro.jpg` — macro bite with honey pour (≥ 2000px wide)
- `crunch-macro.jpg` — extreme phyllo close-up
- `share-box-overhead.jpg` — overhead share box on table
- `storefront.jpg` — blue Soho storefront
- `counter.jpg` — warm wood counter + open prep
- `hands-city.jpg` — hands holding takeaway packaging in the city

### Social — `/public/images/social/`

Six square lifestyle/campaign crops, any names — wire them up in
`src/components/SocialGrid.tsx`.

## Photography direction

Crisp golden phyllo, visible feta centre, glossy honey, sesame and herbs,
warm surfaces, branded blue packaging, human hands, urban takeaway
moments. Mix macro product, overhead boxes, storefront and preparation
details. Avoid isolated cutouts on pure white.
