"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { LOCATIONS } from "@/data/locations";

type Result =
  | { kind: "open"; name: string }
  | { kind: "coming-soon"; name: string; note?: string }
  | { kind: "none"; query: string }
  | null;

/** Simple "is FETA POP near me?" lookup against known cities. */
export default function CityFinder() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result>(null);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;

    const londonHints = ["london", "soho", "w1", "wc1", "wc2", "sw1", "nw1", "ec1"];
    if (londonHints.some((h) => q.includes(h))) {
      setResult({ kind: "open", name: "FETA POP Soho" });
      return;
    }
    const upcoming = LOCATIONS.find(
      (l) => l.status === "coming-soon" && q.includes(l.city.toLowerCase())
    );
    if (upcoming) {
      setResult({ kind: "coming-soon", name: upcoming.city, note: upcoming.openingNote });
      return;
    }
    setResult({ kind: "none", query: query.trim() });
  }

  return (
    <div className="rounded-[2rem] bg-cream-soft p-6 sm:p-8">
      <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-blue">
        Near you?
      </h3>
      <form onSubmit={search} className="mt-4 flex max-w-md gap-2">
        <label htmlFor="city-finder" className="sr-only">
          Your city or postcode
        </label>
        <input
          id="city-finder"
          type="text"
          placeholder="Your city or postcode"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setResult(null);
          }}
          className="w-full min-w-0 rounded-full border-2 border-blue/20 bg-cream px-5 py-3 text-blue-ink placeholder:text-blue-ink/40 focus:border-blue focus:outline-none"
        />
        <Button type="submit" variant="blue" disabled={query.trim().length === 0}>
          Search
        </Button>
      </form>

      <div className="mt-4 max-w-md" aria-live="polite">
        {result?.kind === "open" && (
          <p className="rounded-2xl bg-olive/12 px-5 py-4 text-olive-deep">
            <strong className="font-display">Good news</strong> — {result.name} is your
            spot. Scroll up for hours and directions.
          </p>
        )}
        {result?.kind === "coming-soon" && (
          <p className="rounded-2xl bg-honey-soft px-5 py-4 text-blue-ink">
            <strong className="font-display">Almost.</strong> {result.name} is on the
            map{result.note ? ` — ${result.note.toLowerCase()}` : ""}. Join the
            newsletter below and you’ll hear the second doors open.
          </p>
        )}
        {result?.kind === "none" && (
          <div className="rounded-2xl bg-coral/10 px-5 py-4 text-blue-ink">
            <p>
              <strong className="font-display">Not yet.</strong> No FETA POP near{" "}
              “{result.query}” — but the map is growing.
            </p>
            <p className="mt-1.5 text-sm">
              Tell us where to open next via the{" "}
              <a href="/contact" className="font-semibold underline underline-offset-4">
                contact page
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
