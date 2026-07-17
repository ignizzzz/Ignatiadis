"use client";

import { useRef } from "react";
import { ALLERGEN_LABELS, CATEGORIES, PRODUCTS } from "@/data/menu";
import { cn } from "@/lib/cn";

/**
 * Accessible allergen information dialog. Uses the native <dialog>
 * element for focus trapping and Escape handling.
 */
export default function AllergenModal({ triggerClassName }: { triggerClassName?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border-2 border-blue px-5 py-2.5 font-display font-bold text-blue transition-colors hover:bg-blue hover:text-cream",
          triggerClassName
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
        </svg>
        Allergen information
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="allergen-dialog-title"
        className="m-auto w-[min(94vw,44rem)] max-h-[85vh] overflow-hidden rounded-[2rem] bg-cream p-0 text-blue-ink shadow-lift backdrop:bg-blue-ink/60 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          // Close on backdrop click.
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex max-h-[85vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-blue/10 p-6">
            <div>
              <h2 id="allergen-dialog-title" className="font-display text-3xl font-extrabold uppercase tracking-tight text-blue">
                Allergens
              </h2>
              <p className="mt-1 text-sm text-blue-ink/70 max-w-md">
                Every bite is made with real feta (milk) and phyllo (gluten) in
                a kitchen that handles sesame and nuts. Ask our team in store
                before ordering if you have an allergy.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close allergen information"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-blue hover:bg-blue/8"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto p-6">
            {CATEGORIES.map((category) => {
              const items = PRODUCTS.filter((p) => p.category === category.id);
              if (items.length === 0) return null;
              return (
                <section key={category.id} className="mb-6 last:mb-0">
                  <h3 className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
                    {category.name}
                  </h3>
                  <ul className="mt-2 divide-y divide-blue/8">
                    {items.map((p) => (
                      <li key={p.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
                        <span className="font-semibold">{p.name}</span>
                        <span className="text-sm text-blue-ink/70">
                          {p.allergens.length > 0
                            ? p.allergens.map((a) => ALLERGEN_LABELS[a]).join(", ")
                            : "No major allergens"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
            <p className="mt-4 rounded-2xl bg-honey-soft/60 p-4 text-sm text-blue-ink/80">
              This list covers the 14 major allergens where present. Recipes
              change with the seasons — always check with the team for the
              latest information. This is general guidance, not medical advice.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
