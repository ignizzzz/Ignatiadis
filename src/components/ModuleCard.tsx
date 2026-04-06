interface ModuleCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ModuleCard({
  title,
  subtitle,
  children,
  className = "",
}: ModuleCardProps) {
  return (
    <div
      className={`border border-border rounded-lg bg-surface p-5 ${className}`}
    >
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
