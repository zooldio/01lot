import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "Sign in — 01LOT",
  description: "Sign in to your 01LOT account and enter the arena.",
};

export default function LoginPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-bg pb-24 pt-8 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-stripes opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-radial-orange opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />

        <div className="container-x relative">
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <span className="eyebrow">Welcome back</span>
              <h1 className="text-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-none text-text">
                Sign in.
              </h1>
              <p className="mt-3 text-[14.5px] text-text-dim">
                Resume your match, claim your winnings, or jump into the next bracket.
              </p>
            </div>

            <form className="surface-card mt-10 p-6 sm:p-8" action="#" method="post" noValidate>
              <div className="space-y-5">
                <Field label="Email">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="trader@01lot.example"
                    className="w-full rounded-md border border-line-strong bg-bg-elev px-4 py-3 text-[14px] text-text outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/20"
                  />
                </Field>
                <Field
                  label="Password"
                  trailing={
                    <a href="#" className="text-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-orange">
                      Forgot?
                    </a>
                  }
                >
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-md border border-line-strong bg-bg-elev px-4 py-3 text-[14px] text-text outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/20"
                  />
                </Field>

                <label className="flex items-center gap-2 text-[13px] text-text-dim">
                  <input type="checkbox" className="h-4 w-4 rounded border-line-strong bg-bg-elev accent-orange" />
                  Keep me signed in
                </label>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center !text-[13px]"
                >
                  Sign in →
                </button>
              </div>

              <div className="relative my-7 flex items-center text-mono text-[10px] uppercase tracking-widest text-text-muted">
                <span className="flex-1 border-t border-line" />
                <span className="px-3">or</span>
                <span className="flex-1 border-t border-line" />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <SocialButton label="Continue with Google" />
                <SocialButton label="Continue with Apple" />
              </div>
            </form>

            <p className="mt-6 text-center text-[13.5px] text-text-dim">
              New to 01LOT?{" "}
              <a href="/signup" className="text-orange underline-offset-4 hover:underline">
                Create an account
              </a>
              .
            </p>

            <div className="mt-10 flex justify-center">
              <MagneticButton href="/#how-it-works" variant="ghost" className="!text-[11px]">
                How it works
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  trailing,
  children,
}: {
  label: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-mono text-[11px] uppercase tracking-widest text-text-muted">{label}</span>
        {trailing}
      </div>
      {children}
    </label>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong bg-bg-elev px-4 py-2.5 text-[12.5px] font-medium uppercase tracking-wider text-text-dim transition hover:border-orange/50 hover:text-text"
    >
      {label}
    </button>
  );
}
