import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
};

// Matches the gradient section titles on the lunacal.ai homepage
// (ExpandingCardHome: bold, -0.05em tracking, #B483F9 → #FDA490).
export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2
        id={id}
        className="text-gradient-head text-[2.5rem] font-bold leading-[1.1] tracking-[-0.05em] xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-balance pb-1"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-3xl text-lg font-light sm:text-2xl text-pretty",
            tone === "dark" ? "text-soft" : "text-black",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
