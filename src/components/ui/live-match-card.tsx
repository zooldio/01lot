"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkline } from "@/components/ui/sparkline";
import { cn, formatNumber } from "@/lib/utils";

/**
 * The hero centerpiece — a live trading match card.
 *
 * Two opponents, P&L tickers that drift live, sparklines that animate, a
 * countdown timer, a progress bar showing match completion. Pure SVG +
 * setInterval — no chart library.
 *
 * This is the bespoke moment that makes 01LOT feel premium and proprietary
 * (rather than a generic candlestick chart that any landing page could ship).
 */
export function LiveMatchCard({ className }: { className?: string }) {
  const [tick, setTick] = useState(0);

  // Drift state — start with deterministic values so SSR matches.
  const [a, setA] = useState({
    pnl: 2418,
    pct: 12.09,
    series: seedSeries(48, 0.6),
  });
  const [b, setB] = useState({
    pnl: 1902,
    pct: 9.51,
    series: seedSeries(48, 0.45),
  });

  // Countdown — start at ~2h 47m
  const [secs, setSecs] = useState(2 * 3600 + 47 * 60 + 12);
  // Match progress — drift toward end
  const [progress, setProgress] = useState(0.62);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
      setSecs((s) => Math.max(0, s - 1));
      setProgress((p) => Math.min(1, p + 0.0007));

      setA((cur) => {
        const drift = (Math.random() - 0.45) * 60;
        const newPnl = cur.pnl + drift;
        const newPct = newPnl / 20000 * 100;
        const next = [...cur.series.slice(1), Math.max(0, newPnl)];
        return { pnl: newPnl, pct: newPct, series: next };
      });
      setB((cur) => {
        const drift = (Math.random() - 0.5) * 55;
        const newPnl = cur.pnl + drift;
        const newPct = newPnl / 20000 * 100;
        const next = [...cur.series.slice(1), Math.max(0, newPnl)];
        return { pnl: newPnl, pct: newPct, series: next };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const aWinning = a.pnl > b.pnl;

  return (
    <div className={cn("glass relative overflow-hidden p-5 sm:p-6", className)}>
      {/* faint inner glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-orange opacity-30" />

      {/* Header bar */}
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.16em]">
        <div className="flex items-center gap-2 text-text-dim">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-orange/70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-orange" />
          </span>
          <span className="text-mono">Live match · BTC/USD</span>
        </div>
        <div className="text-mono text-text">
          <span aria-live="polite">{formatTime(secs)}</span>
          <span className="ml-2 text-text-muted">left</span>
        </div>
      </div>

      {/* Main row: two opponents */}
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-stretch gap-4 sm:gap-5">
        <Side
          name="@nova"
          tag="Bronze · 14W 3L"
          pnl={a.pnl}
          pct={a.pct}
          series={a.series}
          highlight={aWinning}
          accent="orange"
          align="left"
        />
        {/* Divider with VS pill */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line-strong to-transparent" />
          <div className="relative grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-bg-elev text-mono text-[10px] font-semibold tracking-widest text-orange">
            VS
          </div>
        </div>
        <Side
          name="@kowalski"
          tag="Silver · 32W 9L"
          pnl={b.pnl}
          pct={b.pct}
          series={b.series}
          highlight={!aWinning}
          accent="cyan"
          align="right"
        />
      </div>

      {/* Match progress + meta */}
      <div className="mt-5 space-y-3">
        <div className="relative h-1 overflow-hidden rounded-full bg-line">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange to-orange-bright"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-muted">
          <span className="text-mono">
            <span className="text-text-dim">Pair</span> BTC/USD
          </span>
          <span className="text-mono">
            <span className="text-text-dim">Stake</span> $20,000
          </span>
          <span className="text-mono">
            <span className="text-text-dim">Pot</span> $40,000
          </span>
        </div>
      </div>

      {/* Suppress unused tick warning while keeping a re-render trigger */}
      <span className="sr-only">{tick}</span>
    </div>
  );
}

function Side({
  name,
  tag,
  pnl,
  pct,
  series,
  highlight,
  accent,
  align,
}: {
  name: string;
  tag: string;
  pnl: number;
  pct: number;
  series: number[];
  highlight: boolean;
  accent: "orange" | "cyan";
  align: "left" | "right";
}) {
  const accentColor = accent === "orange" ? "#3dff55" : "#2ad4ff";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-xl border p-3 sm:p-4 transition-all",
        align === "right" ? "items-end text-right" : "items-start text-left",
        highlight
          ? "border-orange/40 bg-orange/[0.04]"
          : "border-line bg-bg-elev/40"
      )}
    >
      {/* Identity */}
      <div className={cn("flex items-center gap-2", align === "right" && "flex-row-reverse")}>
        <div
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-bg-elev to-bg text-[11px] font-semibold text-text"
          style={{ boxShadow: `0 0 0 1px ${accentColor}55, 0 0 18px -2px ${accentColor}66` }}
        >
          {name.replace("@", "").slice(0, 2).toUpperCase()}
        </div>
        <div className={align === "right" ? "items-end" : "items-start"}>
          <div className="text-[12.5px] font-semibold leading-none text-text">{name}</div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-text-muted">{tag}</div>
        </div>
      </div>

      {/* P&L numbers */}
      <div>
        <div
          key={Math.round(pnl / 50)}
          className="text-mono text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-none text-text tabular-nums"
          style={{ animation: "num-pulse 0.45s ease-out" }}
        >
          {pnl >= 0 ? "+" : "−"}${formatNumber(Math.abs(Math.round(pnl)))}
        </div>
        <div
          className={cn(
            "mt-1.5 text-[11px] text-mono tabular-nums",
            pct >= 0 ? "text-orange" : "text-text-muted"
          )}
        >
          {pct >= 0 ? "▲" : "▼"} {Math.abs(pct).toFixed(2)}%
        </div>
      </div>

      {/* Sparkline */}
      <Sparkline
        values={series}
        width={140}
        height={28}
        stroke={accentColor}
        fill={accentColor}
        strokeWidth={1.4}
        animate={false}
        className="w-full"
      />
    </div>
  );
}

/* ---------- helpers ---------- */
function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function seedSeries(n: number, scale: number): number[] {
  // deterministic-ish (mulberry-lite) so SSR matches CSR on first paint
  let seed = 1234;
  let v = 1500;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const r = (seed / 4294967296 - 0.45) * 220 * scale;
    v = Math.max(200, v + r);
    out.push(v);
  }
  return out;
}
