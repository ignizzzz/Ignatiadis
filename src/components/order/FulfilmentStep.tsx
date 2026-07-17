"use client";

import OpenNowPill from "@/components/OpenNowPill";
import Button from "@/components/Button";
import { LOCATIONS } from "@/data/locations";
import { cn } from "@/lib/cn";
import type { FulfilmentMode, StoreLocation } from "@/lib/types";

export type PostcodeStatus = "idle" | "checking" | "ok" | "unavailable";

interface FulfilmentStepProps {
  mode: FulfilmentMode;
  onModeChange(mode: FulfilmentMode): void;
  location: StoreLocation;
  onLocationChange(id: string): void;
  postcode: string;
  onPostcodeChange(value: string): void;
  postcodeStatus: PostcodeStatus;
  onCheckPostcode(): void;
  canContinue: boolean;
  onContinue(): void;
}

export default function FulfilmentStep({
  mode,
  onModeChange,
  location,
  onLocationChange,
  postcode,
  onPostcodeChange,
  postcodeStatus,
  onCheckPostcode,
  canContinue,
  onContinue,
}: FulfilmentStepProps) {
  return (
    <div>
      {/* Mode selector */}
      <fieldset>
        <legend className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
          How are we getting this to you?
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(
            [
              { id: "pickup", label: "Pickup", note: "Ready in 12–15 min" },
              { id: "delivery", label: "Delivery", note: "25–35 min, central London" },
            ] as const
          ).map((option) => (
            <label
              key={option.id}
              className={cn(
                "cursor-pointer rounded-3xl border-2 p-4 sm:p-5 transition-colors",
                mode === option.id
                  ? "border-blue bg-blue text-cream"
                  : "border-blue/15 bg-cream-soft text-blue hover:border-blue/40"
              )}
            >
              <input
                type="radio"
                name="fulfilment-mode"
                value={option.id}
                checked={mode === option.id}
                onChange={() => onModeChange(option.id)}
                className="sr-only"
              />
              <span className="block font-display text-xl font-extrabold">{option.label}</span>
              <span className={cn("mt-1 block text-sm", mode === option.id ? "text-cream/75" : "text-blue-ink/60")}>
                {option.note}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Location selector */}
      <fieldset className="mt-8">
        <legend className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral">
          Choose your store
        </legend>
        <div className="mt-3 space-y-3">
          {LOCATIONS.map((loc) => {
            const available = loc.status === "open";
            const selected = location.id === loc.id;
            return (
              <label
                key={loc.id}
                className={cn(
                  "flex items-center justify-between gap-4 rounded-3xl border-2 p-4 sm:p-5",
                  available
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-60",
                  selected
                    ? "border-blue bg-cream-soft"
                    : "border-blue/15 bg-cream-soft/50 hover:border-blue/40"
                )}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="location"
                    value={loc.id}
                    checked={selected}
                    disabled={!available}
                    onChange={() => onLocationChange(loc.id)}
                    className="size-4 accent-[#0d3b9c]"
                  />
                  <span>
                    <span className="block font-display font-bold text-blue">{loc.name}</span>
                    <span className="block text-sm text-blue-ink/60">
                      {available
                        ? loc.addressLines?.join(", ")
                        : `${loc.openingNote ?? "Coming soon"} — not taking orders yet`}
                    </span>
                  </span>
                </span>
                {available && <OpenNowPill location={loc} />}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Delivery postcode check */}
      {mode === "delivery" && (
        <div className="mt-8">
          <label
            htmlFor="postcode-check"
            className="font-display font-bold text-sm uppercase tracking-[0.18em] text-coral"
          >
            Where to?
          </label>
          <div className="mt-3 flex max-w-md gap-2">
            <input
              id="postcode-check"
              type="text"
              autoComplete="postal-code"
              placeholder="Postcode, e.g. W1F 0PP"
              value={postcode}
              onChange={(e) => onPostcodeChange(e.target.value)}
              className="w-full min-w-0 rounded-full border-2 border-blue/20 bg-cream px-5 py-3 text-blue-ink placeholder:text-blue-ink/40 focus:border-blue focus:outline-none"
            />
            <Button
              onClick={onCheckPostcode}
              variant="blue"
              disabled={postcodeStatus === "checking" || postcode.trim().length < 2}
            >
              {postcodeStatus === "checking" ? "Checking…" : "Check"}
            </Button>
          </div>
          <div className="mt-3 max-w-md" aria-live="polite">
            {postcodeStatus === "ok" && (
              <p className="rounded-2xl bg-olive/12 px-4 py-3 text-sm font-semibold text-olive-deep">
                You’re in the zone — delivery from {location.name} in 25–35 minutes.
              </p>
            )}
            {postcodeStatus === "unavailable" && (
              <div className="rounded-2xl bg-coral/12 px-4 py-3 text-sm text-coral-deep">
                <p className="font-semibold">
                  We don’t deliver there yet — we currently cover{" "}
                  {location.deliveryZones?.join(", ")}.
                </p>
                <button
                  type="button"
                  onClick={() => onModeChange("pickup")}
                  className="mt-1.5 font-semibold underline underline-offset-4"
                >
                  Switch to pickup instead
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Button onClick={onContinue} variant="honey" size="lg" disabled={!canContinue}>
          Continue to menu
        </Button>
        {mode === "delivery" && postcodeStatus !== "ok" && (
          <p className="mt-2 text-sm text-blue-ink/60">
            Check your postcode first so we know we can reach you.
          </p>
        )}
      </div>
    </div>
  );
}
