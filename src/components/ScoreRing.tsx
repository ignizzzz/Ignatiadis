"use client";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ScoreRing({
  score,
  size = 80,
  strokeWidth = 4,
  label,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80
      ? "var(--color-success)"
      : score >= 50
        ? "var(--color-accent)"
        : "var(--color-danger)";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-semibold tabular-nums"
            style={{
              fontSize: size * 0.25,
              color,
            }}
          >
            {score}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-[11px] text-text-secondary font-medium uppercase tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
}
