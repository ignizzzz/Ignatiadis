"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import MenuFilter, { type FilterId } from "@/components/menu/MenuFilter";
import { CATEGORIES, PRODUCTS } from "@/data/menu";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

function matchesFilters(product: Product, active: Set<FilterId>): boolean {
  if (active.size === 0) return true;

  const flavourFilters = (["sweet", "spicy", "savoury"] as const).filter((f) =>
    active.has(f)
  );
  if (flavourFilters.length > 0 && !flavourFilters.some((f) => product.flavours.includes(f))) {
    return false;
  }
  if (active.has("vegetarian") && !product.vegetarian) return false;
  if (active.has("nuts") && !product.containsNuts) return false;
  return true;
}

export default function MenuExplorer() {
  const [active, setActive] = useState<Set<FilterId>>(new Set());

  const toggle = (id: FilterId) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const sections = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        products: PRODUCTS.filter(
          (p) => p.category === category.id && matchesFilters(p, active)
        ),
      })),
    [active]
  );

  const totalMatches = sections.reduce((sum, s) => sum + s.products.length, 0);
  const visibleSections = sections.filter((s) => s.products.length > 0);

  return (
    <div>
      {/* Sticky category rail + filters */}
      <div className="sticky top-16 sm:top-[4.5rem] z-30 -mx-4 border-b border-blue/10 bg-cream/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <nav aria-label="Menu categories" className="overflow-x-auto">
          <ul className="flex w-max gap-2 pb-1">
            {visibleSections.map(({ category }) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="block whitespace-nowrap rounded-full border border-blue/20 px-4 py-1.5 font-display font-bold text-sm text-blue hover:bg-blue hover:text-cream transition-colors"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-2">
          <MenuFilter active={active} onToggle={toggle} onClear={() => setActive(new Set())} />
        </div>
      </div>

      {/* Result count for assistive tech + visible feedback when filtering */}
      <p
        className={cn("mt-6 text-sm text-blue-ink/60", active.size === 0 && "sr-only")}
        role="status"
      >
        {totalMatches} item{totalMatches === 1 ? "" : "s"} match your filters.
      </p>

      {totalMatches === 0 ? (
        <div className="mx-auto max-w-md py-20 text-center">
          <p className="font-display text-3xl font-extrabold uppercase text-blue">
            Nothing matches that mix
          </p>
          <p className="mt-3 text-blue-ink/70">
            Try fewer filters — or trust us and start with The Classic.
          </p>
          <button
            type="button"
            onClick={() => setActive(new Set())}
            className="mt-6 rounded-full bg-blue px-6 py-3 font-display font-bold text-cream hover:bg-blue-deep"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        visibleSections.map(({ category, products }) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className="scroll-mt-40 py-10 sm:py-14"
          >
            <div className="max-w-2xl">
              <h2
                id={`${category.id}-heading`}
                className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-blue"
              >
                {category.name}
              </h2>
              <p className="mt-2 text-blue-ink/70">{category.blurb}</p>
            </div>
            <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
