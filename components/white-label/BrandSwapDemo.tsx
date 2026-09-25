"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { Check, Lock, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Brand = {
  key: string;
  label: string;
  domain: string;
  name: string;
  tagline: string;
  monogram: string;
  logoShape: string;
  color: string;
  soft: string;
  fontClass: string;
  services: { name: string; meta: string }[];
  cta: string;
  from: string;
  payment: string;
};

const BRANDS: Brand[] = [
  {
    key: "yoga",
    label: "Yoga studio",
    domain: "book.sageandstone.com",
    name: "Sage & Stone Yoga",
    tagline: "Riverside studio · Book a class",
    monogram: "S",
    logoShape: "rounded-2xl",
    color: "#4D7C5A",
    soft: "#EAF2EC",
    fontClass: "font-demo-yoga",
    services: [
      { name: "Vinyasa Flow", meta: "60 min · $22" },
      { name: "Yin & Restore", meta: "75 min · $25" },
      { name: "5-class pack", meta: "$99" },
    ],
    cta: "Confirm booking",
    from: "hello@sageandstone.com",
    payment: "$22 · Vinyasa Flow",
  },
  {
    key: "barber",
    label: "Barbershop",
    domain: "northsidebarbers.co/book",
    name: "Northside Barbers",
    tagline: "3 barbers · Walk-ins welcome",
    monogram: "NB",
    logoShape: "rounded-md",
    color: "#B23A24",
    soft: "#FBECE9",
    fontClass: "font-demo-barber",
    services: [
      { name: "Skin fade", meta: "45 min · $35" },
      { name: "Beard trim", meta: "20 min · $18" },
      { name: "Cut + beard", meta: "60 min · $48" },
    ],
    cta: "Book my chair",
    from: "crew@northsidebarbers.co",
    payment: "$35 · Skin fade",
  },
  {
    key: "dental",
    label: "Dental clinic",
    domain: "appointments.brightsmile.com",
    name: "Brightsmile Dental",
    tagline: "2 locations · New patients welcome",
    monogram: "B",
    logoShape: "rounded-full",
    color: "#1F5FBF",
    soft: "#E8F0FC",
    fontClass: "font-demo-dental",
    services: [
      { name: "Check-up & clean", meta: "45 min · $90" },
      { name: "Teeth whitening", meta: "60 min · $180" },
      { name: "Emergency visit", meta: "30 min" },
    ],
    cta: "Request appointment",
    from: "care@brightsmile.com",
    payment: "$90 · Check-up",
  },
];

const DAYS = [
  { d: "Mon", n: 12 },
  { d: "Tue", n: 13 },
  { d: "Wed", n: 14 },
  { d: "Thu", n: 15 },
  { d: "Fri", n: 16 },
];
const SLOTS = ["9:00 am", "10:30 am", "1:00 pm", "5:30 pm"];

const ROTATE_MS = 3800;

