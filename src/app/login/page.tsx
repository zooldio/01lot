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
                <SocialButton label="Continue with Google" icon={<GoogleIcon />} />
                <SocialButton label="Continue with Apple" icon={<AppleIcon />} />
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

function SocialButton({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong bg-bg-elev px-4 py-2.5 text-[12.5px] font-medium uppercase tracking-wider text-text-dim transition hover:border-orange/50 hover:text-text"
    >
      {icon && (
        <span className="grid h-4 w-4 shrink-0 place-items-center" aria-hidden>
          {icon}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}

/* ─────────────── Brand icons ─────────────── */

function GoogleIcon() {
  // Multi-colour Google "G" — official brand spec colours
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Google">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  // Monochrome Apple silhouette — inherits text colour so it goes from dim
  // to white on hover, matching the button's own text-transition.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-label="Apple">
      <path d="M17.564 13.057c-.026-2.617 2.139-3.881 2.237-3.94-1.218-1.781-3.114-2.024-3.79-2.053-1.615-.164-3.151.95-3.97.95-.83 0-2.085-.927-3.43-.9-1.766.026-3.39 1.027-4.299 2.608-1.832 3.177-.467 7.873 1.318 10.448.873 1.258 1.91 2.671 3.275 2.622 1.317-.054 1.812-.852 3.405-.852 1.587 0 2.043.852 3.43.825 1.418-.027 2.317-1.28 3.184-2.545 1.001-1.46 1.413-2.872 1.438-2.943-.032-.013-2.755-1.058-2.798-4.22zm-2.617-7.756c.728-.881 1.219-2.104 1.085-3.32-1.048.041-2.317.696-3.07 1.577-.676.78-1.267 2.026-1.108 3.219 1.168.09 2.36-.594 3.093-1.476z" />
    </svg>
  );
}
