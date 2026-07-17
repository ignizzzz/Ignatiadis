"use client";

import { useState, useSyncExternalStore } from "react";
import Button from "@/components/Button";
import { LOCATIONS } from "@/data/locations";

export const ENQUIRY_TOPICS = [
  { id: "general", label: "General enquiry" },
  { id: "store", label: "Store support" },
  { id: "catering", label: "Catering" },
  { id: "partnerships", label: "Partnerships" },
  { id: "press", label: "Press" },
  { id: "careers", label: "Careers" },
  { id: "franchise", label: "Franchise interest" },
] as const;

type TopicId = (typeof ENQUIRY_TOPICS)[number]["id"];
type FormState = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
}

const emptySubscribe = () => () => {};

/**
 * Topic from ?topic= (e.g. footer "Careers" link), read on the client
 * without opting the whole page into dynamic rendering.
 */
function useUrlTopic(): TopicId | null {
  const search = useSyncExternalStore(
    emptySubscribe,
    () => window.location.search,
    () => ""
  );
  const param = new URLSearchParams(search).get("topic");
  return param && ENQUIRY_TOPICS.some((t) => t.id === param)
    ? (param as TopicId)
    : null;
}

/** Contact form. Mock submission — connect a route handler or CRM to go live. */
export default function ContactForm() {
  const urlTopic = useUrlTopic();
  const [topicOverride, setTopicOverride] = useState<TopicId | null>(null);
  const topic: TopicId = topicOverride ?? urlTopic ?? "general";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [locationId, setLocationId] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<FormState>("idle");

  function validate(): boolean {
    const next: FieldErrors = {};
    if (name.trim().length < 2) next.name = "We need a name to reply to.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "That email doesn’t look right.";
    if (message.trim().length < 10) next.message = "Give us a little more to work with (10+ characters).";
    if (!consent) next.consent = "We need your consent to process the enquiry.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting") return;
    if (!validate()) return;
    setState("submitting");
    // Mock request — replace with a POST to a route handler.
    await new Promise((r) => setTimeout(r, 1100));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="rounded-[2rem] bg-olive/12 p-8 text-center" role="status">
        <p className="font-hand text-3xl text-olive-deep">got it!</p>
        <h3 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-blue">
          Message sent
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-blue-ink/75">
          Thanks {name.trim().split(/\s+/)[0]} — the right person will get back
          to you within two working days.
        </p>
        <Button
          onClick={() => {
            setState("idle");
            setMessage("");
          }}
          variant="outline"
          className="mt-6"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={state === "submitting"}>
      <div className="space-y-5">
        <div>
          <label htmlFor="cf-topic" className="block font-semibold text-blue-ink">
            What’s it about?
          </label>
          <select
            id="cf-topic"
            value={topic}
            onChange={(e) => setTopicOverride(e.target.value as TopicId)}
            className="mt-1.5 w-full appearance-none rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
          >
            {ENQUIRY_TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="block font-semibold text-blue-ink">
              Name
            </label>
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "cf-name-error" : undefined}
              className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
            />
            {errors.name && (
              <p id="cf-name-error" className="mt-1 text-sm text-coral-deep" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="cf-email" className="block font-semibold text-blue-ink">
              Email
            </label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
              className="mt-1.5 w-full rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
            />
            {errors.email && (
              <p id="cf-email-error" className="mt-1 text-sm text-coral-deep" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {(topic === "store" || topic === "general") && (
          <div>
            <label htmlFor="cf-location" className="block font-semibold text-blue-ink">
              Which store? <span className="font-normal text-blue-ink/50">(optional)</span>
            </label>
            <select
              id="cf-location"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="mt-1.5 w-full appearance-none rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
            >
              <option value="">Not store-specific</option>
              {LOCATIONS.filter((l) => l.status === "open").map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="cf-message" className="block font-semibold text-blue-ink">
            Message
          </label>
          <textarea
            id="cf-message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "cf-message-error" : undefined}
            className="mt-1.5 w-full resize-y rounded-2xl border-2 border-blue/20 bg-cream px-4 py-3 focus:border-blue focus:outline-none"
          />
          {errors.message && (
            <p id="cf-message-error" className="mt-1 text-sm text-coral-deep" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-blue-ink/80">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "cf-consent-error" : undefined}
              className="mt-0.5 size-4 accent-[#0d3b9c]"
            />
            <span>
              I consent to FETA POP storing this enquiry and contacting me
              about it. We don’t use contact details for marketing without a
              separate opt-in.
            </span>
          </label>
          {errors.consent && (
            <p id="cf-consent-error" className="mt-1 text-sm text-coral-deep" role="alert">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="blue" size="lg" disabled={state === "submitting"} className="mt-7">
        {state === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
