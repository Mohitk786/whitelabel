import { Code2, Monitor, Store } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const AUDIENCES = [
  {
    icon: Monitor,
    title: "Web and marketing agencies",
    description:
      "Add a branded booking system to every client site and turn it into a monthly retainer.",
  },
  {
    icon: Code2,
    title: "Freelance developers",
    description:
      "Skip stitching plugins together. Hand clients a finished scheduling platform and stay their go-to.",
  },
  {
    icon: Store,
    title: "Franchises and platforms",
    description:
      "Give every franchisee one branded booking system, or bundle it with your hosting or site builder.",
  },
];

export default function WhoItsFor() {
  return (
    <section aria-labelledby="who-title" className="w-full">
      <SectionHeading
        id="who-title"
        title="Who It's For"
        subtitle="If you build websites or tools for service businesses, this turns one-off projects into monthly income."
      />
      <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 lg:gap-6">
        {AUDIENCES.map(({ icon: Icon, title, description }, i) => {
          const [first, ...rest] = title.split(" ");
          return (
            <Reveal as="li" key={title} delay={i * 80}>
              <article className="flex h-full flex-col gap-5 rounded-3xl border border-lav-border bg-card-wash p-6 shadow-soft transition hover:shadow-glow sm:p-8">
                <span className="w-fit rounded-md bg-gradient-to-br from-[#cc8ae6] to-[#fd9e8d] p-2">
                  <Icon className="size-7 text-white" aria-hidden />
                </span>
                <h3 className="text-2xl font-medium leading-tight sm:text-[1.75rem]">
                  <span className="text-gradient-accent font-bold">{first}</span> {rest.join(" ")}
                </h3>
                <p className="text-base text-body sm:text-lg">{description}</p>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
