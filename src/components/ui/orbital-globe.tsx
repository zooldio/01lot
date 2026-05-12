"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * OrbitalGlobe — the hero centerpiece.
 *
 * A dark planet with neon-green "city" pixels distributed like continents,
 * wrapped by an animated candlestick belt that orbits the equator (candles
 * dim while behind the sphere, regain opacity in front). Multiple thin orbit
 * rings tilt at different angles. Curved comet streaks fly along three
 * orbital planes around the globe (the signature element from the reference).
 * Vertical "data bursts" rise from cities at intervals, a starfield holds the
 * background, and occasional shooting streaks cross the sky.
 *
 * One rAF loop drives the candle belt + comet streaks. No new deps.
 */
export function OrbitalGlobe({ className }: { className?: string }) {
  const candleRefs = useRef<(SVGRectElement | null)[]>([]);
  const streakRefs = useRef<(SVGGElement | null)[]>([]);

  // Deterministic seeded data so SSR matches CSR
  const candles = useMemo(() => makeCandles(N_CANDLES, 13), []);
  const cities = useMemo(() => makeCities(N_CITIES, 71), []);
  const stars = useMemo(() => makeStars(N_STARS, 29), []);
  const bursts = useMemo(() => pickBursts(cities, 6, 41), [cities]);

  // Single rAF loop drives both the candle belt and the comet streaks.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const BELT_REV_SECS = 32;

    const tick = (t: number) => {
      const elapsed = (t - start) / 1000;
      const beltPhase = (elapsed / BELT_REV_SECS) * Math.PI * 2;

      // ─── Candle belt ───
      for (let i = 0; i < candles.length; i++) {
        const el = candleRefs.current[i];
        if (!el) continue;
        const c = candles[i];
        const theta = (i / candles.length) * Math.PI * 2 + beltPhase;
        const x = BELT_RX * Math.cos(theta);
        const y = BELT_RY * Math.sin(theta);
        const front = (Math.sin(theta) + 1) / 2;
        const opacity = 0.18 + front * 0.82;
        const scale = 0.78 + front * 0.45;
        const h = c.h * scale;
        el.setAttribute("x", String(x - 1.4));
        el.setAttribute("y", String(y - h / 2));
        el.setAttribute("height", String(h));
        el.setAttribute("opacity", String(opacity));
      }

      // ─── Comet streaks ───
      for (let i = 0; i < STREAKS.length; i++) {
        const g = streakRefs.current[i];
        if (!g) continue;
        const s = STREAKS[i];
        const plane = PLANES[s.plane];
        const omega = (Math.PI * 2) / plane.revSecs; // rad/sec
        const theta = elapsed * omega + s.phase;

        // Untilted ellipse position
        const xe = plane.rx * Math.cos(theta);
        const ye = plane.ry * Math.sin(theta);
        // Apply plane tilt
        const c = Math.cos(plane.tilt);
        const sn = Math.sin(plane.tilt);
        const x = xe * c - ye * sn;
        const y = xe * sn + ye * c;

        // Tangent for orientation (the streak faces along motion direction)
        const dxe = -plane.rx * Math.sin(theta);
        const dye = plane.ry * Math.cos(theta);
        const dx = dxe * c - dye * sn;
        const dy = dxe * sn + dye * c;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        // Front/back: streaks behind the globe dim significantly
        const front = (Math.sin(theta) + 1) / 2; // 0..1
        const baseOpacity = 0.15 + front * 0.85;
        // Fade in/out gently over each revolution so streaks "appear and pass"
        const cycle = (theta % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const fade = pulse(cycle / (Math.PI * 2));
        const opacity = baseOpacity * fade;

        g.setAttribute(
          "transform",
          `translate(${x} ${y}) rotate(${angle})`,
        );
        g.setAttribute("opacity", String(opacity));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [candles]);

  return (
    <div className={cn("orbital-stage relative mx-auto aspect-square w-full max-w-[640px]", className)}>
      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0 -inset-x-[20%]">
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.r}px`,
              height: `${s.r}px`,
              opacity: s.o,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <span className="shooting-star" style={{ top: "18%", animationDelay: "2.5s" }} />
      <span className="shooting-star shooting-star--alt" style={{ top: "62%", animationDelay: "8s" }} />

      {/* Orbit rings — thin white/silver ellipses at varied tilts */}
      <svg
        viewBox="-300 -300 600 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g className="orbit-ring orbit-ring--1">
          <ellipse cx="0" cy="0" rx="288" ry="78" stroke="rgba(255,255,255,0.32)" strokeWidth="0.7" fill="none" />
        </g>
        <g className="orbit-ring orbit-ring--2">
          <ellipse cx="0" cy="0" rx="272" ry="62" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />
        </g>
        <g className="orbit-ring orbit-ring--3">
          <ellipse cx="0" cy="0" rx="296" ry="42" stroke="rgba(255,255,255,0.14)" strokeWidth="0.55" fill="none" />
        </g>
      </svg>

      {/* The sphere — dark base + city lights + terminator + halo */}
      <div className="globe-wrap absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2">
        <div className="globe-sphere absolute inset-0 rounded-full" />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {cities.map((c, i) => (
            <span
              key={i}
              className={cn("city-light", c.big && "city-light--big", c.bright && "city-light--bright")}
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
          {bursts.map((b, i) => (
            <span
              key={`b-${i}`}
              className="data-burst"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="globe-shade absolute inset-0 rounded-full pointer-events-none" />
        <div className="globe-halo absolute -inset-4 rounded-full pointer-events-none" />
      </div>

      {/* Candlestick belt — rAF-driven */}
      <svg
        viewBox="-300 -300 600 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g>
          {candles.map((c, i) => (
            <rect
              key={i}
              ref={(el) => {
                candleRefs.current[i] = el;
              }}
              width={2.8}
              height={c.h}
              rx={0.6}
              fill={c.up ? CANDLE_UP : CANDLE_DOWN}
            />
          ))}
        </g>
      </svg>

      {/* Comet streaks — curved leaf shapes flying along three orbital planes */}
      <svg
        viewBox="-300 -300 600 600"
        className="streak-glow pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="streakGrad" cx="62%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="22%" stopColor="#d6ffdc" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#3dff55" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3dff55" stopOpacity="0" />
          </radialGradient>
        </defs>
        {STREAKS.map((_, i) => (
          <g
            key={i}
            ref={(el) => {
              streakRefs.current[i] = el;
            }}
            opacity="0"
          >
            {/* Leaf shape — fat in the middle, tapered at both ends, with a slight curve */}
            <path
              d="M -52 0 Q -28 -3.5 0 -5 Q 26 -3.5 52 -1 Q 26 3.5 0 5 Q -28 3.5 -52 0 Z"
              fill="url(#streakGrad)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ────────────── constants ────────────── */
const N_CANDLES = 56;
const N_CITIES = 110;
const N_STARS = 64;
const BELT_RX = 270;
const BELT_RY = 78;
const CANDLE_UP = "#6bff7e";
const CANDLE_DOWN = "#3dff55";

/**
 * Comet streaks: 5 streaks spread across 3 orbital planes, each plane with a
 * slightly different size, tilt, and revolution speed. Phases are picked to
 * avoid synchronised crossings.
 */
const PLANES = [
  { rx: 285, ry: 72, tilt: 0,            revSecs: 18 }, // equator
  { rx: 275, ry: 92, tilt: -0.24,        revSecs: 22 }, // tilt up
  { rx: 295, ry: 50, tilt:  0.36,        revSecs: 28 }, // tilt down
] as const;

const STREAKS = [
  { plane: 0, phase: 0.0 },
  { plane: 0, phase: Math.PI * 1.15 },
  { plane: 1, phase: Math.PI * 0.35 },
  { plane: 1, phase: Math.PI * 1.55 },
  { plane: 2, phase: Math.PI * 0.85 },
] as const;

/** Smoothstep pulse: 0 → 1 → 0 over a unit interval, mostly visible. */
function pulse(u: number) {
  // u in 0..1 — ease-in over first 12%, hold, ease-out over last 12%
  if (u < 0.12) return easeInOut(u / 0.12);
  if (u > 0.88) return easeInOut((1 - u) / 0.12);
  return 1;
}
function easeInOut(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

/* ────────────── seeded random helpers ────────────── */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCandles(n: number, seed: number) {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, (_, i) => ({
    h: Q(6 + rnd() * 28, 3),
    up: rnd() > 0.42,
    i,
  }));
}

// Round to a fixed precision so the inline-style strings serialise identically
// on Node (SSR) and in the browser (CSR). Without this, the seeded RNG produces
// floats like 55.23657363994834 which Next.js's renderer rounds to 55.2366 on
// the server side, and React then complains about a hydration mismatch when
// the client re-renders at full precision.
const Q = (n: number, decimals = 3) => {
  const k = 10 ** decimals;
  return Math.round(n * k) / k;
};

function makeCities(n: number, seed: number) {
  const rnd = mulberry32(seed);
  const clusters = [
    { cx: 38, cy: 32, sx: 18, sy: 14, density: 0.42 },
    { cx: 68, cy: 48, sx: 16, sy: 18, density: 0.32 },
    { cx: 48, cy: 64, sx: 22, sy: 12, density: 0.26 },
  ];
  const out: { x: number; y: number; delay: number; big: boolean; bright: boolean }[] = [];
  let i = 0;
  while (out.length < n && i < n * 8) {
    i++;
    const r = rnd();
    let acc = 0;
    let chosen = clusters[0];
    for (const cl of clusters) {
      acc += cl.density;
      if (r <= acc) {
        chosen = cl;
        break;
      }
    }
    const u1 = Math.max(rnd(), 1e-6);
    const u2 = rnd();
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    const x = chosen.cx + z1 * (chosen.sx / 2);
    const y = chosen.cy + z2 * (chosen.sy / 2);
    const dx = x - 50;
    const dy = y - 50;
    if (dx * dx + dy * dy > 44 * 44) continue;
    out.push({
      x: Q(x, 3),
      y: Q(y, 3),
      delay: Q(rnd() * 4, 3),
      big: rnd() > 0.84,
      bright: rnd() > 0.5,
    });
  }
  return out;
}

function makeStars(n: number, seed: number) {
  const rnd = mulberry32(seed);
  return Array.from({ length: n }, () => ({
    x: Q(rnd() * 100, 3),
    y: Q(rnd() * 100, 3),
    r: Q(0.6 + rnd() * 1.6, 3),
    o: Q(0.25 + rnd() * 0.55, 3),
    delay: Q(rnd() * 6, 3),
  }));
}

function pickBursts(
  cities: { x: number; y: number }[],
  count: number,
  seed: number,
) {
  const rnd = mulberry32(seed);
  const sample: { x: number; y: number; delay: number }[] = [];
  const used = new Set<number>();
  let safety = 0;
  while (sample.length < count && safety < count * 12) {
    safety++;
    const idx = Math.floor(rnd() * cities.length);
    if (used.has(idx)) continue;
    used.add(idx);
    const c = cities[idx];
    // c.x / c.y are already quantised by makeCities; only delay needs rounding
    sample.push({ x: c.x, y: c.y, delay: Q(rnd() * 8, 3) });
  }
  return sample;
}
