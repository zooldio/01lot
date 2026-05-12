import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Leaderboards — 01LOT",
  description: "Live skill ratings, weekly P&L, and the hall of fame. Climb the ranks of 01LOT.",
};

type Row = { rank: number; handle: string; rating: number; record: string; winnings: string; streak?: string };

const overall: Row[] = [
  { rank: 1, handle: "TAPED_OFFER", rating: 2841, record: "412W · 187L", winnings: "$284,120", streak: "11W" },
  { rank: 2, handle: "EUR_HUNTER", rating: 2792, record: "388W · 201L", winnings: "$241,580" },
  { rank: 3, handle: "ON_THE_BID", rating: 2755, record: "377W · 178L", winnings: "$218,940", streak: "6W" },
  { rank: 4, handle: "scalpel_jr", rating: 2698, record: "344W · 199L", winnings: "$197,210" },
  { rank: 5, handle: "DELTA_NIGHT", rating: 2671, record: "302W · 165L", winnings: "$181,400" },
  { rank: 6, handle: "thirty_one", rating: 2640, record: "298W · 192L", winnings: "$172,055" },
  { rank: 7, handle: "RIPSAW", rating: 2618, record: "271W · 184L", winnings: "$163,800", streak: "4W" },
  { rank: 8, handle: "atlas_fx", rating: 2587, record: "260W · 178L", winnings: "$152,610" },
  { rank: 9, handle: "ICEBERG_22", rating: 2562, record: "248W · 170L", winnings: "$144,300" },
  { rank: 10, handle: "wick_witch", rating: 2540, record: "236W · 162L", winnings: "$138,420" },
];

const weekly = [
  { handle: "MIDNIGHT_RUN", pnl: "+$24,840", winrate: "78%" },
  { handle: "fade_the_news", pnl: "+$18,210", winrate: "71%" },
  { handle: "OFF_THE_BOTTOM", pnl: "+$14,920", winrate: "69%" },
  { handle: "spreadsheet_ai", pnl: "+$11,640", winrate: "64%" },
  { handle: "QRT_ENJOYER", pnl: "+$10,510", winrate: "66%" },
];

export default function LeaderboardsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Leaderboards"
        title={
          <>
            <span className="block">Hall of</span>
            <span className="block text-orange text-glow-orange">winners.</span>
          </>
        }
        lead="ELO ratings update after every match. The board is public, the records are immutable, and the prize money is real."
      />

      <PageSection>
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">All-time</span>
            <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">Top 10 by rating</h2>
          </div>
          <div className="text-mono text-[11px] uppercase tracking-widest text-text-muted">
            Updated · 12 sec ago
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="grid grid-cols-[60px_2fr_1fr_1.4fr_1.2fr] border-b border-line bg-bg-elev/60 px-5 py-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
            <div>#</div>
            <div>Trader</div>
            <div>Rating</div>
            <div>Record</div>
            <div>Winnings</div>
          </div>
          {overall.map((r, i) => (
            <div
              key={r.handle}
              className={`grid grid-cols-[60px_2fr_1fr_1.4fr_1.2fr] items-center px-5 py-4 text-[14px] ${
                i ? "border-t border-line" : ""
              }`}
            >
              <div className={`text-display text-2xl leading-none ${r.rank <= 3 ? "text-orange text-glow-orange" : "text-text-muted"}`}>
                {String(r.rank).padStart(2, "0")}
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-bg-elev text-mono text-[11px] text-text-dim">
                  {r.handle.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="text-text font-medium">{r.handle}</div>
                  {r.streak && (
                    <div className="text-mono text-[10.5px] uppercase tracking-widest text-orange">
                      {r.streak} streak
                    </div>
                  )}
                </div>
              </div>
              <div className="text-text font-semibold tabular-nums">{r.rating}</div>
              <div className="text-text-dim">{r.record}</div>
              <div className="text-text font-semibold tabular-nums">{r.winnings}</div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t border-line bg-bg-elev">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow">This week</span>
            <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">Hot hands</h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-text-dim">
              The week's P&L leaders. Reset every Monday at 00:00 UTC. Top 3 receive a bonus seat in the
              weekly Grand Prix.
            </p>
          </div>
          <div className="space-y-2">
            {weekly.map((w, i) => (
              <div
                key={w.handle}
                className="grid grid-cols-[40px_2fr_1fr_1fr] items-center rounded-md border border-line bg-surface px-4 py-3"
              >
                <div className="text-display text-xl text-orange">{i + 1}</div>
                <div className="text-text">{w.handle}</div>
                <div className="text-text font-semibold tabular-nums">{w.pnl}</div>
                <div className="text-text-dim text-[13px]">Winrate {w.winrate}</div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
