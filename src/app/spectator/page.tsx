import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Spectator — 01LOT",
  description: "Watch live duels and tournament finals. See both sides of the screen in real time.",
};

const liveMatches = [
  { id: "M-2841", pair: "EUR/USD", window: "30m", pot: "$1,200", a: { name: "TAPED_OFFER", pnl: "+$214" }, b: { name: "EUR_HUNTER", pnl: "−$48" } },
  { id: "M-2842", pair: "BTC/USD", window: "5m sprint", pot: "$400", a: { name: "scalpel_jr", pnl: "+$92" }, b: { name: "RIPSAW", pnl: "+$31" } },
  { id: "M-2843", pair: "XAU/USD", window: "4h marathon", pot: "$5,000", a: { name: "DELTA_NIGHT", pnl: "−$112" }, b: { name: "ICEBERG_22", pnl: "+$310" } },
  { id: "M-2844", pair: "NAS100", window: "30m", pot: "$2,500", a: { name: "thirty_one", pnl: "+$405" }, b: { name: "atlas_fx", pnl: "+$118" } },
];

export default function SpectatorPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Spectator"
        title={
          <>
            <span className="block">See both sides</span>
            <span className="block text-orange text-glow-orange">of the screen.</span>
          </>
        }
        lead="Watch every duel and tournament final in real time. Their entries, their stops, their P&L — fully transparent the moment a match ends."
      >
        <MagneticButton href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" variant="primary">Watch free →</MagneticButton>
      </PageHeader>

      <PageSection>
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">Live now</span>
            <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">847 matches in progress</h2>
          </div>
          <div className="text-mono text-[11px] uppercase tracking-widest text-orange">
            <span className="inline-block h-2 w-2 rounded-full bg-orange align-middle mr-2 animate-pulse-glow" />
            Streaming
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {liveMatches.map((m) => (
            <div key={m.id} className="surface-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-5 py-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
                <span>{m.id} · {m.pair} · {m.window}</span>
                <span className="text-orange">Pot {m.pot}</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-line">
                <Side name={m.a.name} pnl={m.a.pnl} side="left" />
                <Side name={m.b.name} pnl={m.b.pnl} side="right" />
              </div>
              <div className="border-t border-line px-5 py-3 text-right">
                <a href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" className="text-mono text-[11.5px] uppercase tracking-widest text-orange hover:text-orange-bright">
                  Open the room →
                </a>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t border-line bg-bg-elev">
        <span className="eyebrow">What you can see</span>
        <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">
          Every fill. Every stop.
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Position log", b: "Both sides' entries, exits, and size — written to a public ledger." },
            { t: "Live P&L", b: "Updated tick by tick. Match the chart you're seeing with what they're seeing." },
            { t: "Heat map", b: "Where money's flowing across all active matches by symbol and timeframe." },
            { t: "Final replay", b: "Scrub the entire match after the bell. Bookmark key moments." },
            { t: "Commentary feed", b: "Top traders react in a side chat. Auto-moderated, no spam." },
            { t: "No skip ads", b: "We don't sell your eyeballs. Spectator mode is free for everyone." },
          ].map((f) => (
            <li key={f.t} className="surface-card p-5">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider text-text">{f.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-dim">{f.b}</p>
            </li>
          ))}
        </ul>
      </PageSection>
    </PageShell>
  );
}

function Side({ name, pnl, side }: { name: string; pnl: string; side: "left" | "right" }) {
  const positive = pnl.startsWith("+");
  return (
    <div className={`p-5 ${side === "left" ? "" : "text-right"}`}>
      <div className="text-mono text-[10.5px] uppercase tracking-widest text-text-muted">
        {side === "left" ? "Trader A" : "Trader B"}
      </div>
      <div className="mt-1 text-text font-semibold">{name}</div>
      <div className={`text-display mt-3 text-3xl ${positive ? "text-orange text-glow-orange" : "text-cyan"}`}>
        {pnl}
      </div>
    </div>
  );
}
