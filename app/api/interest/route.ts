import { NextResponse } from "next/server";
import { SURVEY_SOURCE } from "@/lib/constants";
import { interestSchema, type InterestRecord } from "@/lib/survey";
import { appendResponse, hasDurableStore } from "@/lib/server/responses";

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
  const durable = hasDurableStore();

  // Redis (when configured) is the record of truth. Without it, the local file is
  // used only when there is no webhook, since serverless filesystems are read-only.
  if (durable || !webhook) {
    try {
      await appendResponse(record);
    } catch (err) {
      console.error("[white-label] failed to store response", err);
      return NextResponse.json({ ok: false, error: "Could not save response" }, { status: 502 });
    }
  }

  if (webhook) {
    try {
      await forward(webhook, record);
    } catch (err) {
      console.error("[white-label] webhook failed", err);
      // Already saved to Redis: don't make the visitor retry and create a duplicate.
      if (!durable) {
        return NextResponse.json({ ok: false, error: "Could not save response" }, { status: 502 });
      }
    }
  }

  return NextResponse.json({ ok: true });
}

async function forward(url: string, record: InterestRecord) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}
