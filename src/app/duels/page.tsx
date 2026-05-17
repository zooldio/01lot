import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "1v1 Duels — 01LOT",
  description: "Head-to-head trading duels. Same symbol, same window, same starting balance. Highest P&L wins the pot.",
};

const formats = [
  { len: "5 min", name: "Sprint", desc: "Tick-by-tick. Pure scalping. Reflex over rumination.", stake: "$20–$500" },
  { len: "30 min", name: "Standard", desc: "The classic duel. Long enough to think, short enough to bleed.", stake: "$20–$2,500" },
  { len: "4 hours", name: "Marathon", desc: "Position sizing matters. So does your sleep schedule.", stake: "$100–$5,000" },
  { len: "24 hours", name: "Endurance", desc: "A full session against one opponent. Drawdown is the test.", stake: "$200–$5,000" },
];

const rules = [
  { t: "Same starting balance", b: "Both traders start at exactly $10,000 virtual P&L. Real stake sits in escrow." },
  { t: "Same symbol", b: "You and your opponent trade the same instrument. Pre-agreed before the bell." },
  { t: "Same window", b: "Match opens and closes on the second. No early exits, no late entries." },
  { t: "No copy trades", b: "Your trades are private to you until settlement. Mirror-trading bots are banned." },
];

export default function DuelsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="1v1 Duel"
        title={
          <>
            <span className="block">One pair.</span>
            <span className="block text-orange text-glow-orange">One winner.</span>
          </>
        }
        lead="Pick an opponent at your skill level. Same symbol, same window, same starting balance. Highest P&L at the buzzer takes the pot. Match in under 90 seconds."
      >
        <div className="flex flex-wrap gap-3">
          <MagneticButton href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" variant="primary">Find an opponent →</MagneticButton>
          <MagneticButton href="/spectator" variant="ghost">Watch a live duel</MagneticButton>
        </div>
      </PageHeader>

      <PageSection>
        <span className="eyebrow">Formats</span>
        <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">Four windows. Same fight.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => (
            <div key={f.name} className="surface-card p-6">
              <div className="text-mono text-[11px] uppercase tracking-widest text-orange">{f.len}</div>
              <h3 className="text-display mt-2 text-xl tracking-wide text-text">{f.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-text-dim">{f.desc}</p>
              <div className="mt-5 border-t border-line pt-3 text-[12.5px] text-text-muted">
                Stake range: <span className="text-text">{f.stake}</span>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-y border-line bg-bg-elev">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="eyebrow">Rules of engagement</span>
            <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">
              Symmetric by design.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-dim">
              We strip every advantage you didn't earn. Both sides start identical — what diverges is your decisions.
            </p>
          </div>
          <ul className="grid gap-4">
            {rules.map((r) => (
              <li key={r.t} className="surface-card p-5">
                <h3 className="text-[14px] font-semibold uppercase tracking-wider text-text">{r.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-dim">{r.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>

      <PageSection>
        <div className="surface-card relative overflow-hidden p-10 sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-radial-orange opacity-50" />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-display text-[clamp(1.75rem,3.6vw,2.6rem)] text-text">Ready to find an opponent?</h2>
              <p className="mt-2 text-[14.5px] text-text-dim">Average match time: 87 seconds.</p>
            </div>
            <MagneticButton href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" variant="primary">Enter the arena →</MagneticButton>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
