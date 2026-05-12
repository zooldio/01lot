"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Candle = { o: number; h: number; l: number; c: number };

/**
 * Animated candlestick chart that simulates a live feed.
 * Pure SVG, no chart library — keeps bundle small and motion smooth.
 */
export function CandlestickChart({
  count = 32,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const seedRef = useRef(0);
  const [candles, setCandles] = useState<Candle[]>(() =>
    seedSeries(count, (seedRef.current = 42))
  );
  const [tick, setTick] = useState(0);

  // Stream new candles every 2.4s, drop oldest
  useEffect(() => {
    const id = window.setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const next = nextCandle(last, ++seedRef.current);
        return [...prev.slice(1), next];
      });
      setTick((t) => t + 1);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const { min, max } = useMemo(() => {
    let mn = Infinity, mx = -Infinity;
    for (const c of candles) {
      if (c.l < mn) mn = c.l;
      if (c.h > mx) mx = c.h;
    }
    return { min: mn - 2, max: mx + 2 };
  }, [candles]);

  const W = 1200;
  const H = 360;
  const pad = 28;
  const innerW = W - pad * 2;
  const innerH = H - pad * 2;
  const colW = innerW / candles.length;
  const wickW = 2;
  const bodyW = Math.max(4, colW * 0.55);

  const yOf = (v: number) => pad + (1 - (v - min) / (max - min)) * innerH;

  // Latest price line
  const last = candles[candles.length - 1];
  const lastY = yOf(last.c);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="cs-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(42, 212, 255, 0.18)" />
          <stop offset="100%" stopColor="rgba(7, 8, 10, 0)" />
        </linearGradient>
        <linearGradient id="cs-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255, 90, 31, 0)" />
          <stop offset="50%" stopColor="rgba(255, 90, 31, 0.85)" />
          <stop offset="100%" stopColor="rgba(255, 90, 31, 0)" />
        </linearGradient>
        <filter id="cs-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* faint baseline glow */}
      <rect x="0" y={H * 0.55} width={W} height={H * 0.45} fill="url(#cs-bg)" />

      {/* gridlines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={i}
          x1={pad}
          x2={W - pad}
          y1={pad + (innerH / 4) * i}
          y2={pad + (innerH / 4) * i}
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="2 6"
        />
      ))}

      {/* candles */}
      {candles.map((c, i) => {
        const x = pad + colW * i + colW / 2;
        const up = c.c >= c.o;
        const yH = yOf(c.h);
        const yL = yOf(c.l);
        const yO = yOf(c.o);
        const yC = yOf(c.c);
        const top = Math.min(yO, yC);
        const bot = Math.max(yO, yC);
        return (
          <g key={`${tick}-${i}`}>
            {/* wick */}
            <rect
              x={x - wickW / 2}
              y={yH}
              width={wickW}
              height={Math.max(1, yL - yH)}
              fill={up ? "rgba(42, 212, 255, 0.9)" : "rgba(255, 90, 31, 0.9)"}
            />
            {/* body */}
            <rect
              x={x - bodyW / 2}
              y={top}
              width={bodyW}
              height={Math.max(2, bot - top)}
              fill={up ? "rgba(42, 212, 255, 0.9)" : "rgba(255, 90, 31, 0.9)"}
              rx="1"
            />
          </g>
        );
      })}

      {/* live price line */}
      <line
        x1={pad}
        x2={W - pad}
        y1={lastY}
        y2={lastY}
        stroke="url(#cs-line)"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        filter="url(#cs-glow)"
      />
      <circle cx={W - pad} cy={lastY} r="4" fill="#3dff55" filter="url(#cs-glow)" />

      {/* live label */}
      <g transform={`translate(${W - pad - 6}, ${lastY - 16})`}>
        <rect
          x="-66"
          y="-12"
          width="68"
          height="22"
          rx="4"
          fill="#3dff55"
        />
        <text
          x="-32"
          y="3"
          textAnchor="middle"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          fill="#0a0a0a"
        >
          {last.c.toFixed(2)}
        </text>
      </g>
    </svg>
  );
}

/* ---------- helpers (deterministic-ish PRNG so SSR/CSR match) ---------- */

function rand(seed: number) {
  // Mulberry32
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function seedSeries(n: number, seed: number): Candle[] {
  const out: Candle[] = [];
  let price = 100;
  for (let i = 0; i < n; i++) {
    const drift = (rand(seed + i) - 0.45) * 4;
    const o = price;
    const c = Math.max(20, o + drift);
    const range = 1 + rand(seed + i + 1000) * 4;
    const h = Math.max(o, c) + range * rand(seed + i + 2000);
    const l = Math.min(o, c) - range * rand(seed + i + 3000);
    out.push({ o, h, l, c });
    price = c;
  }
  return out;
}

function nextCandle(last: Candle, seed: number): Candle {
  const drift = (rand(seed) - 0.45) * 4.2;
  const o = last.c;
  const c = Math.max(20, o + drift);
  const range = 1 + rand(seed + 17) * 4.5;
  const h = Math.max(o, c) + range * rand(seed + 31);
  const l = Math.min(o, c) - range * rand(seed + 47);
  return { o, h, l, c };
}
