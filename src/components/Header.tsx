"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "@/components/Logo";
import PopFlower from "@/components/PopFlower";
import { useBasket } from "@/context/BasketContext";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/site";

function BasketCount() {
  const { itemCount, ready, addPulse } = useBasket();
  const reduceMotion = useReducedMotion();
  if (!ready || itemCount === 0) return null;
  return (
    <motion.span
      key={addPulse}
      initial={reduceMotion ? false : { scale: 1.5 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-blue text-cream text-xs font-bold tabular-nums"
      aria-label={`${itemCount} item${itemCount === 1 ? "" : "s"} in basket`}
    >
      {itemCount}
    </motion.span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Close the sheet whenever the route changes (state adjusted during
  // render, per React's "adjusting state when props change" pattern).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  // Lock scroll + close on Escape while the mobile sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-blue/10 bg-cream/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 sm:h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo size="md" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={cn(
                    "font-display font-bold text-blue tracking-tight transition-colors hover:text-coral",
                    pathname === link.href && "text-coral"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/order"
            className="inline-flex items-center rounded-full bg-honey px-4 py-2.5 sm:px-6 font-display font-bold text-blue-ink tracking-tight transition-[background-color,transform] duration-200 hover:bg-honey-deep active:scale-95 motion-reduce:active:scale-100"
          >
            Order Now
            <BasketCount />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-blue hover:bg-blue/8 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 top-16 sm:top-[4.5rem] z-40 flex flex-col bg-blue lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-10">
              <ul className="space-y-2">
                {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/contact", label: "Contact" }].map(
                  (link, i) => (
                    <motion.li
                      key={link.href}
                      initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.045, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={cn(
                          "block rounded-2xl px-4 py-3 font-display text-4xl font-extrabold uppercase tracking-tight text-cream hover:bg-blue-deep",
                          pathname === link.href && "text-honey"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </nav>
            <div className="border-t border-cream/15 px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
              <Link
                href="/order"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-honey px-6 py-4 font-display text-xl font-bold text-blue-ink active:scale-95 motion-reduce:active:scale-100"
              >
                Order FETA POP
                <PopFlower className="size-5" />
              </Link>
              <p className="mt-4 text-center font-hand text-2xl text-cream/80">
                Small bite. Big flavour.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
