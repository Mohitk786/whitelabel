import Image from "next/image";
import { FOUNDER_EMAIL, WEB_URL } from "@/lib/constants";

const LINKS = [
  { title: "Lunacal.ai", href: WEB_URL },
  { title: "Pricing", href: `${WEB_URL}/pricing` },
  { title: "Affiliate program", href: `${WEB_URL}/affiliate-program` },
  { title: "Privacy Policy", href: `${WEB_URL}/privacy-policy` },
  { title: "Terms of Use", href: `${WEB_URL}/terms-of-use` },
];

export default function Footer() {
  return (
    <footer className="w-full px-5 pb-40 pt-12 sm:pb-36 lg:px-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <Image src="/main/lunacal_logo.svg" alt="Lunacal" width={219} height={30} className="h-auto w-[140px]" />
          <p className="max-w-xs text-sm text-foreground/70">
            White label booking software for agencies. Coming soon. Questions? Write to{" "}
            <a href={`mailto:${FOUNDER_EMAIL}`} className="text-foreground underline-offset-2 hover:underline">
              {FOUNDER_EMAIL}
            </a>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {LINKS.map((l) => (
              <li key={l.title}>
                <a href={l.href} className="text-foreground/70 transition hover:text-foreground hover:underline">
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-[1280px] text-sm text-foreground/50">© 2026 Lunacal LLC. All rights reserved.</p>
    </footer>
  );
}
