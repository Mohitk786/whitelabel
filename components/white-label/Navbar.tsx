"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LOG_IN, WEB_URL } from "@/lib/constants";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#earnings", label: "Earnings" },
  { href: "#included", label: "What's included" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Main"
        className="relative z-50 flex h-[var(--nav-h)] w-full items-center justify-between gap-3 bg-background/80 px-4 backdrop-blur-md sm:px-10"
      >
        <a
          href={WEB_URL}
          aria-label="Lunacal home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <Image
            src="/main/lunacal_logo.svg"
            alt="Lunacal"
            width={219}
            height={30}
            priority
            className="h-auto w-[120px] sm:w-[150px]"
          />
          <span className="hidden rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-soft xs:inline-block">
            for Agencies
          </span>
        </a>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 text-[14px] lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-4 py-2 font-medium text-foreground/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={LOG_IN}
            className="hidden h-10 items-center rounded-[8px] px-4 text-[16px] font-medium transition-colors hover:bg-white/10 sm:flex"
          >
            Log in
          </a>
          <a
            href="#early-access"
            className="hidden h-10 items-center rounded-[8px] bg-card px-4 text-[15px] font-medium text-card-foreground transition-colors hover:bg-card/80 xs:flex sm:text-[16px]"
          >
            Join early access
          </a>
          <button
            type="button"
            className="-mr-1 grid size-10 place-items-center rounded-md text-foreground hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-[var(--nav-h)] z-40 h-[calc(100dvh-var(--nav-h))] bg-background px-4 pb-8 pt-4 transition-[clip-path] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] sm:px-10 lg:hidden",
          open
            ? "[clip-path:inset(0_0_0_0)]"
            : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col">
          {LINKS.map((l) => (
            <li key={l.href} className="border-b border-white/10">
              <a
                href={l.href}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
                className="block py-4 text-2xl font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href="#early-access"
            tabIndex={open ? undefined : -1}
            onClick={() => setOpen(false)}
            className="flex h-12 items-center justify-center rounded-lg bg-white text-lg font-semibold text-black"
          >
            Join early access
          </a>
          <a
            href={LOG_IN}
            tabIndex={open ? undefined : -1}
            className="flex h-12 items-center justify-center rounded-lg border border-white/20 text-lg font-medium"
          >
            Log in
          </a>
        </div>
      </div>
    </header>
  );
}
