import { Building2, ChevronRight, Globe } from "lucide-react";
import FeatureCard from "./FeatureCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const DOMAINS = [
  { host: "book.sageandstone.com", color: "#4D7C5A", name: "Sage & Stone Yoga" },
  { host: "northsidebarbers.co/book", color: "#B23A24", name: "Northside Barbers" },
  { host: "appointments.brightsmile.com", color: "#1F5FBF", name: "Brightsmile Dental" },
];

function DomainList() {
  return (
    <div className="overflow-hidden rounded-mid bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]" aria-hidden>
      <div className="h-[2px] bg-accent-gradient" />
      <ul className="grid gap-2 p-3 sm:p-4">
        {DOMAINS.map((d) => (
          <li key={d.host} className="flex items-center gap-3 rounded-lg bg-[#F8F8F8] px-3 py-2.5 text-sm">
            <span className="grid size-7 shrink-0 place-items-center rounded-md text-xs font-bold text-white" style={{ background: d.color }}>
              {d.name[0]}
            </span>
            <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              <Globe className="mr-1.5 inline size-3.5 text-[#737373]" />
              {d.host}
            </span>
            <span className="hidden shrink-0 rounded-full bg-[#EAF7EF] px-2 py-0.5 text-[11px] font-medium text-[#1F7A4D] xs:inline">
              SSL ✓
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AgencyDashboard() {
  const rows = [
    { name: "Sage & Stone Yoga", status: "Live", color: "#4D7C5A" },
    { name: "Northside Barbers", status: "Live", color: "#B23A24" },
    { name: "Brightsmile Dental", status: "Demo", color: "#1F5FBF" },
    { name: "Peak Physio", status: "Demo", color: "#8E5BF0" },
  ];
  return (
    <div className="overflow-hidden rounded-mid bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]" aria-hidden>
      <div className="h-[2px] bg-accent-gradient" />
      <div className="flex items-center justify-between border-b border-[#F0F0F0] px-4 py-3 text-sm font-semibold">
        <span className="flex items-center gap-2">
          <Building2 className="size-4 text-lav" /> Your Agency
        </span>
        <span className="text-xs font-medium text-[#737373]">4 clients</span>
      </div>
      <ul className="divide-y divide-[#F4F4F4] text-[13px]">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-2.5 px-4 py-2.5">
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: r.color }} />
            <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{r.name}</span>
            <span
              className={
                r.status === "Live"
                  ? "rounded-full bg-[#EAF7EF] px-2 py-0.5 text-[11px] font-medium text-[#1F7A4D]"
                  : "rounded-full bg-[#F3ECFE] px-2 py-0.5 text-[11px] font-medium text-[#6B3FC6]"
              }
            >
              {r.status}
            </span>
            <ChevronRight className="size-3.5 text-[#B0B0B0]" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Included() {
  return (
    <section id="included" aria-labelledby="included-title" className="w-full">
      <SectionHeading
        id="included-title"
        title="Everything Included"
        subtitle="The full Lunacal platform, wearing your logo. Your clients get everything Lunacal customers use today. They just never see our name."
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <Reveal className="md:col-span-2">
          <article className="grid h-full grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-lav-border bg-card-wash p-6 shadow-soft transition hover:shadow-glow sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
            <div>
              <h3 className="mb-2 text-2xl font-medium leading-tight sm:text-3xl">
                <span className="text-gradient-accent font-bold">Custom</span> domain and branding
              </h3>
              <p className="text-base text-body sm:text-lg">
                Booking pages on each client&apos;s own domain with your logo, colors and fonts.
                Emails and reminders come from your address, not ours.
              </p>
            </div>
            <DomainList />
          </article>
        </Reveal>

        <Reveal delay={80}>
          <FeatureCard
            title="Agency dashboard"
            description="Create, manage and switch between every client account from one login."
            visual={<AgencyDashboard />}
          />
        </Reveal>

        <Reveal>
          <FeatureCard
            title="Automated reminders"
            description="Email and SMS reminders and follow-ups that cut no-shows."
            image={{ src: "/main/home/email_sms_reminders.webp", alt: "Workflow sending a text reminder 24 hours before an appointment and a follow-up email" }}
          />
        </Reveal>
        <Reveal delay={80}>
          <FeatureCard
            title="Team scheduling"
            description="Round robin, collective booking, multiple providers and locations."
            image={{ src: "/main/home/round_robin_scheduling.webp", alt: "Round robin scheduling assigning bookings across team members" }}
          />
        </Reveal>
        <Reveal delay={160}>
          <FeatureCard
            title="Packages and coupons"
            description="Multi-session packages, class passes and discount codes that help clients sell more."
            image={{ src: "/main/home/sell_multi_session_packages.webp", alt: "Multi-session package checkout with three selected slots" }}
          />
        </Reveal>

        <Reveal>
          <FeatureCard
            title="0% booking commission"
            description="Clients take payments through Stripe or PayPal and keep every cent."
            image={{ src: "/main/home/enable_paid_sessions.webp", alt: "Charge for an event with Stripe or PayPal" }}
          />
        </Reveal>
        <Reveal delay={80}>
          <FeatureCard
            title="Truly global"
            description="13+ languages, auto-detected time zones, Google, Outlook and Apple calendar sync, and GDPR-conscious data handling."
            image={{ src: "/main/home/13_plus_languages.webp", alt: "Booking page language picker showing 13+ languages" }}
          />
        </Reveal>
        <Reveal delay={160} className="md:col-span-2 lg:col-span-1">
          <FeatureCard
            title="Service booking flows"
            description="Clients pick a service, a provider and a time in one smooth flow that looks like their brand."
            image={{ src: "/main/home/service_booking_flow.webp", alt: "Service booking flow: select a service, choose a provider, pick a time" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
