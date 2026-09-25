"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { FOUNDER_EMAIL } from "@/lib/constants";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Is this available today?",
    a: "Not yet. We're hearing from agencies before we build it. Joining the list is free and doesn't commit you to anything.",
  },
  {
    q: "How much will it cost?",
    a: "Pricing isn't set. We're planning per-client pricing that drops as you add clients, and you'd only pay for live accounts. Your answers shape it.",
  },
  {
    q: "Will my clients see Lunacal anywhere?",
    a: "No. Booking pages, emails and reminders would carry your brand and your client's domain.",
  },
  {
    q: "Can I pitch prospects before paying?",
    a: "That's the plan. You'd get free demo accounts to set up a prospect's services and branding, and only pay once a client goes live.",
  },
  {
    q: "I already use Lunacal. Does anything change?",
    a: "No. Your current account and plan stay exactly as they are.",
  },
];

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="w-full">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="flex flex-col gap-4">
          <h2
            id="faq-title"
            className="text-gradient-head pb-1 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.05em] xs:text-5xl sm:text-6xl lg:text-7xl"
          >
            Questions
          </h2>
          <p className="text-lg font-light sm:text-2xl">
            Still unsure? Email{" "}
            <a href={`mailto:${FOUNDER_EMAIL}`} className="font-normal text-[#7A4FD6] underline-offset-4 hover:underline">
              {FOUNDER_EMAIL}
            </a>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <AccordionPrimitive.Root type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((f) => (
              <AccordionPrimitive.Item
                key={f.q}
                value={f.q}
                className="rounded-[20px] border border-lav-border bg-card-wash px-5 shadow-soft sm:px-6"
              >
                <AccordionPrimitive.Header asChild>
                  <h3>
                    <AccordionPrimitive.Trigger className="group flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left text-base font-medium sm:text-xl">
                      {f.q}
                      <ChevronDown
                        className="size-5 shrink-0 text-lav transition-transform duration-200 group-data-[state=open]:rotate-180 sm:size-6"
                        aria-hidden
                      />
                    </AccordionPrimitive.Trigger>
                  </h3>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-5 text-base text-[#6A6A6A] sm:text-lg">{f.a}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  );
}
