import { promises as fs } from "fs";
import path from "path";
import type { InterestRecord } from "@/lib/survey";

// Local fallback store, one JSON object per line. Fine for dev and single-server
// hosting; on serverless hosts set WHITELABEL_WEBHOOK_URL instead.
const FILE = path.join(process.cwd(), "data", "responses.jsonl");

export async function appendResponse(record: InterestRecord) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.appendFile(FILE, JSON.stringify(record) + "\n", "utf8");
}

export async function readResponses(): Promise<InterestRecord[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as InterestRecord];
        } catch {
          return [];
        }
      });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}
