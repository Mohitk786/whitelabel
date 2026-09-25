import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  visual?: ReactNode;
  className?: string;
  imageClassName?: string;
};

// Same card language as components/shared/Card.tsx on lunacal.ai:
// lavender outline, soft wash, first word in the accent gradient, screenshot at the bottom.
export default function FeatureCard({
  title,
  description,
  image,
  visual,
  className,
  imageClassName,
}: FeatureCardProps) {
  const [first, ...rest] = title.split(" ");
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-lav-border bg-card-wash pt-8 shadow-soft transition hover:shadow-glow sm:pt-10",
        className,
      )}
    >
      <div className="px-6 sm:px-8">
        <h3 className="mb-2 text-2xl font-medium leading-tight sm:text-3xl">
          <span className="text-gradient-accent font-bold">{first}</span> {rest.join(" ")}
        </h3>
        <p className="text-base text-body sm:text-lg">{description}</p>
      </div>
      {image && (
        <div className={cn("relative mt-auto h-[15rem] w-full overflow-hidden px-6 sm:h-[18rem] sm:px-8", imageClassName)}>
          <Image
            src={image.src}
            alt={image.alt}
            width={744}
            height={800}
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
            className="mx-auto h-auto w-full max-w-[360px] object-cover object-top"
          />
        </div>
      )}
      {visual && <div className="mt-auto px-6 pb-6 sm:px-8 sm:pb-8">{visual}</div>}
    </article>
  );
}
