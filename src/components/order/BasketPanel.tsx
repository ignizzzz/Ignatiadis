"use client";

import Button from "@/components/Button";
import { useBasket } from "@/context/BasketContext";
import { formatPrice } from "@/lib/format";
import type { FulfilmentMode } from "@/lib/types";

export const DELIVERY_FEE = 250; // pence — placeholder

interface BasketPanelProps {
  mode: FulfilmentMode;
  onCheckout?: () => void;
  /** Hide the checkout button (e.g. while already on checkout step). */
  readOnly?: boolean;
}

export default function BasketPanel({ mode, onCheckout, readOnly = false }: BasketPanelProps) {
  const { lines, subtotal, itemCount, ready, updateQuantity, removeLine } = useBasket();
  const deliveryFee = mode === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  if (!ready) {
    return (
      <div className="rounded-[2rem] bg-cream-soft p-6" aria-busy="true">
        <div className="h-5 w-28 animate-pulse rounded-full bg-blue/10" />
        <div className="mt-4 space-y-3">
          <div className="h-14 animate-pulse rounded-2xl bg-blue/8" />
          <div className="h-14 animate-pulse rounded-2xl bg-blue/8" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-[2rem] bg-cream-soft p-8 text-center">
        <p className="font-display text-2xl font-extrabold uppercase text-blue">
          Basket empty
        </p>
        <p className="mt-2 text-blue-ink/70">
          It won’t stay that way for long. Start with The Classic.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] bg-cream-soft p-5 sm:p-6">
      <h2 className="flex items-baseline justify-between font-display text-xl font-extrabold uppercase tracking-tight text-blue">
        Your order
        <span className="text-sm font-bold text-blue-ink/50">
          {itemCount} item{itemCount === 1 ? "" : "s"}
        </span>
      </h2>

      <ul className="mt-4 space-y-4">
        {lines.map((line) => (
          <li key={line.id} className="rounded-2xl bg-cream p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display font-bold text-blue leading-tight">
                  {line.product.name}
                </p>
                {(line.toppings.length > 0 || line.dip) && (
                  <p className="mt-1 text-xs text-blue-ink/60">
                    {[...line.toppings.map((t) => t.name), line.dip ? `${line.dip.name}` : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </div>
              <p className="font-display font-bold text-blue-ink tabular-nums">
                {formatPrice(line.lineTotal)}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="inline-flex items-center rounded-full border border-blue/15">
                <button
                  type="button"
                  onClick={() => updateQuantity(line.id, line.quantity - 1)}
                  aria-label={`Reduce quantity of ${line.product.name}`}
                  className="flex size-9 items-center justify-center rounded-full text-blue hover:bg-blue/8 font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center font-display font-bold tabular-nums" aria-live="polite">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(line.id, line.quantity + 1)}
                  aria-label={`Increase quantity of ${line.product.name}`}
                  className="flex size-9 items-center justify-center rounded-full text-blue hover:bg-blue/8 font-bold"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeLine(line.id)}
                className="text-sm font-semibold text-coral-deep underline underline-offset-4 hover:text-coral"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-1.5 border-t border-blue/10 pt-4 text-blue-ink/80">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        {mode === "delivery" && (
          <div className="flex justify-between">
            <dt>Delivery</dt>
            <dd className="tabular-nums">{formatPrice(deliveryFee)}</dd>
          </div>
        )}
        <div className="flex justify-between pt-1 font-display text-lg font-extrabold text-blue">
          <dt>Total</dt>
          <dd className="tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>

      {!readOnly && onCheckout && (
        <Button onClick={onCheckout} variant="honey" className="mt-5 w-full">
          Go to checkout
        </Button>
      )}
    </div>
  );
}
