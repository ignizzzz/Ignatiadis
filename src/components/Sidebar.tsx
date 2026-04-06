"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "grid" },
  { href: "/identity", label: "Identity", icon: "shield" },
  { href: "/physical", label: "Physical", icon: "zap" },
  { href: "/mental", label: "Mental", icon: "brain" },
  { href: "/growth", label: "Growth", icon: "trending" },
  { href: "/presence", label: "Presence", icon: "eye" },
  { href: "/review", label: "Review", icon: "bar" },
  { href: "/history", label: "History", icon: "clock" },
];

function NavIcon({ icon }: { icon: string }) {
  const cls = "w-4 h-4 stroke-current";
  switch (icon) {
    case "grid":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <path d="M12 2l8 4v6c0 5.25-3.5 8.25-8 10-4.5-1.75-8-4.75-8-10V6l8-4z" />
        </svg>
      );
    case "zap":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "brain":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <path d="M12 2a7 7 0 00-7 7c0 3 1.5 5 4 6.5V22h6v-6.5c2.5-1.5 4-3.5 4-6.5a7 7 0 00-7-7z" />
          <path d="M9 18h6M10 22h4" />
        </svg>
      );
    case "trending":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <path d="M22 7l-8.5 8.5-5-5L2 17" />
          <path d="M16 7h6v6" />
        </svg>
      );
    case "eye":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "bar":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="6" width="4" height="15" rx="1" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      );
    case "clock":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-56 flex-col border-r border-border bg-bg z-50">
        <div className="px-5 py-6 border-b border-border">
          <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-text-primary">
            System
          </h1>
          <p className="text-[10px] tracking-[0.15em] uppercase text-text-muted mt-0.5">
            Personal OS
          </p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-surface text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                }`}
              >
                <NavIcon icon={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-border">
          <p className="text-[10px] text-text-muted tracking-wider uppercase">
            No excuses
          </p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg border-t border-border z-50 flex justify-around py-2 px-1">
        {NAV_ITEMS.slice(0, 6).map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] ${
                active ? "text-accent" : "text-text-muted"
              }`}
            >
              <NavIcon icon={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
