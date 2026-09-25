import { ReactNode } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

type Step = {
  title: string;
  description: string;
  visual: ReactNode;
};

const STEPS: Step[] = [
  {
    title: "Add your brand",
    description: "Logo, colors, fonts, your domain, and emails from your own address.",
    visual: (
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-5 rounded-[5px] bg-lav" />
          <span className="size-5 rounded-[5px] bg-peach" />
          <span className="size-5 rounded-[5px] bg-plum" />
          <span className="ml-auto rounded-full border border-[#D4D4D4] px-2 py-0.5 text-[11px]">
            Aa DM Sans
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-[#F8F8F8] px-2 py-1.5 text-[11px] text-[#737373]">
          <span className="size-2 rounded-full bg-[#1F9D63]" /> book.yourclient.com
        </div>
      </div>
    ),
  },
  {
    title: "Pitch with a demo",
    description:
      "Spin up a free demo with a prospect's services so they can try it before they pay.",
    visual: (
      <div className="flex flex-col gap-2 text-[12px]">
        <Toggle label="Demo account" on />
        <Toggle label="Client branding" on />
        <Toggle label="Take payments" />
      </div>
    ),
  },
  {
    title: "Go live",
    description: "When they say yes, switch it to live and embed it on the site you built.",
    visual: (
      <div className="flex flex-wrap gap-1.5">
        {["9:00", "10:30", "1:00", "5:30"].map((t, i) => (
          <span
            key={t}
            className={
              i === 1
                ? "rounded-full border border-lav bg-lav px-2.5 py-1 text-[11px] font-semibold text-plum"
                : "rounded-full border border-[#D4D4D4] px-2.5 py-1 text-[11px]"
            }
          >
            {t}
          </span>
        ))}
        <span className="mt-1 w-full rounded-md bg-[#EAF7EF] px-2 py-1 text-[11px] font-medium text-[#1F7A4D]">
          ● Live on yourclient.com
        </span>
      </div>
    ),
  },
  {
    title: "Earn every month",
    description: "Charge what you like. The gap between your price and ours is yours.",
    visual: (
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-[#737373]">This month</p>
          <p className="text-xl font-bold text-[#1F9D63]">+$555</p>
        </div>
        <div className="flex h-10 items-end gap-1">
          {[35, 50, 45, 70, 85, 100].map((h, i) => (
            <span
              key={i}
              className="w-2 rounded-sm bg-accent-gradient"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
];

function Toggle({ label, on = false }: { label: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className={`relative h-[17px] w-[30px] rounded-full ${on ? "bg-lav" : "bg-[#E4E4E7]"}`}>
        <span
          className={`absolute top-[2px] size-[13px] rounded-full bg-white ${on ? "right-[2px]" : "left-[2px]"}`}
        />
      </span>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="w-full">
      <SectionHeading
        id="how-title"
        title="How White Label Works"
        subtitle="From demo to recurring revenue in four steps. You sell booking software under your name, and only pay for client accounts that are live."
      />
      <ol className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const [first, ...rest] = step.title.split(" ");
          return (
            <Reveal as="li" key={step.title} delay={i * 80} className="h-full">
              <article className="relative flex h-full flex-col rounded-3xl border border-lav-border bg-card-wash px-6 pb-6 pt-10 shadow-soft transition hover:shadow-glow">
                <span className="gradient-border absolute left-6 top-0 grid size-12 -translate-y-1/2 place-items-center rounded-full border-2 text-lg font-bold [--bg-color:#fff]">
                  {i + 1}
                </span>
                <h3 className="mb-2 text-2xl font-medium leading-tight sm:text-[1.75rem]">
                  <span className="text-gradient-accent font-bold">{first}</span>{" "}
                  {rest.join(" ")}
                </h3>
                <p className="text-base text-body">{step.description}</p>
                <div className="mt-auto pt-6" aria-hidden>
                  <div className="overflow-hidden rounded-mid bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
                    <div className="h-[2px] bg-accent-gradient" />
                    <div className="p-3.5 text-black">{step.visual}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
