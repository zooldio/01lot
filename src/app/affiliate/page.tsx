import type { Metadata } from "next";
import { PageShell, PageHeader, PageSection } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Affiliate Program — 01LOT",
  description: "Earn 25% of rake on every match your referrals play. Lifetime, no cap.",
};

const tiers = [
  { name: "Starter",  refs: "1–24 active referrals", share: "20%", payout: "Monthly" },
  { name: "Pro",      refs: "25–99 active referrals", share: "25%", payout: "Bi-weekly", highlight: true },
  { name: "Whale",    refs: "100+ active referrals",  share: "30%", payout: "Weekly" },
];

export default function AffiliatePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources · Affiliate"
        title={
          <>
            <span className="block">Refer a trader.</span>
            <span className="block text-orange text-glow-orange">Earn for life.</span>
          </>
        }
        lead="Share your link, get paid 20–30% of the house rake on every match your referrals play. No cap, no expiry, no minimum payout."
      >
        <MagneticButton href="https://zero-one-lot-instance-hzo6th.eu1.zitadel.cloud/ui/login/loginname" variant="primary">Get your link →</MagneticButton>
      </PageHeader>

      <PageSection>
        <span className="eyebrow">Tiers</span>
        <h2 className="text-display mt-3 text-[clamp(2rem,4vw,3rem)] text-text">Three rungs.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`surface-card p-7 ${t.highlight ? "ring-1 ring-orange/50" : ""} relative overflow-hidden`}
            >
              {t.highlight && (
                <span className="absolute right-4 top-4 rounded-full bg-orange px-2 py-0.5 text-mono text-[10px] uppercase tracking-widest text-bg">
                  Most picked
                </span>
              )}
              <h3 className="text-display text-2xl tracking-wide text-text">{t.name}</h3>
              <p className="mt-1 text-[13px] text-text-muted">{t.refs}</p>
              <div className="text-display mt-6 text-[3rem] leading-none text-orange text-glow-orange">{t.share}</div>
              <p className="mt-2 text-[12.5px] uppercase tracking-widest text-text-dim">of rake on referred matches</p>
              <div className="mt-6 border-t border-line pt-4 text-[13px] text-text-dim">
                Payout cadence · <span className="text-text">{t.payout}</span>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-y border-line bg-bg-elev">
        <span className="eyebrow">How it works</span>
        <h2 className="text-display mt-3 text-[clamp(1.75rem,3.6vw,2.5rem)] text-text">Three steps. Like everything else here.</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            { n: "01", t: "Sign up", b: "Anyone with an 01LOT account is eligible. No application." },
            { n: "02", t: "Share your link", b: "Auto-attribution via cookie + device fingerprint. Cookie lasts 90 days." },
            { n: "03", t: "Get paid", b: "Tracked live in your dashboard. Withdraw in USDC, USDT, or to bank." },
          ].map((s) => (
            <li key={s.n} className="surface-card p-7">
              <div className="text-display text-[2rem] leading-none text-orange/90 text-glow-orange">{s.n}</div>
              <h3 className="text-display mt-3 text-xl tracking-wide text-text">{s.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-text-dim">{s.b}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection>
        <h2 className="text-display text-[clamp(1.5rem,3vw,2rem)] text-text">Fair-use</h2>
        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-text-dim">
          No self-referral, no incentivized signups under false pretenses, no spam. Specifics live
          in <a href="/terms" className="text-orange underline-offset-4 hover:underline">our terms</a>.
          We're easy to work with — abuse is the one thing we don't tolerate.
        </p>
      </PageSection>
    </PageShell>
  );
}
