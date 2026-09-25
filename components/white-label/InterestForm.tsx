"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOUNDER_EMAIL, JOINED_STORAGE_KEY } from "@/lib/constants";
import {
  CLIENT_OPTIONS,
  FEATURE_OPTIONS,
  interestSchema,
  PRICE_OPTIONS,
  ROLE_OPTIONS,
  TIMING_OPTIONS,
} from "@/lib/survey";
import { useEarnings } from "./EarningsContext";
import { markJoined, useJoined } from "./useJoined";

type FieldErrors = Partial<Record<"name" | "email" | "website", string>>;

const inputClass =
  "h-12 w-full rounded-[6px] border border-[#D4D4D4] bg-white px-3.5 text-base text-black placeholder:text-[#8A8494] transition focus:border-lav focus:outline-none focus:ring-[3px] focus:ring-lav/25 aria-[invalid=true]:border-[#C62A3F]";

export default function InterestForm() {
  const joinedBefore = useJoined();
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const { clients, price } = useEarnings();
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (joinedBefore) setDone(true);
  }, [joinedBefore]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const str = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" && v.trim() ? v.trim() : undefined;
    };

    const payload = {
      name: str("name") ?? "",
      email: str("email") ?? "",
      company: str("company"),
      website: str("website"),
      role: str("role"),
      clients: str("clients"),
      price: str("price"),
      features: fd.getAll("features").map(String),
      timing: str("timing"),
      notes: str("notes"),
      calculator: { clients, price },
      company_url: str("company_url"),
    };

    const parsed = interestSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if ((key === "name" || key === "email" || key === "website") && !next[key]) {
          next[key] = issue.message;
        }
      }
      setErrors(next);
      setFormError("");
      const firstBad = (["name", "email", "website"] as const).find((k) => next[k]);
      if (firstBad) form.querySelector<HTMLInputElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setErrors({});
    setFormError("");
    setSending(true);
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      markJoined();
      setDone(true);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setFormError("We couldn't save your answers. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    try {
      window.localStorage.removeItem(JOINED_STORAGE_KEY);
    } catch {
      // Storage blocked: nothing to clear.
    }
    setDone(false);
  }

  if (done) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center px-2 py-10 text-center outline-none sm:py-14"
      >
        <span className="mb-6 grid size-[72px] place-items-center rounded-full bg-accent-gradient text-plum">
          <Check className="size-9" strokeWidth={2.8} />
        </span>
        <h3 className="mb-2 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">You&apos;re on the list</h3>
        <p className="max-w-sm text-body">
          We&apos;ll email you when early access opens. Want to talk sooner? Write to{" "}
          <a className="font-medium text-[#7A4FD6] underline-offset-2 hover:underline" href={`mailto:${FOUNDER_EMAIL}`}>
            {FOUNDER_EMAIL}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className="mt-6 text-sm text-[#6B6477] underline underline-offset-2 hover:text-black">
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:gap-7" aria-describedby="form-note">
      <p id="form-note" className="sr-only">
        Name and work email are required. Everything else is optional.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-name" label="Your name" error={errors.name}>
          <input id="f-name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "f-name-err" : undefined} className={inputClass} />
        </Field>
        <Field id="f-email" label="Work email" error={errors.email}>
          <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "f-email-err" : undefined} className={inputClass} />
        </Field>
        <Field id="f-company" label="Company or agency" optional>
          <input id="f-company" name="company" type="text" autoComplete="organization" className={inputClass} />
        </Field>
        <Field id="f-website" label="Website" optional error={errors.website}>
          <input id="f-website" name="website" type="text" inputMode="url" placeholder="youragency.com" autoComplete="url" aria-invalid={!!errors.website} aria-describedby={errors.website ? "f-website-err" : undefined} className={inputClass} />
        </Field>
      </div>

      {/* Honeypot, hidden from people and assistive tech */}
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="f-company-url">Company URL</label>
        <input id="f-company-url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Choices legend="Which best describes you?" name="role" options={ROLE_OPTIONS} />
      <Choices legend="How many of your clients could use a booking system?" name="clients" options={CLIENT_OPTIONS} />
      <Choices legend="What would you expect to pay us per client, per month?" name="price" options={PRICE_OPTIONS} />
      <Choices legend="What matters most?" hint="Pick any" name="features" options={FEATURE_OPTIONS} multiple />
      <Choices legend="When would you start using it?" name="timing" options={TIMING_OPTIONS} />

      <Field id="f-notes" label="Anything else?" optional>
        <textarea
          id="f-notes"
          name="notes"
          rows={3}
          placeholder="What do you use for client bookings today? What would make you switch?"
          className={cn(inputClass, "h-auto min-h-[104px] resize-y py-3")}
        />
      </Field>

      {formError && (
        <p role="alert" className="text-sm font-semibold text-[#C62A3F]">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-plum text-base font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(33,23,44,0.3)] disabled:cursor-wait disabled:opacity-80"
      >
        {sending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {sending ? "Saving your answers…" : "Join the early access list"}
      </button>
      <p className="-mt-3 text-center text-xs text-[#6B6477]">
        No spam. We&apos;ll only email you about White Label.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label} {optional && <span className="font-normal text-[#6B6477]">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-sm font-medium text-[#C62A3F]">
          {error}
        </p>
      )}
    </div>
  );
}

function Choices({
  legend,
  hint,
  name,
  options,
  multiple = false,
}: {
  legend: string;
  hint?: string;
  name: string;
  options: readonly string[];
  multiple?: boolean;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2.5 text-[15px] font-semibold">
        {legend} {hint && <span className="font-normal text-[#6B6477]">{hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt} className="relative cursor-pointer">
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={opt}
              className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
            />
            <span className="inline-flex min-h-[42px] items-center rounded-full border border-[#D4D4D4] bg-white px-4 text-[15px] font-medium text-black transition peer-hover:border-lav-border peer-hover:bg-[#FBF7FF] peer-checked:border-lav peer-checked:bg-lav peer-checked:font-semibold peer-checked:text-plum peer-focus-visible:ring-2 peer-focus-visible:ring-plum peer-focus-visible:ring-offset-2">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
