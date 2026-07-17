"use client";

import { useEffect, useRef, useState } from "react";
import ProductImage from "@/components/ProductImage";
import { useBasket } from "@/context/BasketContext";
import { DIPS, TOPPINGS } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

interface OrderItemSheetProps {
  product: Product | null;
  onClose(): void;
}

/**
 * Customize-and-add sheet. Renders as a modal dialog (bottom-sheet style
 * on small screens) using the native <dialog> element. The inner content
 * is keyed by product id so quantity/topping state resets per product.
 */
export default function OrderItemSheet({ product, onClose }: OrderItemSheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync the native dialog with the selected product (DOM-only effect).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) {
      dialog.showModal();
    } else if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="order-sheet-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="m-auto mb-0 sm:mb-auto w-full sm:w-[min(94vw,30rem)] max-h-[92vh] rounded-t-[2rem] sm:rounded-[2rem] bg-cream p-0 text-blue-ink shadow-lift backdrop:bg-blue-ink/60 backdrop:backdrop-blur-sm"
    >
      {product && (
        <SheetContent
          key={product.id}
          product={product}
          onRequestClose={() => dialogRef.current?.close()}
        />
      )}
    </dialog>
  );
}

function SheetContent({
  product,
  onRequestClose,
}: {
  product: Product;
  onRequestClose(): void;
}) {
  const { addLine } = useBasket();
  const [quantity, setQuantity] = useState(1);
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [dipId, setDipId] = useState<string | undefined>(undefined);

  const toppingsTotal = toppingIds.reduce(
    (sum, id) => sum + (TOPPINGS.find((t) => t.id === id)?.price ?? 0),
    0
  );
  const dipPrice = dipId ? DIPS.find((d) => d.id === dipId)?.price ?? 0 : 0;
  const unitTotal = product.price + toppingsTotal + dipPrice;

  const toggleTopping = (id: string) =>
    setToppingIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );

  return (
    <div className="flex max-h-[92vh] flex-col">
      <div className="relative">
        <ProductImage product={product} className="h-44 w-full rounded-t-[2rem]" />
        <button
          type="button"
          onClick={onRequestClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full bg-cream/90 text-blue shadow-pop hover:bg-cream"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        <h2 id="order-sheet-title" className="font-display text-2xl font-extrabold tracking-tight text-blue">
          {product.name}
        </h2>
        <p className="mt-1 text-sm text-blue-ink/70">{product.description}</p>

        {product.customizable && (
          <>
            <fieldset className="mt-5">
              <legend className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
                Extra toppings
              </legend>
              <div className="mt-2 space-y-1.5">
                {TOPPINGS.map((topping) => (
                  <label
                    key={topping.id}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-cream-soft px-3.5 py-2.5 has-checked:bg-honey-soft"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={toppingIds.includes(topping.id)}
                        onChange={() => toggleTopping(topping.id)}
                        className="size-4 accent-[#0d3b9c]"
                      />
                      <span className="text-sm font-medium">
                        {topping.name}
                        {topping.containsNuts && (
                          <span className="ml-1.5 text-xs text-coral-deep">(nuts)</span>
                        )}
                      </span>
                    </span>
                    <span className="text-sm tabular-nums text-blue-ink/60">
                      +{formatPrice(topping.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-5">
              <legend className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
                Add a dip
              </legend>
              <div className="mt-2 space-y-1.5">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-cream-soft px-3.5 py-2.5 has-checked:bg-honey-soft">
                  <input
                    type="radio"
                    name="dip"
                    checked={dipId === undefined}
                    onChange={() => setDipId(undefined)}
                    className="size-4 accent-[#0d3b9c]"
                  />
                  <span className="text-sm font-medium">No dip</span>
                </label>
                {DIPS.map((dip) => (
                  <label
                    key={dip.id}
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-cream-soft px-3.5 py-2.5 has-checked:bg-honey-soft"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="dip"
                        checked={dipId === dip.id}
                        onChange={() => setDipId(dip.id)}
                        className="size-4 accent-[#0d3b9c]"
                      />
                      <span className="text-sm font-medium">{dip.name}</span>
                    </span>
                    <span className="text-sm tabular-nums text-blue-ink/60">
                      +{formatPrice(dip.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}
      </div>

      <div className="border-t border-blue/10 p-5 sm:p-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center rounded-full border-2 border-blue/15">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Reduce quantity"
              className="flex size-11 items-center justify-center rounded-full text-blue hover:bg-blue/8 text-xl font-bold"
            >
              −
            </button>
            <span className="w-10 text-center font-display text-lg font-bold tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Increase quantity"
              className="flex size-11 items-center justify-center rounded-full text-blue hover:bg-blue/8 text-xl font-bold"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              addLine({ productId: product.id, quantity, toppingIds, dipId });
              onRequestClose();
            }}
            className="flex-1 rounded-full bg-blue px-6 py-3.5 font-display font-bold text-cream transition-[background-color,transform] hover:bg-blue-deep active:scale-[0.97] motion-reduce:active:scale-100"
          >
            Add {quantity} · {formatPrice(unitTotal * quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}
