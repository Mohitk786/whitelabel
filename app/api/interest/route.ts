import { NextResponse } from "next/server";
import { SURVEY_SOURCE } from "@/lib/constants";
import { interestSchema, type InterestRecord } from "@/lib/survey";
import { appendResponse } from "@/lib/server/responses";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = interestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid submission", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { company_url, ...answers } = parsed.data;
  // Bots fill the hidden field; pretend it worked so they don't retry.
  if (company_url) return NextResponse.json({ ok: true });

  const record: InterestRecord = {
    ...answers,
    submittedAt: new Date().toISOString(),
    source: SURVEY_SOURCE,
  };

  const webhook = process.env.WHITELABEL_WEBHOOK_URL;
  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      await appendResponse(record);
    }
  } catch (err) {
    console.error("[white-label] failed to store response", err);
    return NextResponse.json({ ok: false, error: "Could not save response" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
