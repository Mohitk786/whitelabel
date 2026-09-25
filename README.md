# Lunacal White Label: early access page

A fake-door landing page that pitches "Lunacal White Label" to agencies and collects
interest before anything is built.

Built on the same stack as `~/lunacal-ai-new` (Next.js 16, React 19, Tailwind 3) with the
same design tokens, fonts (DM Sans, Source Serif 4 italic) and product screenshots, so the
components in `components/white-label/` can be moved into the main site as `/agencies`.

## Run

```bash
npm install
npm run dev        # http://localhost:5070
npm run build && npm start
```

## Collecting responses

The form POSTs to `/api/interest`, which validates the answers (`lib/survey.ts`) and then:

- forwards the JSON to `WHITELABEL_WEBHOOK_URL` (Zapier, Make, HubSpot or your API) when that is set, or
- appends to `data/responses.jsonl` when it isn't. This only works locally or on a single
  long-running server. Serverless hosts need the webhook.

Each record stores the answers, the visitor's calculator settings (`clients`, `price`),
`submittedAt` (ISO 8601) and `source: "white-label-interest-v2"`.

Team-only results: set `RESULTS_TOKEN` and open `/results?token=<value>`. The page reads
`data/responses.jsonl`, so with a webhook the results live in your CRM instead.

See `.env.example`.

## Page sections

Hero with brand-swap demo, industries strip, how it works, earnings calculator, what's
included, who it's for, early access form, FAQ, floating CTA bar.

## Moving into lunacal-ai-new

1. Copy `components/white-label/`, `lib/survey.ts`, `lib/server/responses.ts` and `app/api/interest/`.
2. Add `app/(ads-pages)/agencies/page.tsx` with the body of `app/page.tsx` (the main site's
   own Navbar and Footer can replace the ones here).
3. Merge the extra Tailwind tokens from `tailwind.config.ts` (`plum`, `lav`, `peach`,
   gradients, `marquee`/`bob` animations) and the `.reveal`, `.range` and `.fade-up` CSS from
   `app/globals.css`.
4. The images already exist there under `public/home/`, and the `/main/...` paths resolve through the existing rewrite.
