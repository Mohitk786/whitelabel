import { Check } from "lucide-react";
import InterestForm from "./InterestForm";
import Reveal from "./Reveal";

const PERKS = [
  "First access before public launch",
  "Founding-partner pricing",
  "A direct line to our product team",
];

export default function EarlyAccess() {
  return (
    <section
      id="early-access"
      aria-labelledby="early-access-title"
      className="relative isolate w-full overflow-hidden px-4 py-20 sm:px-10 sm:py-28 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-15%] top-[5%] h-[30rem] w-[30rem] animate-first rounded-full bg-[radial-gradient(circle,rgba(185,133,245,0.3),transparent_65%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[34rem] w-[34rem] animate-second rounded-full bg-[radial-gradient(circle,rgba(253,164,144,0.2),transparent_65%)]" />
      </div>

      <div className="mx-auto grid max-w-[1280px] items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <h2
            id="early-access-title"
            className="mb-5 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.05em] text-white xs:text-5xl sm:text-6xl lg:text-7xl text-balance"
          >
            Would you{" "}
            <span className="text-gradient-hero font-serif font-medium italic tracking-normal">resell</span>{" "}
            Lunacal?
          </h2>
          <p className="mb-8 max-w-xl text-lg font-light text-soft sm:text-2xl">
            We haven&apos;t built white label yet. Your answers decide whether we do, what it costs,
            and what ships first.
          </p>
          <ul className="grid gap-3">
            {PERKS.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-mid border border-white/10 bg-white/[0.08] px-4 py-3.5 font-medium"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-gradient text-plum">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative overflow-hidden rounded-[20px] bg-white p-5 text-black shadow-deep xs:p-6 sm:p-9">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-accent-gradient" />
            <InterestForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
