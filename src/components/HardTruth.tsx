interface HardTruthProps {
  truths: string[];
}

export default function HardTruth({ truths }: HardTruthProps) {
  if (truths.length === 0) return null;

  return (
    <div className="border border-accent/30 rounded-lg bg-accent-dim p-5 space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">
        Hard Truth
      </h3>
      {truths.map((truth, i) => (
        <p key={i} className="text-sm text-text-primary leading-relaxed">
          {truth}
        </p>
      ))}
    </div>
  );
}
