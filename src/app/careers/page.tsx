import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Careers — 01LOT",
  description: "Help us build the skill-based trading arena. Open roles in markets, engineering, design, and trust.",
};

const roles = [
  { team: "Markets",     title: "Senior Quant — Match Engine",      loc: "NYC · Hybrid",      type: "Full-time" },
  { team: "Engineering", title: "Staff Engineer — Trading Core",     loc: "Remote (US, EU)",   type: "Full-time" },
  { team: "Engineering", title: "Senior Engineer — Realtime Infra",   loc: "London · Hybrid",  type: "Full-time" },
  { team: "Engineering", title: "Mobile Engineer — iOS",              loc: "NYC · Hybrid",     type: "Full-time" },
  { team: "Design",      title: "Product Designer — Spectator",       loc: "Remote (EU)",      type: "Full-time" },
  { team: "Trust",       title: "Compliance Lead — EU Markets",       loc: "London · Hybrid",  type: "Full-time" },
  { team: "Markets",     title: "Quant Analyst — Tournament Brackets", loc: "Singapore",        type: "Full-time" },
  { team: "Operations",  title: "Customer Operations — Weekends",     loc: "Remote",          type: "Part-time" },
];

const perks = [
  { t: "Top of band", b: "P85 cash, P90 equity. Salary bands are public to all employees." },
  { t: "Real ownership", b: "Every full-timer gets ISOs with a 10-year exercise window." },
  { t: "Health & WFH", b: "Top-tier health/dental/vision globally; $3,500 home office; €100/mo home internet." },
  { t: "Time off", b: "30 days PTO minimum (we audit, we enforce). 16 weeks paid parental leave." },
  { t: "Real markets budget", b: "$10k/year personal trading budget. We expect you to use the product you build." },
  { t: "Two onsites a year", b: "Whole company gets together. Last two: Lisbon and Kyoto." },
];

const teams = ["Markets", "Engineering", "Design", "Trust", "Operations"];

export default function CareersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            <span className="block">Build the arena</span>
            <span className="block text-orange text-glow-orange">with us.</span>
          </>
        }
        lead="23 of us today. Roughly 50 by the end of the year. We hire for intellectual honesty, low ego, and a bias toward small bets that compound. If that's you, read on."
      />

      <PageSection>
        <span className="eyebrow">Open roles</span>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">8 roles, 5 teams</h2>

        <div className="mt-8 flex flex-wrap gap-2">
          {teams.map((t) => (
            <span key={t} className="rounded-full border border-line-strong bg-surface px-3 py-1 text-mono text-[11px] uppercase tracking-wider text-text-dim">
              {t} · {roles.filter((r) => r.team === t).length}
            </span>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="grid grid-cols-[1fr_3fr_2fr_1fr_auto] gap-4 border-b border-line bg-bg-elev/60 px-5 py-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
            <div>Team</div>
            <div>Role</div>
            <div>Location</div>
            <div>Type</div>
            <div />
          </div>
          {roles.map((r, i) => (
            <a
              key={r.title}
              href="#"
              className={`grid grid-cols-[1fr_3fr_2fr_1fr_auto] items-center gap-4 px-5 py-4 text-[14px] transition hover:bg-bg-elev/60 ${
                i ? "border-t border-line" : ""
              }`}
            >
              <div className="text-orange">{r.team}</div>
              <div className="text-text font-medium">{r.title}</div>
              <div className="text-text-dim">{r.loc}</div>
              <div className="text-text-dim">{r.type}</div>
              <div className="text-orange text-mono text-[11px] uppercase tracking-widest">Apply →</div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-text-muted">
          Don't see your role?{" "}
          <a href="mailto:jobs@01lot.example" className="text-orange underline-offset-4 hover:underline">
            jobs@01lot.example
          </a>{" "}
          — we look at every CV.
        </p>
      </PageSection>

      <PageSection className="border-t border-line bg-bg-elev">
        <span className="eyebrow">What you'll get</span>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">The package</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <div key={p.t} className="surface-card p-6">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider text-text">{p.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-dim">{p.b}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
