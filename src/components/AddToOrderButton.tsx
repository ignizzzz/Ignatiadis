"use client";

import { useEffect, useRef, useState } from "react";
import { useBasket } from "@/context/BasketContext";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

interface AddToOrderButtonProps {
  product: Product;
  className?: string;
  /** Compact icon-only version used on cards. */
  compact?: boolean;
  disabled?: boolean;
}

export default function AddToOrderButton({
  product,
  className,
  compact = false,
  disabled = false,
}: AddToOrderButtonProps) {
  const { addLine } = useBasket();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function onAdd() {
    addLine({ productId: product.id });
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={onAdd}
        disabled={disabled}
        aria-label={added ? `${product.name} added to order` : `Add ${product.name} to order`}
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full font-display text-xl font-bold transition-[background-color,transform] duration-200 active:scale-90 motion-reduce:active:scale-100 disabled:opacity-40 disabled:pointer-events-none",
          added ? "bg-olive text-cream" : "bg-blue text-cream hover:bg-blue-deep",
          className
        )}
      >
        {added ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display font-bold tracking-tight transition-[background-color,transform] duration-200 active:scale-[0.96] motion-reduce:active:scale-100 disabled:opacity-40 disabled:pointer-events-none",
        added ? "bg-olive text-cream" : "bg-blue text-cream hover:bg-blue-deep",
        className
      )}
    >
      {added ? "Added to order" : "Add to order"}
    </button>
  );
}
