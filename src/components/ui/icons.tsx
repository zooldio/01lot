import type { SVGProps } from "react";

export const Icon = {
  Check: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...p}>
      <path
        d="M4 10.5L8 14.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  X: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...p}>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  Arrow: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...p}>
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Plus: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...p}>
      <path
        d="M10 4V16M4 10H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  Bolt: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path
        d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
        fill="currentColor"
      />
    </svg>
  ),
  Sword: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path
        d="M14 3l7 7-9 9-3-3 9-9-7-7zM5 18l3 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Trophy: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path
        d="M8 4h8v6a4 4 0 11-8 0V4zM6 6H3v2a3 3 0 003 3M18 6h3v2a3 3 0 01-3 3M9 18h6v3H9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Wallet: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path
        d="M3 7h15a3 3 0 013 3v7a3 3 0 01-3 3H6a3 3 0 01-3-3V7zM3 7l3-3h12M17 13h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
