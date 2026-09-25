import { promises as fs } from "fs";
import path from "path";
import type { InterestRecord } from "@/lib/survey";

// Two stores:
// - Upstash Redis (REST) when configured. Works on Vercel and other serverless hosts.
//   The Vercel Marketplace integration sets KV_REST_API_URL / KV_REST_API_TOKEN;
//   a direct Upstash database uses UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.
// - A local JSON-lines file otherwise. Fine for dev and single-server hosting only,
//   because serverless filesystems are read-only.
const FILE = path.join(process.cwd(), "data", "responses.jsonl");
const REDIS_KEY = "whitelabel:responses";

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function hasDurableStore() {
  return redisConfig() !== null;
}

async function redis<T>(command: (string | number)[]): Promise<T> {
  const cfg = redisConfig();
  if (!cfg) throw new Error("Redis is not configured");
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const json = (await res.json().catch(() => null)) as { result?: T; error?: string } | null;
  if (!res.ok || !json || json.error) {
    throw new Error(`Redis ${command[0]} failed: ${json?.error ?? res.status}`);
  }
  return json.result as T;
}

function parseLines(lines: string[]): InterestRecord[] {
  return lines.filter(Boolean).flatMap((line) => {
    try {
      return [JSON.parse(line) as InterestRecord];
    } catch {
      return [];
    }
  });
}

export async function appendResponse(record: InterestRecord) {
  if (redisConfig()) {
    await redis(["RPUSH", REDIS_KEY, JSON.stringify(record)]);
    return;
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.appendFile(FILE, JSON.stringify(record) + "\n", "utf8");
}

export async function readResponses(): Promise<InterestRecord[]> {
  if (redisConfig()) {
    return parseLines(await redis<string[]>(["LRANGE", REDIS_KEY, 0, -1]));
  }
  try {
    return parseLines((await fs.readFile(FILE, "utf8")).split("\n"));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}
