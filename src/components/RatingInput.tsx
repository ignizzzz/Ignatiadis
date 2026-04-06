"use client";

import { Rating } from "@/lib/types";

interface RatingInputProps {
  value: Rating;
  onChange: (value: Rating) => void;
  label: string;
}

export default function RatingInput({
  value,
  onChange,
  label,
}: RatingInputProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex gap-1.5">
        {([1, 2, 3, 4, 5] as Rating[]).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded text-xs font-medium transition-all ${
              n <= value
                ? "bg-accent text-bg"
                : "bg-surface-hover text-text-muted hover:bg-border-strong"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
