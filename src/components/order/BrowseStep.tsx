"use client";

import { useState } from "react";
import ProductImage from "@/components/ProductImage";
import OrderItemSheet from "@/components/order/OrderItemSheet";
import { useBasket } from "@/context/BasketContext";
import { CATEGORIES, PRODUCTS } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { CategoryId, Product, StoreLocation } from "@/lib/types";

interface BrowseStepProps {
  location: StoreLocation;
}

export default function BrowseStep({ location }: BrowseStepProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("signature");
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const { addLine } = useBasket();

  const products = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Category tabs */}
      <div role="tablist" aria-label="Menu categories" className="-mx-1 overflow-x-auto px-1">
        <div className="flex w-max gap-2 pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              role="tab"
              aria-selected={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 font-display font-bold text-sm transition-colors",
                activeCategory === category.id
                  ? "bg-blue text-cream"
                  : "bg-cream-soft text-blue hover:bg-cream-deep"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product rows */}
      <ul className="mt-4 space-y-3">
        {products.map((product) => {
          const soldOut = product.soldOutAt?.includes(location.id) ?? false;
          return (
            <li
              key={product.id}
              className={cn(
                "flex items-center gap-4 rounded-3xl bg-cream-soft p-3 sm:p-4",
                soldOut && "opacity-60"
              )}
            >
              <ProductImage
                product={product}
                className="size-20 sm:size-24 shrink-0 rounded-2xl"
                sizes="96px"
              />
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-blue leading-tight">
                  {product.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-sm text-blue-ink/65">
                  {product.description}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-blue-ink/55">
                  <span className="font-semibold tabular-nums text-blue-ink/80">
                    {formatPrice(product.price)}
                  </span>
                  {product.vegetarian && <span>V</span>}
                  {product.containsNuts && <span className="text-coral-deep">nuts</span>}
                  {product.calories !== undefined && <span>{product.calories} kcal</span>}
                </p>
              </div>
              {soldOut ? (
                <span className="shrink-0 rounded-full bg-blue-ink/10 px-3.5 py-2 font-display text-sm font-bold text-blue-ink/60">
                  Sold out
                </span>
              ) : product.customizable ? (
                <button
                  type="button"
                  onClick={() => setSheetProduct(product)}
                  className="shrink-0 rounded-full bg-blue px-4 py-2.5 font-display text-sm font-bold text-cream transition-[background-color,transform] hover:bg-blue-deep active:scale-95 motion-reduce:active:scale-100"
                >
                  Customize
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => addLine({ productId: product.id })}
                  className="shrink-0 rounded-full bg-blue px-4 py-2.5 font-display text-sm font-bold text-cream transition-[background-color,transform] hover:bg-blue-deep active:scale-95 motion-reduce:active:scale-100"
                >
                  Add
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {location.menuNotes && (
        <p className="mt-4 text-sm text-blue-ink/55">{location.menuNotes}</p>
      )}

      <OrderItemSheet product={sheetProduct} onClose={() => setSheetProduct(null)} />
    </div>
  );
}
