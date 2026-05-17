import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Tournaments — 01LOT",
  description: "Single-elimination trading brackets. Up to 256 traders, prize pools up to $250,000.",
};

const brackets = [
  { tag: "Daily", name: "Major", size: "64 traders", pool: "$5,000", time: "Every day · 14:00 UTC", entry: "$25" },
  { tag: "Weekly", name: "Grand Prix", size: "128 traders", pool: "$25,000", time: "Sundays · 18:00 UTC", entry: "$100" },
  { tag: "Monthly", name: "Grand Slam", size: "256 traders", pool: "$250,000", time: "First Saturday · 16:00 UTC", entry: "$500" },
];

const schedule = [
  { time: "in 12m", name: "Daily Major #4,182", pool: "$5,000", seats: "47 / 64" },
  { time: "in 1h 04m", name: "Crypto Sprint", pool: "$2,500", seats: "12 / 32" },
  { time: "in 2h 20m", name: "FX Endurance", pool: "$10,000", seats: "118 / 128" },
  { time: "Sat 18:00", name: "Weekly Grand Prix", pool: "$25,000", seats: "94 / 128" },
];

export default function TournamentsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Tournament"
        title={
          <>
            <span className="block">Survive the bracket.</span>
            <span className="block text-orange text-glow-orange">Take the throne.</span>
          </>
        }
        lead="Single-elimination ladders. Up to 256 traders, six rounds, one champion. Pools up to $250,000 paid out to the top 16."
      >
        <div className="flex flex-wrap gap-3">
          <MagneticButton href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" variant="primary">Register for next bracket →</MagneticButton>
          <MagneticButton href="/leaderboards" variant="ghost">Past champions</MagneticButton>
        </div>
      </PageHeader>

      <PageSection>
        <span className="eyebrow">Formats</span>
        <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">Daily, weekly, monthly.</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {brackets.map((b) => (
            <div key={b.name} className="surface-card relative overflow-hidden p-7">
              <div className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange/15 blur-2xl" />
              <div className="relative">
                <div className="text-mono text-[11px] uppercase tracking-widest text-orange">{b.tag}</div>
                <h3 className="text-display mt-2 text-2xl tracking-wide text-text">{b.name}</h3>
                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4">
                  <Stat label="Field" value={b.size} />
                  <Stat label="Pool" value={b.pool} accent />
                  <Stat label="Schedule" value={b.time} />
                  <Stat label="Entry" value={b.entry} />
                </div>
                <a href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" className="mt-6 inline-flex items-center gap-2 text-mono text-[12px] uppercase tracking-widest text-orange transition hover:text-orange-bright">
                  Reserve a seat →
                </a>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-y border-line bg-bg-elev">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Upcoming</span>
            <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">Next bells</h2>
          </div>
          <a href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" className="text-mono text-[12px] uppercase tracking-widest text-orange hover:text-orange-bright">
            See all schedule →
          </a>
        </div>
        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-line bg-bg-elev/60 px-5 py-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
            <div>Start</div>
            <div>Event</div>
            <div>Pool</div>
            <div>Seats</div>
          </div>
          {schedule.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-[1fr_2fr_1fr_1fr] px-5 py-4 text-[14px] ${i ? "border-t border-line" : ""}`}
            >
              <div className="text-orange text-mono">{row.time}</div>
              <div className="text-text">{row.name}</div>
              <div className="text-text font-semibold">{row.pool}</div>
              <div className="text-text-dim">{row.seats}</div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <span className="eyebrow">Payouts</span>
        <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">Top 16 always pay.</h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-dim">
          Final four split 60% of the pool. Quarter-finalists split 25%. Round-of-16 finishers split 15%.
          Every payout settles to your wallet the moment the final bell rings.
        </p>
      </PageSection>
    </PageShell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-mono text-[10px] uppercase tracking-widest text-text-muted">{label}</div>
      <div className={`mt-1 text-[14px] font-semibold ${accent ? "text-orange" : "text-text"}`}>{value}</div>
    </div>
  );
}
