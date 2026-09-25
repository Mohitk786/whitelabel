import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CLIENT_OPTIONS,
  FEATURE_OPTIONS,
  PRICE_OPTIONS,
  ROLE_OPTIONS,
  TIMING_OPTIONS,
} from "@/lib/survey";
import { readResponses } from "@/lib/server/responses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "White Label responses",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ token?: string }> };

function tally(values: (string | undefined)[], options: readonly string[]) {
  return options.map((o) => ({ label: o, count: values.filter((v) => v === o).length }));
}

function Bars({ title, rows, total }: { title: string; rows: { label: string; count: number }[]; total: number }) {
  return (
    <div>
      <h3 className="mb-3 text-[15px] font-semibold">{title}</h3>
      <ul className="grid gap-2 text-sm">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-[minmax(0,9rem)_1fr_2rem] items-center gap-3">
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-body">{r.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-lav/15">
              <span className="block h-full rounded-full bg-accent-gradient" style={{ width: total ? `${(r.count / total) * 100}%` : 0 }} />
            </span>
            <span className="text-right tabular-nums">{r.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ResultsPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const secret = process.env.RESULTS_TOKEN;
  if (!secret || token !== secret) notFound();

  const rows = (await readResponses()).sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  const total = rows.length;
  const hot = rows.filter(
    (r) => r.timing === "Right away" && r.clients && r.clients !== "1–5",
  ).length;

  return (
    <main className="min-h-screen bg-white px-4 py-12 text-black sm:px-10">
      <div className="mx-auto max-w-[1280px]">
        <h1 className="text-gradient-head pb-1 text-5xl font-bold tracking-[-0.05em] sm:text-6xl">Responses So Far</h1>
        <p className="mb-10 mt-2 text-lg font-light text-body">
          White Label early access survey. Stored locally in data/responses.jsonl.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-gradient-head text-7xl font-bold leading-none tracking-[-0.05em]">{total}</p>
            <p className="mt-2 text-body">signups</p>
            <p className="mt-4 text-sm text-body">
              <b className="text-black">{hot}</b> want it right away and have 6+ clients
            </p>
          </div>
          <Bars title="Role" rows={tally(rows.map((r) => r.role), ROLE_OPTIONS)} total={total} />
          <Bars title="Clients" rows={tally(rows.map((r) => r.clients), CLIENT_OPTIONS)} total={total} />
          <Bars title="Expected price" rows={tally(rows.map((r) => r.price), PRICE_OPTIONS)} total={total} />
          <Bars title="Timing" rows={tally(rows.map((r) => r.timing), TIMING_OPTIONS)} total={total} />
          <Bars
            title="Must-haves"
            rows={FEATURE_OPTIONS.map((f) => ({ label: f, count: rows.filter((r) => r.features?.includes(f)).length }))}
            total={total}
          />
        </div>

        <div className="mt-12 overflow-x-auto rounded-[20px] border border-lav-border">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="bg-[#FBF7FF]">
              <tr>
                {["When", "Name", "Email", "Company", "Role", "Clients", "Price", "Timing", "Calculator", "Notes"].map((h) => (
                  <th key={h} className="px-3 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.submittedAt + r.email} className="border-t border-[#EEE8F7] align-top">
                  <td className="whitespace-nowrap px-3 py-2.5">{new Date(r.submittedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</td>
                  <td className="px-3 py-2.5">{r.name}</td>
                  <td className="px-3 py-2.5"><a className="text-[#7A4FD6] hover:underline" href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td className="px-3 py-2.5">{r.company ?? "—"}{r.website ? <span className="block text-xs text-body">{r.website}</span> : null}</td>
                  <td className="px-3 py-2.5">{r.role ?? "—"}</td>
                  <td className="px-3 py-2.5">{r.clients ?? "—"}</td>
                  <td className="px-3 py-2.5">{r.price ?? "—"}</td>
                  <td className="px-3 py-2.5">{r.timing ?? "—"}</td>
                  <td className="whitespace-nowrap px-3 py-2.5">{r.calculator ? `${r.calculator.clients} × $${r.calculator.price}` : "—"}</td>
                  <td className="max-w-xs px-3 py-2.5 text-body">{r.notes ?? ""}</td>
                </tr>
              ))}
              {total === 0 && (
                <tr><td colSpan={10} className="px-3 py-8 text-center text-body">No responses yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
