import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "About — 01LOT",
  description: "01LOT is the world's first skill-based trading arena. Built by ex-prop traders, market makers, and game designers.",
};

const principles = [
  { n: "01", t: "Skill over capital", b: "If you're good, you should be able to compete with $20. We took the prop-firm gate and threw it in the bin." },
  { n: "02", t: "Symmetric markets", b: "Both sides see the same chart, the same prints, the same spread. The only edge is the human at the keyboard." },
  { n: "03", t: "Money in, money out", b: "100% of winnings go to winners. We take a 4% rake on completed pools. No spread markup, no inactivity fees, no surprise charges." },
  { n: "04", t: "Trade or don't", b: "No drawdown rules. No scaling plans. No 'consistency rule.' Trade your way, or don't trade at all." },
];

const team = [
  { name: "Aisha N.", role: "Co-founder · CEO", from: "Ex-Citadel options market making" },
  { name: "Tom R.", role: "Co-founder · CTO", from: "Ex-Riot Games, ex-Polygon liquidity" },
  { name: "Marisol G.", role: "Head of Markets", from: "Ex-Jane Street, ex-FTX exchange ops" },
  { name: "Daniel K.", role: "Head of Product", from: "Ex-Robinhood, ex-Square Cash" },
  { name: "Priya S.", role: "Head of Trust", from: "Ex-Stripe Radar, ex-Block compliance" },
  { name: "Yuki H.", role: "Head of Design", from: "Ex-Linear, ex-Notion" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About 01LOT"
        title={
          <>
            <span className="block">We built the arena</span>
            <span className="block text-orange text-glow-orange">we wanted to trade in.</span>
          </>
        }
        lead="01LOT is the first skill-based trading arena. Pure 1v1 and tournament markets, real money, no prop-firm gatekeepers. We're a small team of ex-prop traders, market makers, and game designers who got tired of waiting for fairness to show up."
      >
        <div className="flex gap-3">
          <MagneticButton href="/careers" variant="primary">Join the team →</MagneticButton>
          <MagneticButton href="/press" variant="ghost">Press kit</MagneticButton>
        </div>
      </PageHeader>

      <PageSection>
        <span className="eyebrow">Principles</span>
        <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">
          Four rules. We don't break them.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.n} className="surface-card p-7">
              <div className="text-display text-[2rem] leading-none text-orange/90 text-glow-orange">{p.n}</div>
              <h3 className="text-display mt-4 text-xl tracking-wide text-text">{p.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-dim">{p.b}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-y border-line bg-bg-elev">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">Team</span>
            <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">
              Built by traders, not by VCs.
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-text-dim">
              23 people across NYC, London, and Singapore. We're hiring across markets, ML, and design.
            </p>
            <a href="/careers" className="mt-6 inline-flex items-center gap-2 text-mono text-[12px] uppercase tracking-widest text-orange hover:text-orange-bright">
              Open roles →
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {team.map((m) => (
              <div key={m.name} className="rounded-md border border-line bg-surface p-4">
                <div className="text-text font-medium">{m.name}</div>
                <div className="mt-0.5 text-[12.5px] text-orange">{m.role}</div>
                <div className="mt-1.5 text-[12.5px] text-text-muted">{m.from}</div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection>
        <span className="eyebrow">Backed by</span>
        <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">
          Patient capital. No exit pressure.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Ribbit Capital", "Founders Fund", "Citadel Ventures", "Index Ventures"].map((b) => (
            <div key={b} className="rounded-md border border-line bg-surface p-5 text-center text-[13.5px] uppercase tracking-widest text-text-dim">
              {b}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-[13px] text-text-muted">
          Plus 84 angel investors — many of them current 01LOT traders.
        </p>
      </PageSection>
    </PageShell>
  );
}
