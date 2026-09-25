const INDUSTRIES = [
  "Salons",
  "Dental clinics",
  "Coaches",
  "Yoga studios",
  "Barbershops",
  "Therapists",
  "Tutors",
  "Gyms",
  "Law firms",
  "Spas",
  "Consultants",
  "Real estate",
];

export default function IndustriesStrip() {
  return (
    <section
      aria-labelledby="industries-title"
      className="relative w-full border-t border-white/[0.06] py-10 sm:py-14"
    >
      <h2
        id="industries-title"
        className="mb-6 bg-strip-gradient bg-clip-text px-4 text-center text-lg font-bold text-transparent sm:mb-8 sm:text-3xl text-balance"
      >
        Resell it to every kind of service business
      </h2>
      <ul className="sr-only">
        {INDUSTRIES.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <div className="mask-fade-x overflow-hidden" aria-hidden>
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] sm:gap-4">
          {[...INDUSTRIES, ...INDUSTRIES].map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-soft sm:px-5 sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
