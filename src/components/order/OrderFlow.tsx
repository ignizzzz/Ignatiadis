"use client";

import { useState } from "react";
import OpenNowPill from "@/components/OpenNowPill";
import BasketPanel from "@/components/order/BasketPanel";
import BrowseStep from "@/components/order/BrowseStep";
import CheckoutStep from "@/components/order/CheckoutStep";
import ConfirmationView from "@/components/order/ConfirmationView";
import FulfilmentStep, { type PostcodeStatus } from "@/components/order/FulfilmentStep";
import { useBasket } from "@/context/BasketContext";
import { FLAGSHIP, getLocation } from "@/data/locations";
import { getOpenState, isPostcodeDeliverable } from "@/lib/hours";
import { useMinuteTick } from "@/lib/useMinuteTick";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { FulfilmentMode, OrderConfirmation } from "@/lib/types";

type Step = "setup" | "browse" | "checkout" | "confirmed";

const STEPS: { id: Step; label: string }[] = [
  { id: "setup", label: "Pickup or delivery" },
  { id: "browse", label: "Choose your bites" },
  { id: "checkout", label: "Checkout" },
];

export default function OrderFlow() {
  const [step, setStep] = useState<Step>("setup");
  const [mode, setMode] = useState<FulfilmentMode>("pickup");
  const [locationId, setLocationId] = useState(FLAGSHIP.id);
  const [postcode, setPostcode] = useState("");
  const [postcodeStatus, setPostcodeStatus] = useState<PostcodeStatus>("idle");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const { itemCount, subtotal, ready } = useBasket();

  const location = getLocation(locationId) ?? FLAGSHIP;

  // Store-closed notice, derived from live London time on the client.
  const minute = useMinuteTick();
  const openState = minute === null ? null : getOpenState(location);
  const storeClosed = openState && !openState.open ? openState.opensNext : null;

  function onModeChange(next: FulfilmentMode) {
    setMode(next);
    if (next === "pickup") {
      setPostcodeStatus("idle");
    } else if (postcode.trim()) {
      setPostcodeStatus("idle");
    }
  }

  function checkPostcode() {
    setPostcodeStatus("checking");
    // Simulated zone lookup latency.
    setTimeout(() => {
      setPostcodeStatus(
        isPostcodeDeliverable(location, postcode) ? "ok" : "unavailable"
      );
    }, 700);
  }

  const canContinue = mode === "pickup" || postcodeStatus === "ok";
  const currentIndex = STEPS.findIndex((s) => s.id === step);

  if (step === "confirmed" && confirmation) {
    return (
      <ConfirmationView
        confirmation={confirmation}
        onNewOrder={() => {
          setConfirmation(null);
          setStep("browse");
        }}
      />
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <ol className="flex flex-wrap items-center gap-2 text-sm" aria-label="Order progress">
        {STEPS.map((s, i) => {
          const isCurrent = s.id === step;
          const isDone = i < currentIndex;
          return (
            <li key={s.id} className="flex items-center gap-2">
              {i > 0 && <span className="text-blue-ink/30" aria-hidden="true">→</span>}
              <button
                type="button"
                disabled={!isDone}
                onClick={() => isDone && setStep(s.id)}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display font-bold",
                  isCurrent && "bg-blue text-cream",
                  isDone && "bg-olive/15 text-olive-deep hover:bg-olive/25",
                  !isCurrent && !isDone && "bg-cream-soft text-blue-ink/40"
                )}
              >
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-xs",
                    isCurrent ? "bg-cream text-blue" : isDone ? "bg-olive text-cream" : "bg-blue-ink/10"
                  )}
                >
                  {isDone ? "✓" : i + 1}
                </span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Store closed notice */}
      {storeClosed && step !== "setup" && (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-honey-soft px-5 py-3.5 text-sm text-blue-ink">
          <OpenNowPill location={location} />
          <p>
            The store is closed right now — order ahead and we’ll have it fresh
            when we open {storeClosed}.
          </p>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        {/* min-w-0 lets the scrollable tab rail shrink inside the grid column */}
        <div className="min-w-0">
          {step === "setup" && (
            <FulfilmentStep
              mode={mode}
              onModeChange={onModeChange}
              location={location}
              onLocationChange={setLocationId}
              postcode={postcode}
              onPostcodeChange={(v) => {
                setPostcode(v);
                setPostcodeStatus("idle");
              }}
              postcodeStatus={postcodeStatus}
              onCheckPostcode={checkPostcode}
              canContinue={canContinue}
              onContinue={() => setStep("browse")}
            />
          )}

          {step === "browse" && <BrowseStep location={location} />}

          {step === "checkout" && (
            <CheckoutStep
              mode={mode}
              location={location}
              postcode={postcode}
              onBack={() => setStep("browse")}
              onConfirmed={(c) => {
                setConfirmation(c);
                setStep("confirmed");
              }}
            />
          )}
        </div>

        {/* Basket rail */}
        <aside
          id="basket"
          className={cn("min-w-0 lg:sticky lg:top-24 scroll-mt-24", step === "setup" && "hidden lg:block")}
          aria-label="Your basket"
        >
          <BasketPanel
            mode={mode}
            readOnly={step === "checkout"}
            onCheckout={step === "browse" ? () => setStep("checkout") : undefined}
          />
        </aside>
      </div>

      {/* Mobile sticky basket bar */}
      {ready && itemCount > 0 && step === "browse" && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-blue/10 bg-cream/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-xl items-center gap-3">
            <a
              href="#basket"
              className="flex-1 rounded-full border-2 border-blue px-5 py-3 text-center font-display font-bold text-blue"
            >
              View basket ({itemCount})
            </a>
            <button
              type="button"
              onClick={() => setStep("checkout")}
              className="flex-1 rounded-full bg-honey px-5 py-3.5 text-center font-display font-bold text-blue-ink active:scale-[0.97] motion-reduce:active:scale-100"
            >
              Checkout · {formatPrice(subtotal)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
