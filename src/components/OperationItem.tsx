"use client";

interface OperationItemProps {
  label: string;
  completed: boolean;
  onToggle: () => void;
}

export default function OperationItem({
  label,
  completed,
  onToggle,
}: OperationItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-md border transition-all text-left ${
        completed
          ? "border-success/20 bg-success-dim"
          : "border-border hover:border-border-strong bg-surface"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          completed ? "border-success bg-success" : "border-text-muted"
        }`}
      >
        {completed && (
          <svg
            className="w-3 h-3 text-bg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span
        className={`text-sm font-medium ${
          completed ? "text-success line-through" : "text-text-primary"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
