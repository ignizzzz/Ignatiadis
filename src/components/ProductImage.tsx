import Image from "next/image";
import BiteVisual from "@/components/BiteVisual";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

const ACCENT_BG: Record<Product["accent"], string> = {
  honey: "bg-[radial-gradient(120%_120%_at_30%_20%,#fff3d6_0%,#fbdfa4_100%)]",
  coral: "bg-[radial-gradient(120%_120%_at_30%_20%,#ffe9e2_0%,#ffcdc2_100%)]",
  olive: "bg-[radial-gradient(120%_120%_at_30%_20%,#f0f3e0_0%,#dde5c0_100%)]",
  blue: "bg-[radial-gradient(120%_120%_at_30%_20%,#e8eefb_0%,#c9d8f5_100%)]",
};

interface ProductImageProps {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Product visual slot. Renders the real photograph when `product.photo`
 * is set (drop files into /public/images/products/), otherwise the
 * branded placeholder illustration. See public/images/README.md.
 */
export default function ProductImage({
  product,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority,
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !product.photo && ACCENT_BG[product.accent],
        className
      )}
    >
      {product.photo ? (
        <Image
          src={product.photo}
          alt={product.imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <BiteVisual
            category={product.category}
            accent={product.accent}
            className="absolute inset-0 size-full p-[6%]"
          />
          <span className="sr-only">{product.imageAlt}</span>
        </>
      )}
    </div>
  );
}
