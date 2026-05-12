import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PaymentIcon } from "@/components/ui/payment-icons";
import { payments } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Payments — 01LOT",
  description:
    "Deposit and withdraw on 30+ rails — cards, crypto, instant bank transfer, USSD, and mobile money across Africa. Fees, limits, and processing times.",
};

/* Category headline copy — one short line per category */
const categoryBlurbs: Record<string, string> = {
  cards: "Visa & Mastercard debit and credit. Instant deposit, 3D-Secure on every transaction.",
  crypto:
    "Self-custody friendly. Deposit on-chain, withdraw to your wallet within five minutes — most rails settle in seconds.",
  bank: "Instant local-rail bank transfers in the EU, UK, and US, plus dedicated virtual IBANs for traders who move often.",
  africa:
    "Native integrations with the wallets you already use. Pay the merchant code from your phone — no app switching.",
};

/* Per-method min / max — keeps the page concrete instead of generic */
const limitsByCategory: Record<string, { min: string; max: string; settles: string }> = {
  cards: { min: "$20", max: "$5,000 / tx · $25,000 / mo", settles: "Deposit instant · withdraw 1–3 business days" },
  crypto: { min: "$10", max: "No upper limit", settles: "Deposit on-chain · withdraw under 5 min" },
  bank: { min: "$20", max: "$250,000 / tx", settles: "Instant on supported rails" },
  africa: { min: "$5 equivalent", max: "Local-tier daily limits apply", settles: "Instant deposit · withdraw under 2 min" },
};

export default function PaymentsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow={payments.eyebrow}
        title={
          <>
            <span className="block">Pay in. Cash out.</span>
            <span className="block text-orange text-glow-orange">Anywhere.</span>
          </>
        }
        lead={payments.subtitle}
      >
        <div className="flex flex-wrap gap-3">
          <MagneticButton href="/signup" variant="primary">
            Open an account →
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost">
            Talk to payments
          </MagneticButton>
        </div>
      </PageHeader>

      {/* Quick snapshot — fees + clearing */}
      <PageSection>
        <div className="grid gap-4 sm:grid-cols-3">
          <SnapshotCard
            label="House rake"
            value="4%"
            note="Of the prize pool on completed matches. That's the only fee we charge."
          />
          <SnapshotCard
            label="No spread markup"
            value="0 bps"
            note="You pay the same price the venue prints. We don't widen quotes."
          />
          <SnapshotCard
            label="Withdraw window"
            value="Under 5 min"
            note="On crypto, USSD, and most mobile-money rails. Bank: 1–3 days."
          />
        </div>
      </PageSection>

      {/* Each category */}
      {payments.categories.map((cat) => {
        const limits = limitsByCategory[cat.id];
        return (
          <PageSection key={cat.id} className={cat.id === "africa" ? "border-y border-line bg-bg-elev" : ""}>
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <span className="eyebrow">{cat.label}</span>
                <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">
                  {cat.methods.length} rail{cat.methods.length === 1 ? "" : "s"}
                </h2>
                <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-text-dim">
                  {categoryBlurbs[cat.id]}
                </p>
                {limits && (
                  <dl className="mt-6 space-y-2 text-[13px]">
                    <Row k="Min deposit" v={limits.min} />
                    <Row k="Max / limit" v={limits.max} />
                    <Row k="Clearing" v={limits.settles} />
                  </dl>
                )}
              </div>

              <div className="overflow-hidden rounded-xl border border-line bg-surface">
                <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-bg-elev/60 px-5 py-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
                  <div>Method</div>
                  <div>Deposit</div>
                  <div>Withdraw</div>
                </div>
                {cat.methods.map((m, i) => {
                  const mm = m as { name: string; note: string; deposit?: string; withdraw?: string };
                  return (
                    <div
                      key={mm.name}
                      className={`grid grid-cols-[1.4fr_1fr_1fr] items-center px-5 py-4 ${i ? "border-t border-line" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-md ring-1 ring-line">
                          <PaymentIcon name={mm.name} className="h-full w-full" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-medium text-text">{mm.name}</div>
                          <div className="mt-0.5 truncate text-[12px] text-text-muted">{mm.note}</div>
                        </div>
                      </div>
                      <div className="text-[13px] text-text-dim">{mm.deposit ?? "—"}</div>
                      <div className="text-[13px] text-text-dim">{mm.withdraw ?? "—"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </PageSection>
        );
      })}

      {/* Compliance / safety */}
      <PageSection>
        <span className="eyebrow">Compliance</span>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">
          Your money sits in segregated client accounts.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Capsule t="Segregated funds" b="Held with tier-1 banks across UK, EU, and Africa. Never lent, never margined." />
          <Capsule t="PCI-DSS Level 1" b="Card data tokenised; nothing sensitive ever touches our servers." />
          <Capsule t="3D-Secure 2" b="Every card transaction is challenge-flow enrolled. Chargebacks under 0.08%." />
          <Capsule t="KYC at signup" b="Every country supported. Most users clear in under 90 seconds." />
        </div>
        <p className="mt-8 text-[13px] text-text-muted">
          Regulator and licence detail at <a href="/compliance" className="text-orange underline-offset-4 hover:underline">compliance</a>.
          Full risk disclosure at <a href="/risk" className="text-orange underline-offset-4 hover:underline">risk</a>.
        </p>
      </PageSection>

      <PageSection className="border-t border-line bg-bg-elev">
        <div className="surface-card relative overflow-hidden p-10 sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-radial-orange opacity-50" />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-display text-[clamp(1.75rem,3.6vw,2.6rem)] text-text">
                Ready to put real money on a match?
              </h2>
              <p className="mt-2 text-[14.5px] text-text-dim">
                Open an account in 90 seconds. Pick your rail at deposit. First match starts immediately.
              </p>
            </div>
            <MagneticButton href="/signup" variant="primary">
              Enter the arena →
            </MagneticButton>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}

function SnapshotCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="surface-card p-6">
      <div className="text-mono text-[11px] uppercase tracking-widest text-text-muted">{label}</div>
      <div className="text-display mt-2 text-[2.25rem] leading-none text-orange text-glow-orange">
        {value}
      </div>
      <p className="mt-3 text-[13.5px] leading-relaxed text-text-dim">{note}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 border-b border-line/60 py-2">
      <dt className="text-mono text-[11px] uppercase tracking-widest text-text-muted">{k}</dt>
      <dd className="text-text">{v}</dd>
    </div>
  );
}

function Capsule({ t, b }: { t: string; b: string }) {
  return (
    <div className="rounded-md border border-line bg-surface p-5">
      <h3 className="text-[14px] font-semibold uppercase tracking-wider text-text">{t}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-text-dim">{b}</p>
    </div>
  );
}
