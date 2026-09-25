"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJoined } from "./useJoined";

const AVATARS = [
  "/main/free-demo/business-owner-avatar-3.png",
  "/main/free-demo/business-owner-avatar-1.png",
  "/main/free-demo/business-owner-avatar-2.png",
];

// Same bar as components/shared/FloatingCTA.tsx on lunacal.ai. Appears once the
// hero is out of view and steps aside while the form is on screen.
export default function FloatingCTA() {
  const joined = useJoined();
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("early-access");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0 });
      io.observe(hero);
      observers.push(io);
    }
    if (form) {
      const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0 });
      io.observe(form);
      observers.push(io);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const show = pastHero && !formVisible && !dismissed && !joined;

  return (
    <div
      role="region"
      aria-label="Join early access"
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex justify-center px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-4",
        "transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform",
        show ? "translate-y-0" : "pointer-events-none translate-y-[120%]",
      )}
    >
      <div className="relative flex w-full max-w-sm flex-wrap items-start gap-x-2 rounded-xl bg-plum-2 px-5 pb-5 pt-4 shadow-deep sm:w-auto sm:max-w-none sm:flex-nowrap sm:items-center sm:gap-3 sm:py-4">
        <p className="order-1 flex-1 pl-1 text-[15px] leading-[22px] text-white sm:mr-4 sm:max-w-sm sm:flex-none sm:pl-0 sm:text-lg">
          Agencies are joining the White Label early access list
        </p>
        <a
          href="#early-access"
          tabIndex={show ? undefined : -1}
          className="order-3 mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-5 text-lg font-semibold text-plum-2 transition-opacity hover:opacity-90 sm:order-2 sm:mt-0 sm:w-auto sm:pl-5 sm:pr-2.5"
        >
          <span className="whitespace-nowrap">Join early access</span>
          <span className="flex shrink-0 -space-x-2.5">
            {AVATARS.map((src) => (
              <Image key={src} src={src} alt="" width={32} height={32} className="size-8 rounded-full object-cover ring-2 ring-white" />
            ))}
          </span>
        </a>
        <button
          type="button"
          aria-label="Dismiss"
          tabIndex={show ? undefined : -1}
          onClick={() => setDismissed(true)}
          className="order-2 ml-auto grid size-8 shrink-0 place-items-center text-white/30 transition-colors hover:text-white/80 sm:order-3 sm:ml-0"
        >
          <X className="size-5 sm:size-6" />
        </button>
      </div>
    </div>
  );
}
