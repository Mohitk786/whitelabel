"use client";

import { useEarnings } from "./EarningsContext";
import Reveal from "./Reveal";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type SliderProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
};

function Slider({ id, label, value, min, max, format, onChange }: SliderProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-base font-medium text-white/90">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 text-xl font-bold tabular-nums sm:text-2xl">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={format(value)}
        className="range"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
    </div>
  );
}

export default function Calculator() {
  const { clients, price, cost, setClients, setPrice, setCost } = useEarnings();
  const revenue = clients * price;
  const spend = clients * cost;
  const profit = Math.max(0, revenue - spend);
  const margin = revenue ? Math.round((profit / revenue) * 100) : 0;

  return (
    <section id="earnings" aria-labelledby="earnings-title" className="w-full">
      <Reveal>
        <div className="relative isolate grid gap-10 overflow-hidden rounded-3xl bg-plum p-6 text-white shadow-deep xs:p-8 sm:rounded-[2rem] sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-24 -top-24 h-96 w-96 animate-first rounded-full bg-[radial-gradient(circle,rgba(185,133,245,0.35),transparent_65%)]" />
            <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] animate-second rounded-full bg-[radial-gradient(circle,rgba(253,164,144,0.25),transparent_65%)]" />
          </div>

          <div className="flex flex-col gap-5">
            <h2
              id="earnings-title"
              className="text-gradient-head pb-1 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.05em] text-balance xs:text-5xl sm:text-6xl"
            >
              Earn More From Every Client
            </h2>
            <p className="max-w-lg text-lg font-light text-soft sm:text-xl">
              Drag the sliders to see what reselling a booking system under your brand could bring
              in each month.
            </p>
            <Breakdown revenue={revenue} spend={spend} margin={margin} className="mt-2 hidden sm:grid lg:mt-auto" />
          </div>

          <div className="flex flex-col gap-7">
            <Slider id="calc-clients" label="Clients using booking" value={clients} min={1} max={100} format={String} onChange={setClients} />
            <Slider id="calc-price" label="You charge each client / month" value={price} min={15} max={200} format={money} onChange={setPrice} />
            <Slider id="calc-cost" label="Example cost to you per client" value={cost} min={5} max={30} format={money} onChange={setCost} />

            <div className="rounded-[20px] border border-white/15 bg-white/10 p-5 sm:p-6" aria-live="polite">
              <p className="text-[15px] text-soft">Your estimated profit</p>
              <p className="text-gradient-hero my-1 text-5xl font-bold leading-[1.1] tracking-[-0.05em] tabular-nums sm:text-6xl lg:text-7xl">
                {money(profit)}
                <span className="text-2xl tracking-normal sm:text-3xl">/mo</span>
              </p>
              <p className="text-[15px] text-soft">
                That&apos;s <b className="font-semibold text-white">{money(profit * 12)}</b> a year in
                recurring revenue.
              </p>
            </div>
            <Breakdown revenue={revenue} spend={spend} margin={margin} className="grid sm:hidden" />
            <p className="text-[13px] text-white/60">
              White label pricing isn&apos;t set yet. The cost slider is only an example to help you
              plan.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Breakdown({
  revenue,
  spend,
  margin,
  className,
}: {
  revenue: number;
  spend: number;
  margin: number;
  className?: string;
}) {
  const items = [
    { label: "Your revenue", value: money(revenue) },
    { label: "Example cost", value: money(spend) },
    { label: "Margin", value: `${margin}%` },
  ];
  return (
    <dl className={`grid-cols-3 gap-2 text-sm sm:gap-3 ${className ?? ""}`}>
      {items.map((it) => (
        <div key={it.label} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3">
          <dt className="text-xs text-white/60">{it.label}</dt>
          <dd className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap font-semibold tabular-nums">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
