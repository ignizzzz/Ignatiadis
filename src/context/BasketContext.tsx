"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getProduct, getTopping } from "@/data/menu";
import type { BasketLine, PricedBasketLine } from "@/lib/types";

const STORAGE_KEY = "fetapop.basket.v1";

interface BasketContextValue {
  lines: PricedBasketLine[];
  itemCount: number;
  subtotal: number;
  /** True once the basket has been restored from storage (avoids hydration flicker). */
  ready: boolean;
  addLine(input: {
    productId: string;
    quantity?: number;
    toppingIds?: string[];
    dipId?: string;
  }): void;
  updateQuantity(lineId: string, quantity: number): void;
  removeLine(lineId: string): void;
  clear(): void;
  /** Incremented every time something is added — drives the header badge pop. */
  addPulse: number;
}

const BasketContext = createContext<BasketContextValue | null>(null);

function lineKey(productId: string, toppingIds: string[], dipId?: string): string {
  return [productId, [...toppingIds].sort().join("+"), dipId ?? ""].join("|");
}

function priceLine(line: BasketLine): PricedBasketLine | null {
  const product = getProduct(line.productId);
  if (!product) return null;
  const toppings = line.toppingIds
    .map((id) => getTopping(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const dip = line.dipId ? getProduct(line.dipId) : undefined;
  const unitPrice =
    product.price +
    toppings.reduce((sum, t) => sum + t.price, 0) +
    (dip?.price ?? 0);
  return {
    ...line,
    product,
    toppings,
    dip,
    unitPrice,
    lineTotal: unitPrice * line.quantity,
  };
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [rawLines, setRawLines] = useState<BasketLine[]>([]);
  const [ready, setReady] = useState(false);
  const [addPulse, setAddPulse] = useState(0);
  const hydrated = useRef(false);

  // One-time restore from localStorage. Deliberately runs post-hydration
  // (server markup can't know the stored basket), so the setState here is
  // the standard hydration-safe pattern rather than a cascading render.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: BasketLine[] = JSON.parse(stored);
        // Drop lines pointing to products that no longer exist.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRawLines(parsed.filter((l) => getProduct(l.productId)));
      }
    } catch {
      // Corrupt storage — start fresh.
    }
    hydrated.current = true;
    setReady(true);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawLines));
    } catch {
      // Storage unavailable (private mode etc.) — basket still works in memory.
    }
  }, [rawLines]);

  const addLine = useCallback(
    (input: {
      productId: string;
      quantity?: number;
      toppingIds?: string[];
      dipId?: string;
    }) => {
      const toppingIds = input.toppingIds ?? [];
      const id = lineKey(input.productId, toppingIds, input.dipId);
      const quantity = input.quantity ?? 1;
      setRawLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) =>
            l.id === id ? { ...l, quantity: Math.min(l.quantity + quantity, 20) } : l
          );
        }
        return [
          ...prev,
          { id, productId: input.productId, quantity, toppingIds, dipId: input.dipId },
        ];
      });
      setAddPulse((p) => p + 1);
    },
    []
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setRawLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== lineId)
        : prev.map((l) =>
            l.id === lineId ? { ...l, quantity: Math.min(quantity, 20) } : l
          )
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setRawLines((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const clear = useCallback(() => setRawLines([]), []);

  const value = useMemo<BasketContextValue>(() => {
    const lines = rawLines
      .map(priceLine)
      .filter((l): l is PricedBasketLine => Boolean(l));
    return {
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.lineTotal, 0),
      ready,
      addLine,
      updateQuantity,
      removeLine,
      clear,
      addPulse,
    };
  }, [rawLines, ready, addLine, updateQuantity, removeLine, clear, addPulse]);

  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket(): BasketContextValue {
  const ctx = useContext(BasketContext);
  if (!ctx) {
    throw new Error("useBasket must be used inside <BasketProvider>");
  }
  return ctx;
}
