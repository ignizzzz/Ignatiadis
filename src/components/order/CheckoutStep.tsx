"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useBasket } from "@/context/BasketContext";
import { DELIVERY_FEE } from "@/components/order/BasketPanel";
import { mockOrderGateway } from "@/lib/order-service";
import type {
  FulfilmentMode,
  OrderConfirmation,
  StoreLocation,
} from "@/lib/types";

interface CheckoutStepProps {
  mode: FulfilmentMode;
  location: StoreLocation;
  postcode: string;
  onConfirmed(confirmation: OrderConfirmation): void;
  onBack(): void;
}

interface FieldErrors {
  name?: string;
  email?: string;
  addressLine?: string;
}

export default function CheckoutStep({
  mode,
  location,
  postcode,
  onConfirmed,
  onBack,
}: CheckoutStepProps) {
  const { lines, subtotal, clear } = useBasket();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [notes, setNotes] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [processing, setProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const total = subtotal + (mode === "delivery" ? DELIVERY_FEE : 0);

  function validate(): boolean {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "Tell us who to shout for.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "We need a valid email for your receipt.";
    if (mode === "delivery" && addressLine.trim().length < 4) {
      next.addressLine = "We need an address to deliver to.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    if (!validate() || processing) return;

    setProcessing(true);
    const result = await mockOrderGateway.submit({
      locationId: location.id,
      mode,
      lines: lines.map(({ id, productId, quantity, toppingIds, dipId }) => ({
        id,
        productId,
        quantity,
        toppingIds,
        dipId,
      })),
      details: { name, email, postcode, addressLine, notes },
      total,
      simulateFailure,
    });
    setProcessing(false);

    if (result.ok) {
      clear();
      onConfirmed(result.confirmation);
    } else {
      setSubmitError(result.error);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-[2rem] bg-cream-soft p-8 text-center">
        <p className="font-display text-2xl font-extrabold uppercase text-blue">
          Nothing to check out
        </p>
        <p className="mt-2 text-blue-ink/70">Your basket is empty — add a bite or two first.</p>
        <Button onClick={onBack} variant="blue" className="mt-6">
          Back to the menu
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={processing}>
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-blue">
        Your details
      </h2>

      <div className="mt-5 space-y-4 max-w-lg">
        <div>
          <label htmlFor="co-name" className="block font-semibold text-blue-ink">
            Name
          </label>
          <input
            id="co-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "co-name-error" : undefined}
            className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
          />
          {errors.name && (
            <p id="co-name-error" className="mt-1 text-sm text-coral-deep" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="co-email" className="block font-semibold text-blue-ink">
            Email
          </label>
          <input
            id="co-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "co-email-error" : undefined}
            className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
          />
          {errors.email && (
            <p id="co-email-error" className="mt-1 text-sm text-coral-deep" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {mode === "delivery" && (
          <div>
            <label htmlFor="co-address" className="block font-semibold text-blue-ink">
              Delivery address{" "}
              <span className="font-normal text-blue-ink/50">({postcode.toUpperCase()})</span>
            </label>
            <input
              id="co-address"
              type="text"
              autoComplete="street-address"
              placeholder="Flat, street and number"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              aria-invalid={Boolean(errors.addressLine)}
              aria-describedby={errors.addressLine ? "co-address-error" : undefined}
              className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 placeholder:text-blue-ink/40 focus:border-blue focus:outline-none"
            />
            {errors.addressLine && (
              <p id="co-address-error" className="mt-1 text-sm text-coral-deep" role="alert">
                {errors.addressLine}
              </p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="co-notes" className="block font-semibold text-blue-ink">
            Notes <span className="font-normal text-blue-ink/50">(optional)</span>
          </label>
          <textarea
            id="co-notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Extra napkins, ring the top bell…"
            className="mt-1.5 w-full resize-y rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 placeholder:text-blue-ink/40 focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Demo payment block */}
      <div className="mt-8 max-w-lg rounded-[2rem] bg-blue p-5 sm:p-6 text-cream">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-extrabold uppercase tracking-tight">
            Payment
          </h3>
          <span className="rounded-full bg-honey px-3 py-1 font-display text-xs font-bold uppercase text-blue-ink">
            Demo mode
          </span>
        </div>
        <p className="mt-2 text-sm text-cream/80">
          This is a design prototype — no real payment is taken and no card
          details are collected. Connect a payment provider through the
          <code className="mx-1 rounded bg-cream/15 px-1.5 py-0.5 text-xs">OrderGateway</code>
          adapter to go live.
        </p>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl bg-blue-deep px-4 py-3 text-sm">
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
            className="size-4 accent-[#f2b233]"
          />
          Simulate a declined payment (to preview the failure state)
        </label>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 max-w-lg rounded-2xl border-2 border-coral bg-coral/10 px-5 py-4 text-coral-deep"
        >
          <p className="font-display font-bold">Payment failed</p>
          <p className="mt-1 text-sm">{submitError}</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={onBack} variant="ghost" disabled={processing}>
          ← Back
        </Button>
        <Button type="submit" variant="honey" size="lg" disabled={processing}>
          {processing ? (
            <>
              <svg
                viewBox="0 0 24 24"
                className="size-5 animate-spin motion-reduce:animate-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" opacity="0.25" />
                <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
              </svg>
              Processing payment…
            </>
          ) : (
            <>Place order · {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(total / 100)}</>
          )}
        </Button>
      </div>
      <p className="mt-3 text-sm text-blue-ink/55" aria-live="polite">
        {processing ? "Hold tight — confirming your order with the store." : ""}
      </p>
    </form>
  );
}
