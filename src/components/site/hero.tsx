"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LiveMatchCard } from "@/components/ui/live-match-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Marquee } from "@/components/ui/marquee";
import { OrbitalGlobe } from "@/components/ui/orbital-globe";
import { hero } from "@/lib/copy";

/**
 * Hero — orbital-globe treatment.
 *
 * Inspired by the MetaQuotes / iTrader hero — a dark planet with an
 * orbiting candlestick belt, orbit rings, city lights, and data bursts —
 * rendered in 01LOT's orange palette. The headline + CTAs sit centered over
 * the globe; the LiveMatchCard floats below as the bespoke trading element.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax — globe drifts up, card sinks slightly
  const yGlobe = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.0]);
  const scaleTitle = useTransform(scrollYProgress, [0, 0.6], [1, 0.94]);

  return (
    <section
      ref={ref}
      className="bg-aurora relative isolate min-h-[100svh] overflow-hidden bg-bg pt-16"
    >
      {/* Atmosphere layers — dot grid + noise */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_55%,black,transparent_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />

      <div className="container-x relative pt-10 sm:pt-14">
        {/* Eyebrow — borderless, dot + mono caps */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-fit items-center gap-2.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-orange/70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
          <span className="text-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-text-dim">
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* Kinetic title */}
        <motion.h1
          style={{ scale: scaleTitle, opacity }}
          className="text-display relative z-10 mx-auto mt-7 max-w-[15ch] text-center text-[clamp(2.75rem,10.5vw,9rem)] leading-[0.92] tracking-[-0.02em] text-text"
        >
          {hero.title.map((word, i) => (
            <motion.span
              key={word}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.12,
                ease: [0.2, 0.85, 0.25, 1],
              }}
              className="mr-2.5 inline-block last:mr-0"
            >
              {word.replace(".", "")}
              <span className="text-orange">.</span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto mt-7 max-w-xl text-center text-[14.5px] leading-relaxed text-text-dim sm:text-[15.5px]"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton href={hero.ctaPrimaryHref} variant="primary">
            {hero.ctaPrimary} →
          </MagneticButton>
          <MagneticButton href={hero.ctaSecondaryHref} variant="ghost">
            {hero.ctaSecondary}
          </MagneticButton>
        </motion.div>

        {/* Live status pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-10 mx-auto mt-6 flex w-fit items-center gap-3 text-[10.5px] text-text-muted"
        >
          <span className="text-mono uppercase tracking-[0.22em] text-orange">
            {hero.liveLabel}
          </span>
          <span className="h-3 w-px bg-line" />
          <span className="text-mono tabular-nums">{hero.liveCount}</span>
        </motion.div>

        {/* Stage — orbital globe + live-match overlay */}
        <div className="relative mt-10 sm:mt-12">
          {/* Globe — drifts up subtly on scroll */}
          <motion.div
            style={{ y: yGlobe }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <OrbitalGlobe />
          </motion.div>

          {/* LiveMatchCard — overlaps the lower hemisphere */}
          <motion.div
            style={{ y: yCard }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto -mt-24 w-full max-w-[520px] pb-14 sm:-mt-32 sm:max-w-[600px]"
          >
            <LiveMatchCard />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="pointer-events-none absolute bottom-14 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-text-muted lg:flex"
        >
          <span className="text-mono">Scroll</span>
          <span className="block h-7 w-px animate-pulse bg-line-strong" />
        </motion.div>
      </div>

      {/* Bottom ticker bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-y border-line/70 bg-bg-elev/80 backdrop-blur-md">
        <Marquee
          items={hero.ticker}
          className="h-10"
          itemClassName="text-mono text-[11.5px] uppercase tracking-[0.18em] text-text-dim flex items-center h-10"
          gap={56}
        />
      </div>
    </section>
  );
}
