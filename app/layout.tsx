import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Plus_Jakarta_Sans,
  Source_Serif_4,
  Young_Serif,
} from "next/font/google";
import "./globals.css";

// Same brand fonts as ~/lunacal-ai-new/app/layout.tsx
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif-4",
  style: ["italic"],
  weight: ["500"],
});

// Only used to show how each client's booking page can carry its own font.
const youngSerif = Young_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-young-serif",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-bricolage",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lunacal.ai"),
  title: "Lunacal White Label | Resell Booking Software as Your Own Brand",
  description:
    "Put your logo on Lunacal, add it to the websites you build, and charge clients monthly at a price you set. Join the early access list for agencies.",
  alternates: { canonical: "/agencies" },
  openGraph: {
    title: "Lunacal White Label for Agencies",
    description:
      "Sell a customizable booking system as your own brand. Join early access.",
    url: "/agencies",
    siteName: "Lunacal",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#21172C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Lets scroll-reveal CSS hide content only when JS is running. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          defer
          data-website-id="2az9mex2a2cy"
          data-domain="whitelabel-iota.vercel.app"
          src="https://data.whos1.bid/script.js">
        </script>
      </head>
      <body
        className={`${dmSans.variable} ${sourceSerif4.variable} ${youngSerif.variable} ${bricolage.variable} ${jakarta.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
