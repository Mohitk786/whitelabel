import type { Config } from "tailwindcss";

// Tokens mirror ~/lunacal-ai-new/tailwind.config.ts + app/globals.css so these
// components can be moved into the main site without restyling.
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        black: "#1A1A1A",
        "primary-background": "hsl(var(--primary-background))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        plum: { DEFAULT: "#21172C", 2: "#211A30", 3: "#32213D" },
        lav: { DEFAULT: "#B483F9", 2: "#A589FA", border: "#D6B4FD" },
        peach: { DEFAULT: "#FDA490", 2: "#F8A599" },
        ink: "#020817",
        body: "#625C6E",
        soft: "#D2D2D2",
        border: "hsl(var(--border))",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(90deg,#A589FA 12%,#F8A599 100%)",
        "head-gradient": "linear-gradient(91.7deg,#B483F9 0%,#FDA490 100%)",
        "accent-gradient": "linear-gradient(90deg,#BD84FF 0%,#FF9F86 100%)",
        "strip-gradient":
          "linear-gradient(90deg,#FFFFFF 25%,#FDC3B4 50%,#D6B4FD 75%)",
        "card-wash":
          "linear-gradient(90deg,rgba(214,180,253,0.1) -5.86%,rgba(255,255,255,0.1) 105.86%)",
        "card-tint":
          "linear-gradient(90deg,rgba(180,131,249,0.15) 0%,rgba(255,255,255,0.15) 100%)",
      },
      fontFamily: {
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif-4)", "serif"],
        "demo-yoga": ["var(--font-young-serif)", "Georgia", "serif"],
        "demo-barber": ["var(--font-bricolage)", "system-ui", "sans-serif"],
        "demo-dental": ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 3px 6px rgba(162,122,189,0.1)",
        deep: "0px 7px 20px 0px #00000040",
        glow: "0 0 1rem #D6B4FD",
      },
      borderRadius: {
        lg: "var(--radius)",
        sm: "calc(var(--radius) - 4px)",
        mid: "10px",
        small: "5px",
        large: "15px",
        xarge: "20px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: { to: { transform: "translateX(-50%)" } },
        "move-first": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(20%,15%) scale(1.1)" },
          "66%": { transform: "translate(-15%,-30%) scale(1.2)" },
        },
        "move-second": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(-30%,-5%) scale(1)" },
          "66%": { transform: "translate(15%,-25%) scale(1.05)" },
        },
        bob: { "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite",
        first: "move-first 18s ease-in-out infinite",
        second: "move-second 22s ease-in-out infinite",
        bob: "bob 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