export default function BrandSwapDemo() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const brand = BRANDS[index];

  // Cycle through the example clients until the visitor picks one.
  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (rootRef.current) io.observe(rootRef.current);
    const id = window.setInterval(() => {
      if (visible && !document.hidden) setIndex((i) => (i + 1) % BRANDS.length);
    }, ROTATE_MS);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [auto]);

  const style = {
    "--b": brand.color,
    "--bs": brand.soft,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="fade-up relative mx-auto mt-14 w-full max-w-[1040px] [animation-delay:0.75s] sm:mt-16"
      style={style}
    >
      <div className="mb-6 flex flex-col items-center gap-3">
        <p className="text-sm text-white/60">One booking system. Every client&apos;s brand.</p>
        <div
          role="group"
          aria-label="Preview the booking page for a different client"
          className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.06] p-1 no-scrollbar"
        >
          {BRANDS.map((b, i) => (
            <button
              key={b.key}
              type="button"
              aria-pressed={i === index}
              onClick={() => {
                setAuto(false);
                setIndex(i);
              }}
              className={cn(
                "h-10 shrink-0 whitespace-nowrap rounded-full px-3 text-[13px] font-medium xs:px-4 xs:text-sm transition-colors duration-300",
                i === index ? "bg-white text-ink" : "text-soft hover:text-white",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tablet / phone: the proof cards sit above the browser */}
      <div className="mx-auto mb-4 grid max-w-[560px] grid-cols-1 gap-3 xs:grid-cols-2 lg:hidden" aria-hidden>
        <ReminderCard brand={brand} />
        <PaymentCard brand={brand} />
      </div>

      <div className="relative flex justify-center">
        {/* Ghost cards hint at many client accounts behind this one */}
        <div aria-hidden className="absolute bottom-0 left-[6%] hidden h-[80%] w-[300px] -rotate-6 rounded-t-[20px] bg-white/80 shadow-deep lg:block">
          <GhostLines />
        </div>
        <div aria-hidden className="absolute bottom-0 right-[6%] hidden h-[80%] w-[300px] rotate-6 rounded-t-[20px] bg-white/80 shadow-deep lg:block">
          <GhostLines />
        </div>

        <div className="relative z-10 w-full max-w-[600px] overflow-hidden rounded-t-[20px] bg-white text-black shadow-[0_-10px_60px_rgba(180,131,249,0.35),0_7px_20px_rgba(0,0,0,0.25)]">
          <div className="h-[3px] bg-accent-gradient" />
          <div className="flex items-center gap-3 border-b border-[#ECECEC] bg-[#F8F8F8] px-3 py-2.5 sm:px-4">
            <div className="hidden gap-1.5 xs:flex" aria-hidden>
              <i className="size-2.5 rounded-full bg-[#D4D4D4]" />
              <i className="size-2.5 rounded-full bg-[#D4D4D4]" />
              <i className="size-2.5 rounded-full bg-[#D4D4D4]" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-[#ECECEC] bg-white px-3 py-1.5 text-[13px] text-[#737373]">
              <Lock className="size-3 shrink-0" aria-hidden />
              <span className="truncate">
                <span className="sr-only">Address: </span>
                <b className="font-semibold text-black" aria-live="polite">
                  {brand.domain}
                </b>
              </span>
            </div>
          </div>

          <div key={brand.key} className="animate-in fade-in duration-500 px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <div
              className="h-16 rounded-xl bg-[var(--b)] transition-colors duration-500 sm:h-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 85% 30%, rgba(255,255,255,0.28), transparent 42%)",
              }}
            />
            <div className="-mt-7 mb-4 flex items-start gap-3 pl-3 sm:-mt-8 sm:gap-4 sm:pl-4">
              <div
                className={cn(
                  "grid size-14 shrink-0 place-items-center border-[3px] border-white bg-white text-lg font-bold text-[var(--b)] shadow-[0_6px_16px_rgba(0,0,0,0.14)] sm:size-16 sm:text-xl",
                  brand.logoShape,
                  brand.fontClass,
                )}
              >
                {brand.monogram}
              </div>
              <div className="min-w-0 pt-9 sm:pt-10">
                <p className={cn("truncate text-lg font-semibold leading-tight sm:text-xl", brand.fontClass)}>
                  {brand.name}
                </p>
                <p className="truncate text-[13px] text-[#737373]">{brand.tagline}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="mb-2 text-xs font-semibold text-[#737373]">Choose a service</p>
                <ul className="flex flex-col gap-1.5">
                  {brand.services.map((s, i) => (
                    <li
                      key={s.name}
                      className={cn(
                        "flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2 text-[13.5px]",
                        i === 0 ? "border-[var(--b)] bg-[var(--bs)]" : "border-[#ECECEC]",
                      )}
                    >
                      <span className="truncate">{s.name}</span>
                      <span className="shrink-0 text-[#737373]">{s.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-[#737373]">Pick a time</p>
                <div className="mb-2 grid grid-cols-5 gap-1">
                  {DAYS.map((day, i) => (
                    <div
                      key={day.d}
                      className={cn(
                        "rounded-lg border py-1 text-center text-[11px] leading-tight",
                        i === 1
                          ? "border-[var(--b)] bg-[var(--b)] text-white"
                          : "border-[#ECECEC] text-[#737373]",
                      )}
                    >
                      {day.d}
                      <b className={cn("block text-sm", i === 1 ? "text-white" : "text-black")}>{day.n}</b>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {SLOTS.map((s, i) => (
                    <div
                      key={s}
                      className={cn(
                        "rounded-full border py-1.5 text-center text-[12.5px] font-medium",
                        i === 1 ? "border-[var(--b)] bg-[var(--b)] text-white" : "border-[#D4D4D4]",
                      )}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex h-11 w-full items-center justify-center rounded-[10px] bg-[var(--b)] text-sm font-semibold text-white">
              {brand.cta}
            </div>
            <p className="mt-3 text-center text-[11px] text-[#9B9B9B]">
              Powered by <span className="font-semibold text-[#625C6E]">Your Agency</span>
            </p>
          </div>
        </div>

        {/* Desktop: floating proof cards */}
        <div aria-hidden className="absolute left-0 top-10 z-20 hidden w-[250px] animate-bob lg:block xl:-left-6">
          <ReminderCard brand={brand} />
        </div>
        <div aria-hidden className="absolute right-0 top-40 z-20 hidden w-[230px] animate-bob [animation-delay:-2s] lg:block xl:-right-6">
          <PaymentCard brand={brand} />
        </div>
        <div aria-hidden className="absolute bottom-16 left-[4%] z-20 hidden animate-bob [animation-delay:-4s] lg:block">
          <div className="flex items-center gap-3 rounded-mid border border-white/10 bg-plum-2 px-3.5 py-3 text-left text-[13px] leading-snug text-white shadow-deep">
            <span className="grid size-8 place-items-center rounded-[9px] bg-accent-gradient text-plum">
              <Sparkles className="size-4" />
            </span>
            <span>
              Built by Your Agency
              <small className="block text-xs text-white/60">No Lunacal logo anywhere</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReminderCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center gap-3 rounded-mid bg-white px-3.5 py-3 text-left text-[13px] leading-snug text-black shadow-deep">
      <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-[var(--b)] text-white transition-colors duration-500">
        <Mail className="size-4" />
      </span>
      <span className="min-w-0">
        Reminder sent
        <small className="block truncate text-xs text-[#737373]">from {brand.from}</small>
      </span>
    </div>
  );
}

function PaymentCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex items-center gap-3 rounded-mid bg-white px-3.5 py-3 text-left text-[13px] leading-snug text-black shadow-deep">
      <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-[#1F9D63] text-white">
        <Check className="size-4" strokeWidth={3} />
      </span>
      <span className="min-w-0">
        Payment received
        <small className="block truncate text-xs text-[#737373]">{brand.payment}</small>
      </span>
    </div>
  );
}

function GhostLines() {
  return (
    <div className="grid gap-2.5 p-5">
      <i className="size-12 rounded-2xl bg-hero-gradient" />
      <i className="h-3 w-[70%] rounded-md bg-[#EEE8F7]" />
      <i className="h-3 w-[45%] rounded-md bg-[#EEE8F7]" />
      <i className="h-10 rounded-[10px] border border-[#EADCFD] bg-[#F6F2FC]" />
      <i className="h-10 rounded-[10px] border border-[#EADCFD] bg-[#F6F2FC]" />
    </div>
  );
}
