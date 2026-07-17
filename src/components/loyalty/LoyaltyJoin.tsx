"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/Button";
import LoyaltyCard from "@/components/LoyaltyCard";

type JoinState = "idle" | "submitting" | "joined";

/** POP Club sign-up. Mock flow — swap for a real membership backend. */
export default function LoyaltyJoin() {
  const [state, setState] = useState<JoinState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;
    if (name.trim().length < 2) {
      setError("Tell us your name — it goes on the card.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("We need a valid email to send your card.");
      return;
    }
    setError(null);
    setState("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setState("joined");
  }

  if (state === "joined") {
    return (
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="flex flex-col items-center gap-6"
      >
        <LoyaltyCard stamps={1} memberName={name.trim().split(/\s+/)[0]} />
        <div className="text-center">
          <p className="font-hand text-3xl text-coral">welcome to the club!</p>
          <p className="mt-2 max-w-sm text-blue-ink/75">
            Stamp one is on us. In a live build your card would land in your
            inbox and wallet app right about now.
          </p>
          <Button href="/order" variant="honey" className="mt-5">
            Earn stamp two
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto w-full max-w-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="loyalty-name" className="block font-semibold text-blue-ink">
            First name
          </label>
          <input
            id="loyalty-name"
            type="text"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="loyalty-email" className="block font-semibold text-blue-ink">
            Email
          </label>
          <input
            id="loyalty-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
          />
        </div>
      </div>
      {error && (
        <p className="mt-3 text-sm text-coral-deep" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        variant="coral"
        size="lg"
        disabled={state === "submitting"}
        className="mt-6 w-full"
      >
        {state === "submitting" ? "Making your card…" : "Join POP Club — it's free"}
      </Button>
      <p className="mt-3 text-center text-xs text-blue-ink/55">
        By joining you accept the programme terms below. Demo sign-up — no
        account is created.
      </p>
    </form>
  );
}
