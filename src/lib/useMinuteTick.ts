"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void): () => void {
  const id = setInterval(onStoreChange, 60_000);
  return () => clearInterval(id);
}

/**
 * Current minute (epoch minutes), or null on the server / during
 * hydration. Lets components derive live time-based UI (open/closed
 * state) without setState-in-effect or hydration mismatches.
 */
export function useMinuteTick(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 60_000),
    () => null
  );
}
