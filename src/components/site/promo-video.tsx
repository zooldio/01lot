"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/site/three-steps";

/**
 * Promo video section — 15-second hero clip. Shows a poster + play button
 * by default so we don't burn 7 MB on first paint. Click the poster and
 * the video plays inline with native controls. We don't autoplay or loop
 * because this is a promo (lean-forward content), not ambient decoration.
 */
export function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    // Give React a tick to swap controls in, then play.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* user-cancel or autoplay-blocked — controls are already showing */
      });
    });
  };

  return (
    <section
      id="promo"
      className="relative overflow-hidden border-y border-line bg-bg py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-radial-orange opacity-30" />
      <div className="container-x relative">
        <SectionHeader
          eyebrow="See it in action"
          titleParts={["15 seconds.", "One arena."]}
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          {/* Outer glow halo */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-orange/10 blur-3xl" />

          {/* Aspect-locked frame */}
          <div className="relative overflow-hidden rounded-xl border border-line bg-bg-elev shadow-2xl">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src="/promo.mp4"
                poster="/promo-poster.jpg"
                preload="metadata"
                playsInline
                controls={started}
                className="h-full w-full object-cover"
                aria-label="01LOT promo video"
              />

              {/* Play-button overlay — shown until first play */}
              {!started && (
                <button
                  type="button"
                  onClick={start}
                  aria-label="Play promo video"
                  className="group absolute inset-0 grid place-items-center bg-bg/30 transition-colors hover:bg-bg/10"
                >
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-orange/95 text-bg shadow-[0_0_0_8px_rgba(61,255,85,0.18),0_0_40px_-4px_rgba(61,255,85,0.55)] transition-transform group-hover:scale-105">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-[2px]" aria-hidden>
                      <path d="M7 5 L19 12 L7 19 Z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Caption row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-mono text-[10.5px] uppercase tracking-[0.22em] text-text-muted">
            <span>0:15</span>
            <span className="hidden h-3 w-px bg-line sm:inline-block" />
            <span>720p · sound off by default</span>
            <span className="hidden h-3 w-px bg-line sm:inline-block" />
            <span className="text-orange">Skill-based trading arena</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
