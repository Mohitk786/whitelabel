import { ReactNode } from "react";
import Calculator from "@/components/white-label/Calculator";
import EarlyAccess from "@/components/white-label/EarlyAccess";
import { EarningsProvider } from "@/components/white-label/EarningsContext";
import Faq from "@/components/white-label/Faq";
import FloatingCTA from "@/components/white-label/FloatingCTA";
import Footer from "@/components/white-label/Footer";
import Hero from "@/components/white-label/Hero";
import HowItWorks from "@/components/white-label/HowItWorks";
import Included from "@/components/white-label/Included";
import IndustriesStrip from "@/components/white-label/IndustriesStrip";
import Navbar from "@/components/white-label/Navbar";
import WhoItsFor from "@/components/white-label/WhoItsFor";

// White sections sit on a rounded card over the plum page, like the
// expanding card on the lunacal.ai homepage.
function LightPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="w-full px-2 sm:px-4">
      <div
        className={`relative mx-auto w-full overflow-hidden rounded-2xl bg-white text-black sm:rounded-[3rem] ${className}`}
      >
        {/* Peach rail from the homepage, desktop only */}
        <div aria-hidden className="absolute left-0 top-40 hidden h-56 w-3.5 rounded-r-full bg-accent-gradient lg:block" />
        <div className="mx-auto flex max-w-[1280px] flex-col px-4 xs:px-6 sm:px-10 lg:px-16">{children}</div>
      </div>
    </div>
  );
}

export default function WhiteLabelPage() {
  return (
    <EarningsProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="w-full">
        <Hero />
        <IndustriesStrip />

        <LightPanel className="py-20 sm:py-28 lg:py-36">
          <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40">
            <HowItWorks />
            <Calculator />
            <Included />
            <WhoItsFor />
          </div>
        </LightPanel>

        <EarlyAccess />

        <LightPanel className="py-20 sm:py-28">
          <Faq />
        </LightPanel>
      </main>
      <Footer />
      <FloatingCTA />
    </EarningsProvider>
  );
}
