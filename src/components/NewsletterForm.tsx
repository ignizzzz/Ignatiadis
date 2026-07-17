"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type FormState = "idle" | "submitting" | "success" | "error";

/**
 * Newsletter sign-up. Mock submission — wire to a real email provider
 * (e.g. a route handler) by replacing the submit handler.
 */
export default function NewsletterForm({ className }: { className?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const inputId = useId();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      return;
    }
    setState("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setState("success");
  }

  if (state === "success") {
    return (
      <p className={cn("font-hand text-2xl text-honey", className)} role="status">
        You’re on the list. First taste of new flavours, straight to your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <label htmlFor={inputId} className="block font-display font-bold text-cream">
        Get the flavour drops first
      </label>
      <div className="mt-3 flex max-w-md gap-2">
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={state === "error" ? `${inputId}-error` : undefined}
          className="w-full min-w-0 rounded-full border-2 border-cream/25 bg-transparent px-5 py-3 text-cream placeholder:text-cream/45 focus:border-honey focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "submitting"}
          className="shrink-0 rounded-full bg-honey px-5 py-3 font-display font-bold text-blue-ink transition-colors hover:bg-honey-deep disabled:opacity-60"
        >
          {state === "submitting" ? "Joining…" : "Join"}
        </button>
      </div>
      {state === "error" && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-coral" role="alert">
          That email doesn’t look right — try again.
        </p>
      )}
      <p className="mt-3 text-xs text-cream/55 max-w-md">
        New flavours, drops and openings. No noise, unsubscribe any time.
      </p>
    </form>
  );
}
