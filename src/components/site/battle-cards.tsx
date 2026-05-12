"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Icon } from "@/components/ui/icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { modes } from "@/lib/copy";
import { SectionHeader } from "@/components/site/three-steps";

export function BattleCards() {
  return (
    <section id="modes" className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[60%] -translate-y-1/2 bg-radial-orange opacity-50" />
      <div className="container-x relative">
        <SectionHeader eyebrow={modes.eyebrow} titleParts={modes.title} align="center" />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {modes.cards.map((c, i) => (
            <TiltCard
              key={c.title}
              tag={c.tag}
              title={c.title}
              body={c.body}
              bullets={c.bullets}
              cta={c.cta}
              href={c.href}
              accent={i === 0 ? "cyan" : "orange"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  tag,
  title,
  body,
  bullets,
  cta,
  href,
  accent,
}: {
  tag: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
  href: string;
  accent: "cyan" | "orange";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-1, 1], [-6, 6]), {
    stiffness: 220,
    damping: 22,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const accentClass =
    accent === "cyan"
      ? "from-cyan/40 via-cyan/10 to-transparent"
      : "from-orange/50 via-orange/10 to-transparent";

  const isFeatured = accent === "orange";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`surface-card group relative overflow-hidden p-7 sm:p-9 ${
        isFeatured ? "ring-conic" : ""
      }`}
      data-cursor="grow"
    >
      {/* corner accent */}
      <div
        className={`pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${accentClass} blur-2xl`}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="eyebrow">{tag}</span>
          <span className="h-px w-8 bg-line-strong" />
        </div>

        <h3 className="text-display mt-4 text-[clamp(2rem,4vw,3rem)] text-text">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-text-dim">
          {body}
        </p>

        <ul className="mt-6 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 text-[14px] text-text-dim"
            >
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  accent === "cyan"
                    ? "border-cyan/50 text-cyan"
                    : "border-orange/50 text-orange"
                }`}
              >
                <Icon.Check className="h-3 w-3" strokeWidth={2.5 as unknown as number} />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <MagneticButton
            href={href}
            variant={accent === "orange" ? "primary" : "ghost"}
          >
            {cta} →
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}
