import Link from "next/link";
import Logo from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import { FOOTER_LINK_GROUPS, SITE } from "@/lib/site";

function SocialIcon({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border-2 border-cream/25 text-cream transition-colors hover:border-honey hover:text-honey"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-blue-ink text-cream">
      {/* Brand statement + newsletter */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <p className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-4xl sm:text-5xl">
            Snack different.
            <br />
            <span className="text-honey">Live brighter.</span>
          </p>
          <NewsletterForm />
        </div>

        <div className="sesame-divider mt-12 opacity-40" aria-hidden="true" />

        {/* Link groups */}
        <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
          {FOOTER_LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={`Footer — ${group.title}`}>
              <h2 className="font-display font-bold text-honey text-sm uppercase tracking-[0.2em]">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-cream/80 transition-colors hover:text-cream hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Logo row */}
        <div className="mt-14 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <Logo tone="cream" size="lg" />
            <p className="mt-3 max-w-sm text-cream/70">
              Crispy phyllo. Creamy Greek feta. Real honey. Made fresh in
              London, eaten everywhere.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SocialIcon label="FETA POP on Instagram" href={SITE.instagram}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="FETA POP on TikTok" href={SITE.tiktok}>
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M16.6 3c.4 2.1 1.8 3.7 3.9 4v3c-1.5 0-2.9-.5-3.9-1.2v6.3c0 3.4-2.6 5.9-5.9 5.9a5.9 5.9 0 0 1-1.6-11.6v3.2a2.9 2.9 0 1 0 4.5 2.5V3h3Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-cream/12">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:px-6 py-6 text-sm text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FETA POP Ltd. A fictional brand concept.</p>
          <p>
            Allergen questions?{" "}
            <Link href="/menu#allergens" className="underline underline-offset-4 hover:text-cream">
              Read our allergen information
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
