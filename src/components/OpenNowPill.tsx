"use client";

import { getOpenState } from "@/lib/hours";
import { useMinuteTick } from "@/lib/useMinuteTick";
import type { StoreLocation } from "@/lib/types";

/**
 * Live "Open now / Closed" pill. Derives from the minute tick on the
 * client so statically rendered pages never show a stale state.
 */
export default function OpenNowPill({ location }: { location: StoreLocation }) {
  const minute = useMinuteTick();
  const state = minute === null ? null : getOpenState(location);

  if (!state) {
    return (
      <span className="rounded-full bg-blue/8 px-3.5 py-1.5 text-sm font-semibold text-blue-ink/50">
        Checking hours…
      </span>
    );
  }

  if (state.open) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-olive/15 px-3.5 py-1.5 text-sm font-semibold text-olive-deep">
        <span className="size-2 rounded-full bg-olive" aria-hidden="true" />
        Open now · until {state.closesAt}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-coral/12 px-3.5 py-1.5 text-sm font-semibold text-coral-deep">
      <span className="size-2 rounded-full bg-coral" aria-hidden="true" />
      Closed · opens {state.opensNext}
    </span>
  );
}
