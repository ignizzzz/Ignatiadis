"use client";

import Button from "@/components/Button";
import PopFlower from "@/components/PopFlower";
import { getLocation } from "@/data/locations";
import { formatPrice } from "@/lib/format";
import type { OrderConfirmation } from "@/lib/types";

interface ConfirmationViewProps {
  confirmation: OrderConfirmation;
  onNewOrder(): void;
}

export default function ConfirmationView({ confirmation, onNewOrder }: ConfirmationViewProps) {
  const location = getLocation(confirmation.locationId);

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2.5rem] bg-blue p-8 sm:p-12 text-center text-cream shadow-lift">
      <PopFlower className="absolute -left-8 -top-8 size-28 opacity-30" />
      <PopFlower className="absolute -bottom-10 -right-8 size-36 opacity-30" />

      <div className="relative">
        <p className="font-hand text-3xl text-honey">popped it!</p>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight">
          Order confirmed
        </h2>

        <p className="mx-auto mt-5 max-w-sm text-cream/85">
          {confirmation.mode === "pickup" ? (
            <>
              Ready for pickup at <strong>{location?.name}</strong> in about{" "}
              <strong>{confirmation.eta}</strong>. Listen for your name.
            </>
          ) : (
            <>
              On its way from <strong>{location?.name}</strong> in about{" "}
              <strong>{confirmation.eta}</strong>. Keep your phone close.
            </>
          )}
        </p>

        <dl className="mx-auto mt-8 max-w-xs space-y-2 rounded-3xl bg-blue-deep p-5 text-left">
          <div className="flex justify-between">
            <dt className="text-cream/70">Reference</dt>
            <dd className="font-display font-bold tracking-wide">{confirmation.reference}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cream/70">Total paid</dt>
            <dd className="font-display font-bold tabular-nums">
              {formatPrice(confirmation.total)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cream/70">Fulfilment</dt>
            <dd className="font-display font-bold capitalize">{confirmation.mode}</dd>
          </div>
        </dl>

        <p className="mt-4 text-xs text-cream/60">
          Demo order — nothing was charged. A real confirmation email would land here.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={onNewOrder} variant="honey">
            Order something else
          </Button>
          <Button href="/loyalty" variant="outline-cream">
            Collect POP Club stamps
          </Button>
        </div>
      </div>
    </div>
  );
}
