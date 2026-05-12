"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { finalCta } from "@/lib/copy";
import { useT } from "@/lib/i18n-context";

/**
 * Final CTA — refined treatment.
 *
 * No silhouette/chart echo (would be a structural repeat). Instead, a
 * "join queue" mini-widget that animates through matchmaking states:
 *   queued → searching → opponent found → ready
 * It primes the user's expectation of what happens after they click CTA.
 */
const queueStates = [
  { label: "Connecting to matchmaker", pct: 16 },
  { label: "Scanning bronze pool", pct: 38 },
  { label: "2 opponents matched", pct: 64 },
  { label: "Ready in 3 seconds", pct: 92 },
] as const;

export function FinalCta() {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yPanel = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="cta"
      ref={ref}
      className="bg-aurora relative isolate overflow-hidden border-y border-line bg-bg py-28 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots-fine opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />

      <div className="container-x relative">
        {/* Live status pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-fit items-center gap-2.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-orange/70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
          <span className="text-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-orange">
            {finalCta.liveCount}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-display relative z-10 mx-auto mt-6 max-w-[12ch] text-center text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.94] tracking-[-0.02em] text-text"
        >
          <span className="block">{t("finalCta.title.0", finalCta.title[0])}</span>
          <span className="block text-orange">{t("finalCta.title.1", finalCta.title[1])}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-md text-center text-[14.5px] leading-relaxed text-text-dim"
        >
          {t("finalCta.body", finalCta.body)}
        </motion.p>

        {/* Matchmaking widget */}
        <motion.div
          style={{ y: yPanel }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-10 w-full max-w-md"
        >
          <MatchmakingWidget />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-9 flex justify-center"
        >
          <MagneticButton href={finalCta.href} variant="primary" className="px-8 py-4 text-[14px]">
            {t("finalCta.cta", finalCta.cta)} →
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function MatchmakingWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % queueStates.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  const current = queueStates[step];

  return (
    <div className="glass ring-conic relative overflow-hidden p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange/40 bg-orange/[0.08]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 animate-spin text-orange"
              style={{ animationDuration: "1.6s" }}
            >
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className="text-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
              Matchmaking
            </div>
            <div className="mt-0.5 text-[13.5px] font-medium text-text">
              {current.label}
            </div>
          </div>
        </div>
        <div className="text-mono text-[12px] tabular-nums text-orange">
          {current.pct}%
        </div>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full bg-gradient-to-r from-orange to-orange-bright"
          animate={{ width: `${current.pct}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1.5 text-[9.5px]">
        {queueStates.map((s, i) => (
          <div
            key={s.label}
            className={`text-mono uppercase tracking-[0.14em] transition-colors ${
              i <= step ? "text-orange" : "text-text-muted"
            }`}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
}
