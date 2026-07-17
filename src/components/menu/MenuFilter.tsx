"use client";

import { cn } from "@/lib/cn";

export type FilterId = "sweet" | "spicy" | "savoury" | "vegetarian" | "nuts";

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "sweet", label: "Sweet" },
  { id: "spicy", label: "Spicy" },
  { id: "savoury", label: "Savoury" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "nuts", label: "Contains nuts" },
];

interface MenuFilterProps {
  active: Set<FilterId>;
  onToggle(id: FilterId): void;
  onClear(): void;
}

export default function MenuFilter({ active, onToggle, onClear }: MenuFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter the menu">
      {FILTERS.map((filter) => {
        const isActive = active.has(filter.id);
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onToggle(filter.id)}
            className={cn(
              "rounded-full px-4 py-2 font-display font-bold text-sm transition-colors",
              isActive
                ? "bg-blue text-cream"
                : "bg-cream-soft text-blue hover:bg-cream-deep"
            )}
          >
            {filter.label}
          </button>
        );
      })}
      {active.size > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-full px-3 py-2 text-sm font-semibold text-coral-deep underline underline-offset-4 hover:text-coral"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
