import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "API docs — 01LOT",
  description: "01LOT REST + WebSocket APIs. Match creation, settlement events, leaderboard data, and tournament feeds.",
};

const endpoints = [
  { method: "GET",  path: "/v1/matches/live",        desc: "Stream of currently-active matches." },
  { method: "GET",  path: "/v1/matches/{id}",        desc: "Match detail incl. positions, P&L, settlement state." },
  { method: "POST", path: "/v1/matches",             desc: "Create a 1v1 challenge. Returns matchmaking ticket." },
  { method: "POST", path: "/v1/orders",              desc: "Place an order inside an open match." },
  { method: "GET",  path: "/v1/tournaments",         desc: "Upcoming and in-progress tournament list." },
  { method: "GET",  path: "/v1/tournaments/{id}",    desc: "Bracket detail, including the live ladder." },
  { method: "GET",  path: "/v1/leaderboards/{type}", desc: "All-time ELO or weekly P&L leaderboards." },
  { method: "WS",   path: "/v1/stream",              desc: "Real-time event firehose. Fills, P&L updates, settlement." },
];

export default function ApiDocsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources · API"
        title={
          <>
            <span className="block">REST + WebSocket.</span>
            <span className="block text-orange text-glow-orange">Built for trading bots.</span>
          </>
        }
        lead="Issue an API key from your account dashboard. All endpoints are JSON-over-HTTPS, with a parallel WebSocket firehose for low-latency events."
      >
        <a href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" className="btn-primary !text-[12px]">Get an API key →</a>
      </PageHeader>

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">Quickstart</span>
            <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">3 lines, first match</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-text-dim">
              Authenticate with a bearer token. Create a challenge. Listen for settlement on the WS
              stream. That's it.
            </p>
          </div>

          <pre className="overflow-x-auto rounded-xl border border-line bg-surface p-5 text-mono text-[12.5px] leading-relaxed text-text-dim">
{`curl -X POST https://api.01lot.example/v1/matches \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "symbol": "EUR/USD",
    "window": "30m",
    "stake": 200
  }'

# → { "match_id": "M-2841", "status": "awaiting_opponent" }`}
          </pre>
        </div>
      </PageSection>

      <PageSection className="border-y border-line bg-bg-elev">
        <span className="eyebrow">Endpoints</span>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">Reference</h2>

        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="grid grid-cols-[80px_1.4fr_2fr] border-b border-line bg-bg-elev/60 px-5 py-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
            <div>Method</div>
            <div>Path</div>
            <div>Description</div>
          </div>
          {endpoints.map((e, i) => (
            <div
              key={e.path + e.method}
              className={`grid grid-cols-[80px_1.4fr_2fr] items-center px-5 py-4 text-[14px] ${i ? "border-t border-line" : ""}`}
            >
              <div className={`text-mono text-[11.5px] font-semibold ${
                e.method === "GET" ? "text-cyan" : e.method === "POST" ? "text-orange" : "text-orange-bright"
              }`}>
                {e.method}
              </div>
              <code className="text-mono text-[13px] text-text">{e.path}</code>
              <div className="text-text-dim">{e.desc}</div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-text-muted">
          Full OpenAPI spec at <code className="rounded bg-surface px-1.5 py-0.5 text-mono text-[12.5px] text-text">api.01lot.example/openapi.json</code> ·
          Rate limit: 600 req/min, 50 WS connections per key.
        </p>
      </PageSection>

      <PageSection>
        <div className="grid gap-5 sm:grid-cols-3">
          <a href="#" className="surface-card group p-6 transition hover:border-orange/40">
            <h3 className="text-display text-xl tracking-wide text-text">SDKs</h3>
            <p className="mt-2 text-[14px] text-text-dim">Python, TypeScript, Go, Rust — all open source.</p>
            <span className="mt-4 inline-block text-mono text-[12px] uppercase tracking-widest text-orange">github →</span>
          </a>
          <a href="#" className="surface-card group p-6 transition hover:border-orange/40">
            <h3 className="text-display text-xl tracking-wide text-text">Sandbox</h3>
            <p className="mt-2 text-[14px] text-text-dim">Paper-trade against simulated opponents. Free, no KYC.</p>
            <span className="mt-4 inline-block text-mono text-[12px] uppercase tracking-widest text-orange">sandbox.01lot.example →</span>
          </a>
          <a href="/contact" className="surface-card group p-6 transition hover:border-orange/40">
            <h3 className="text-display text-xl tracking-wide text-text">Developer support</h3>
            <p className="mt-2 text-[14px] text-text-dim">Slack channel for serious integrations. Email <code className="text-orange">dev@01lot.example</code>.</p>
            <span className="mt-4 inline-block text-mono text-[12px] uppercase tracking-widest text-orange">request access →</span>
          </a>
        </div>
      </PageSection>
    </PageShell>
  );
}
