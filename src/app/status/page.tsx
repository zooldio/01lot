import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "System status — 01LOT",
  description: "Live status of the 01LOT match engine, market data feed, payouts, and APIs.",
};

const systems = [
  { name: "Match Engine", state: "operational", desc: "Matchmaking and settlement." },
  { name: "Market Data — FX", state: "operational", desc: "EUR/USD, GBP/USD, USD/JPY, all majors." },
  { name: "Market Data — Crypto", state: "operational", desc: "Top-30 USDT pairs." },
  { name: "Market Data — Commodities", state: "operational", desc: "Gold, oil, indices." },
  { name: "Payouts — Crypto rail", state: "operational", desc: "USDC, USDT, BTC, ETH." },
  { name: "Payouts — Bank rail (US/EU/UK)", state: "degraded", desc: "Settlement delayed 60–90 min by partner bank maintenance." },
  { name: "REST API",  state: "operational", desc: "api.01lot.example" },
  { name: "WebSocket stream", state: "operational", desc: "wss.01lot.example" },
  { name: "Web app", state: "operational", desc: "01lot.example" },
  { name: "Mobile (iOS / Android)", state: "operational", desc: "v3.14.0" },
];

const incidents = [
  {
    date: "2026-05-09",
    title: "Bank rail settlement delayed",
    status: "Investigating",
    body: "Partner bank reported scheduled maintenance window 03:00–05:00 UTC. Crypto rail unaffected. Bank withdrawals queued, expected to clear by 05:30 UTC.",
  },
  {
    date: "2026-04-22",
    title: "Match Engine elevated latency",
    status: "Resolved",
    body: "Identified a slow query in tournament bracket draw. Patched and verified. No matches affected, no settlement issues.",
  },
  {
    date: "2026-03-30",
    title: "WS stream backpressure",
    status: "Resolved",
    body: "Investigated client reports of dropped events on the spectator firehose. Root cause: a connection pool exhaustion in our edge layer. Fixed, capacity doubled.",
  },
];

const stateColor: Record<string, string> = {
  operational: "bg-orange",
  degraded: "bg-orange-bright",
  outage: "bg-cyan",
};
const stateLabel: Record<string, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

export default function StatusPage() {
  const degraded = systems.some((s) => s.state !== "operational");
  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources · Status"
        title={degraded ? "Partial degradation." : "All systems operational."}
        lead="Real-time view of the engine, market data, payouts, and APIs. Updates every 30 seconds."
      />

      <PageSection>
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          {systems.map((s, i) => (
            <div
              key={s.name}
              className={`grid grid-cols-[1fr_auto] items-center px-5 py-4 sm:grid-cols-[1.5fr_2fr_auto] ${i ? "border-t border-line" : ""}`}
            >
              <div>
                <div className="text-text font-medium">{s.name}</div>
                <div className="mt-0.5 text-[12.5px] text-text-muted">{s.desc}</div>
              </div>
              <div className="hidden text-[12.5px] text-text-dim sm:block">90-day uptime · <span className="text-text font-semibold tabular-nums">{(99.9 - i * 0.02).toFixed(2)}%</span></div>
              <div className="flex items-center justify-end gap-2 text-mono text-[11.5px] uppercase tracking-widest text-text-dim">
                <span className={`h-2 w-2 rounded-full ${stateColor[s.state]}`} />
                {stateLabel[s.state]}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t border-line bg-bg-elev">
        <span className="eyebrow">Incident history</span>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">Last 60 days</h2>
        <div className="mt-8 space-y-3">
          {incidents.map((it) => (
            <article key={it.title} className="surface-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-mono text-[11.5px] uppercase tracking-widest text-text-muted">{it.date}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-mono text-[10.5px] uppercase tracking-widest ${
                  it.status === "Resolved" ? "bg-orange/15 text-orange" : "bg-orange-bright/15 text-orange-bright"
                }`}>
                  {it.status}
                </span>
              </div>
              <h3 className="text-display mt-3 text-xl tracking-wide text-text">{it.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-dim">{it.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-text-muted">
          Subscribe to incident updates by RSS or email — link in your account settings.
        </p>
      </PageSection>
    </PageShell>
  );
}
