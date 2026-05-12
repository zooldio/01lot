import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Press — 01LOT",
  description: "01LOT press kit, brand assets, founder bios, and media contact.",
};

const releases = [
  { date: "2026-04-22", t: "01LOT crosses $250M in tournament prize money paid out", outlet: "Press release" },
  { date: "2026-03-08", t: "Series B: $42M led by Ribbit to expand into Asia", outlet: "Press release" },
  { date: "2026-01-14", t: "Skill-Based Markets API opens to third-party brokers", outlet: "Press release" },
  { date: "2025-11-30", t: "01LOT becomes available in 64 countries after EMI license", outlet: "Press release" },
];

const coverage = [
  { outlet: "Bloomberg", t: "The retail prop firm killer is a video game", date: "2026-04-30" },
  { outlet: "Wired", t: "Inside 01LOT, where trading is a sport", date: "2026-03-12" },
  { outlet: "The Block", t: "Tournament finance: the new on-chain primitive?", date: "2026-02-04" },
  { outlet: "TechCrunch", t: "01LOT raises $42M to scale skill-based trading", date: "2026-01-22" },
];

export default function PressPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Press & media"
        title={<>The 01LOT press kit.</>}
        lead="Logos, brand guidelines, founder bios, and the lines we lift verbatim. Anything missing? Email press@01lot.example — we reply same-day."
      />

      <PageSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Brand assets ZIP", b: "Logos (light, dark, mark), wordmark, type lockups in SVG + PNG. ~12 MB.", c: "Download" },
            { t: "Founder portraits", b: "High-res raw + retouched. CEO, CTO, COO, all production-ready.", c: "Download" },
            { t: "Fact sheet (PDF)", b: "One-page deck: traction, team, mission, contact. Updated 2026-04.", c: "Download" },
          ].map((card) => (
            <a key={card.t} href="#" className="surface-card group flex flex-col p-6 transition hover:border-orange/40">
              <h3 className="text-display text-xl tracking-wide text-text">{card.t}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-text-dim">{card.b}</p>
              <span className="mt-5 text-mono text-[12px] uppercase tracking-widest text-orange transition group-hover:text-orange-bright">
                {card.c} →
              </span>
            </a>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-y border-line bg-bg-elev">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Latest releases</span>
            <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">From us</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {releases.map((r) => (
                <li key={r.t} className="py-4">
                  <div className="text-mono text-[11px] uppercase tracking-widest text-text-muted">{r.date} · {r.outlet}</div>
                  <a href="#" className="mt-1 block text-[15px] text-text hover:text-orange">{r.t}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow">In the news</span>
            <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">From them</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {coverage.map((r) => (
                <li key={r.t} className="py-4">
                  <div className="text-mono text-[11px] uppercase tracking-widest text-orange">{r.outlet}</div>
                  <a href="#" className="mt-1 block text-[15px] text-text hover:text-orange">{r.t}</a>
                  <div className="text-mono text-[11px] uppercase tracking-widest text-text-muted">{r.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className="surface-card p-8 sm:p-10">
          <span className="eyebrow">Media contact</span>
          <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">Marisol G., Communications</h2>
          <p className="mt-3 text-[15px] text-text-dim">
            <a href="mailto:press@01lot.example" className="text-orange underline-offset-4 hover:underline">
              press@01lot.example
            </a>{" "}
            · Response under 4 hours, every weekday.
          </p>
        </div>
      </PageSection>
    </PageShell>
  );
}
