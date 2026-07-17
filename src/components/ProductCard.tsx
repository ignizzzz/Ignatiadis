import AddToOrderButton from "@/components/AddToOrderButton";
import BrandedBadge from "@/components/BrandedBadge";
import IngredientBadge from "@/components/IngredientBadge";
import ProductImage from "@/components/ProductImage";
import { cn } from "@/lib/cn";
import { formatCalories, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Show the "sold out" treatment (used with location context). */
  soldOut?: boolean;
}

/**
 * Food-led product card: big visual, typography on the page background —
 * intentionally not a boxed white e-commerce card.
 */
export default function ProductCard({ product, className, soldOut = false }: ProductCardProps) {
  return (
    <article className={cn("group flex flex-col", className)}>
      <div className="relative">
        <ProductImage
          product={product}
          className="aspect-square rounded-[2rem] transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {product.badge && !soldOut ? (
          <BrandedBadge
            tone={product.accent === "coral" ? "coral" : product.accent === "olive" ? "olive" : "honey"}
            tilt={-3}
            className="absolute left-4 top-4"
          >
            {product.badge}
          </BrandedBadge>
        ) : null}
        {soldOut ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-[2rem] bg-blue-ink/55">
            <BrandedBadge tone="cream" tilt={-4} className="text-base">
              Sold out today
            </BrandedBadge>
          </div>
        ) : null}

        {/* Ingredient reveal on hover / keyboard focus */}
        {product.ingredients && !soldOut ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-3xl bg-cream/95 p-3 opacity-0 shadow-pop backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
          >
            <p className="flex flex-wrap gap-1.5">
              {product.ingredients.map((ing) => (
                <IngredientBadge key={ing}>{ing}</IngredientBadge>
              ))}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-blue">
            {product.name}
          </h3>
          <p className="font-display text-xl font-bold text-blue-ink tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="mt-1 text-blue-ink/70 leading-snug">{product.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          {product.vegetarian && (
            <span className="inline-flex items-center rounded-full bg-olive/12 px-2.5 py-1 font-semibold text-olive-deep leading-none">
              V — vegetarian
            </span>
          )}
          {product.containsNuts && (
            <span className="inline-flex items-center rounded-full bg-coral/12 px-2.5 py-1 font-semibold text-coral-deep leading-none">
              Contains nuts
            </span>
          )}
          {formatCalories(product.calories) && (
            <span className="inline-flex items-center rounded-full bg-blue/8 px-2.5 py-1 font-semibold text-blue-ink/60 leading-none">
              {formatCalories(product.calories)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <AddToOrderButton product={product} disabled={soldOut} className="flex-1 sm:flex-none" />
        </div>
      </div>
    </article>
  );
}
