import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { Field } from "@/components/ui/form-field";

export const metadata: Metadata = {
  title: "Contact — 01LOT",
  description: "Talk to support, press, partnerships, or compliance. Most replies inside 4 hours.",
};

const desks = [
  { tag: "Support", email: "help@01lot.example", desc: "Account, payouts, KYC, match disputes. Live 24/7." },
  { tag: "Press", email: "press@01lot.example", desc: "Media requests, interviews, brand assets." },
  { tag: "Partnerships", email: "bd@01lot.example", desc: "Brokers, prop firms, exchanges, hedge funds." },
  { tag: "Compliance", email: "compliance@01lot.example", desc: "Law enforcement requests, regulator queries, KYC escalations." },
  { tag: "Security", email: "security@01lot.example", desc: "Responsible disclosure, bug bounty. PGP available." },
];

const offices = [
  { city: "New York", line1: "201 Park Ave South, Floor 8", line2: "New York, NY 10003" },
  { city: "London", line1: "5 Bishopsgate, Floor 14", line2: "London, EC2N 3AR" },
  { city: "Singapore", line1: "1 Raffles Quay, North Tower #44-01", line2: "Singapore 048583" },
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            <span className="block">We answer in</span>
            <span className="block text-orange text-glow-orange">under 4 hours.</span>
          </>
        }
        lead="Real humans, not chatbots. Pick the right inbox below — or use the form and we'll route you."
      />

      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Form */}
          <form action="#" method="post" className="surface-card p-6 sm:p-8">
            <h2 className="text-display text-[1.5rem] tracking-wide text-text">Send us a message</h2>
            <div className="mt-7 space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Your name" required>
                  <input type="text" name="name" required autoComplete="name" className="input" />
                </Field>
                <Field label="Email" required>
                  <input type="email" name="email" required autoComplete="email" className="input" />
                </Field>
              </div>
              <Field label="Topic" required>
                <select required name="topic" className="input" defaultValue="">
                  <option value="" disabled>Choose a topic…</option>
                  <option>Support / account</option>
                  <option>Press / media</option>
                  <option>Partnership</option>
                  <option>Compliance</option>
                  <option>Security disclosure</option>
                  <option>Something else</option>
                </select>
              </Field>
              <Field label="Message" required>
                <textarea
                  required
                  name="message"
                  rows={6}
                  className="input"
                  placeholder="Tell us what's up. Account ID helps if you have one."
                />
              </Field>
              <button type="submit" className="btn-primary w-full justify-center !text-[13px]">
                Send →
              </button>
            </div>
          </form>

          {/* Desks */}
          <div>
            <span className="eyebrow">Direct desks</span>
            <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">Pick the right inbox</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {desks.map((d) => (
                <li key={d.tag} className="grid grid-cols-[100px_1fr] gap-3 py-4">
                  <div className="text-mono text-[11px] uppercase tracking-widest text-orange">{d.tag}</div>
                  <div>
                    <a href={`mailto:${d.email}`} className="text-text hover:text-orange">{d.email}</a>
                    <p className="mt-1 text-[13.5px] text-text-dim">{d.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection className="border-t border-line bg-bg-elev">
        <span className="eyebrow">Offices</span>
        <h2 className="text-display mt-3 text-[clamp(1.5rem,3vw,2rem)] text-text">Three cities</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {offices.map((o) => (
            <div key={o.city} className="surface-card p-6">
              <div className="text-display text-2xl tracking-wide text-text">{o.city}</div>
              <div className="mt-2 text-[14px] text-text-dim">{o.line1}</div>
              <div className="text-[14px] text-text-dim">{o.line2}</div>
            </div>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}

