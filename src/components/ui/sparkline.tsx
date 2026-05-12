"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Series of values, normalized internally */
  values: number[];
  /** Width / height in pixels (used as viewBox) */
  width?: number;
  height?: number;
  /** Stroke color */
  stroke?: string;
  /** Fill under the line as a gradient */
  fill?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Animate stroke draw on mount */
  animate?: boolean;
  className?: string;
};

/**
 * Tiny SVG sparkline. Pure path math — no chart lib.
 * Animates the stroke draw on mount when `animate` is true.
 */
export function Sparkline({
  values,
  width = 120,
  height = 32,
  stroke = "currentColor",
  fill,
  strokeWidth = 1.6,
  animate = true,
  className,
}: Props) {
  const id = useId().replace(/:/g, "");
  if (!values.length) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const dx = width / (values.length - 1 || 1);

  const points = values.map((v, i) => {
    const x = i * dx;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return [x, y] as const;
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
    .join(" ");

  const fillPath = `${linePath} L${width} ${height} L0 ${height} Z`;

  const last = points[points.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("overflow-visible", className)}
      aria-hidden
    >
      {fill && (
        <>
          <defs>
            <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity="0.45" />
              <stop offset="100%" stopColor={fill} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillPath} fill={`url(#g-${id})`} />
        </>
      )}
      <path
        d={linePath}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "spark-anim" : undefined}
      />
      {/* Endpoint dot */}
      <circle cx={last[0]} cy={last[1]} r={2.4} fill={stroke} />
    </svg>
  );
}
