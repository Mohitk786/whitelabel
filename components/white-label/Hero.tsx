import BrandSwapDemo from "./BrandSwapDemo";

const PROOF = [
  { strong: "4.9/5", rest: "from 354 ratings" },
  { strong: "0%", rest: "booking commission" },
  { strong: "13+", rest: "languages" },
];

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-hidden px-4 pt-10 sm:px-10 sm:pt-16 lg:pt-20"
    >
      {/* Soft lavender and peach glows behind the headline */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(185,133,245,0.35)_0,rgba(185,133,245,0)_65%)] animate-first sm:h-[40rem] sm:w-[40rem]" />
        <div className="absolute right-[-12%] top-[30%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(253,164,144,0.25)_0,rgba(253,164,144,0)_65%)] animate-second sm:h-[36rem] sm:w-[36rem]" />
      </div>

      <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <p className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-4 whitespace-nowrap text-[13px] font-medium text-soft xs:text-sm sm:mb-8">
          <span className="rounded-full bg-accent-gradient px-2.5 py-0.5 text-xs font-bold text-plum">
            Coming soon
          </span>
          Lunacal White Label<span className="hidden xs:inline"> for agencies</span>
        </p>

        <h1
          id="hero-title"
          className="fade-up mb-6 leading-[1.15] tracking-tight [animation-delay:0.1s]"
        >
          <span className="block text-[2.25rem] text-white xs:text-[2.6rem] sm:text-[3.75rem] lg:text-[4.5rem] text-balance">
            Sell a Customizable Booking System
          </span>
          <span className="text-gradient-hero block px-2 font-serif text-[2.5rem] font-medium italic xs:text-[2.9rem] sm:text-[4.25rem] lg:text-[5.25rem]">
            as Your Own Brand
          </span>
        </h1>

        <p className="fade-up mb-9 max-w-3xl text-lg font-light text-soft [animation-delay:0.3s] sm:mb-10 sm:text-2xl text-pretty">
          Put your logo on Lunacal, add it to the websites you build, and charge
          your clients every month at a price you set.
        </p>

        <div className="fade-up flex w-full flex-col items-stretch gap-3 [animation-delay:0.45s] xs:w-auto xs:flex-row xs:items-center sm:gap-4">
          <a
            href="#early-access"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-5 font-semibold text-black shadow-lg shadow-white/10 transition duration-300 hover:scale-[1.01] hover:shadow-white/30 active:scale-[0.99]"
          >
            Join the Early Access List
          </a>
          <a
            href="#earnings"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] px-5 font-medium text-white transition-colors hover:bg-white/[0.12]"
          >
            Estimate your earnings
          </a>
        </div>

        <ul className="fade-up mt-8 flex flex-wrap justify-center gap-2 text-sm text-soft [animation-delay:0.6s] sm:gap-3">
          {PROOF.map((p) => (
            <li key={p.strong} className="rounded-full bg-white/[0.08] px-3.5 py-2">
              <b className="font-semibold text-white">{p.strong}</b> {p.rest}
            </li>
          ))}
        </ul>
      </div>

      <BrandSwapDemo />
    </section>
  );
}
