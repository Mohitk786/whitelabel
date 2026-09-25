import { z } from "zod";

export const ROLE_OPTIONS = [
  "Agency",
  "Freelance developer",
  "Franchise",
  "Hosting or site builder",
  "Other",
] as const;

export const CLIENT_OPTIONS = ["1–5", "6–15", "16–50", "50+"] as const;

export const PRICE_OPTIONS = [
  "Under $5",
  "$5–$10",
  "$10–$20",
  "$20+",
  "Not sure",
] as const;

export const FEATURE_OPTIONS = [
  "Custom domain",
  "No Lunacal branding",
  "Emails from my domain",
  "Multi-client dashboard",
  "Billing my clients",
  "API",
] as const;

export const TIMING_OPTIONS = [
  "Right away",
  "Within 3 months",
  "Just exploring",
] as const;

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine(
    (v) => !v || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v),
    "Enter a valid website, like youragency.com",
  );

export const interestSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid work email").max(200),
  company: z.string().trim().max(160).optional(),
  website: optionalUrl,
  role: z.enum(ROLE_OPTIONS).optional(),
  clients: z.enum(CLIENT_OPTIONS).optional(),
  price: z.enum(PRICE_OPTIONS).optional(),
  features: z.array(z.enum(FEATURE_OPTIONS)).max(FEATURE_OPTIONS.length).default([]),
  timing: z.enum(TIMING_OPTIONS).optional(),
  notes: z.string().trim().max(2000).optional(),
  calculator: z
    .object({
      clients: z.number().int().min(1).max(500),
      price: z.number().int().min(1).max(1000),
    })
    .optional(),
  // Honeypot: real people never see or fill this field.
  company_url: z.string().max(0).optional(),
});

export type InterestInput = z.input<typeof interestSchema>;

export type InterestRecord = z.output<typeof interestSchema> & {
  submittedAt: string;
  source: string;
};
