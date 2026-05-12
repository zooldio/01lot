import { cn } from "@/lib/utils";

/**
 * 01LOT brand mark — integrated logotype.
 *
 * The bracket mark `[ | ]` sits inline as the "O" in LOT, so the entire
 * wordmark reads as one shape: 01L[I]T. The brackets are the two opponents,
 * the centre bar is the contestant — the same metaphor as before, just
 * embedded directly in the brand name instead of stacked beside it.
 *
 * Sized in `em` so the inline mark always scales to cap-height of the
 * surrounding text. Aria-labeled "01LOT" so screen readers announce the
 * brand name, not three split fragments.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-display inline-flex items-center text-[1.15rem] tracking-[0.18em] text-text",
        className,
      )}
      aria-label="01LOT"
    >
      <span aria-hidden>01L</span>

      {/* Inline mark — replaces the "O" in LOT. ViewBox is sized tight to the
       * brackets and stretched non-uniformly into the wrapper so the mark
       * fills the full cap-height of the surrounding letters with no padding. */}
      <span
        aria-hidden
        className="relative mx-[0.06em] inline-block"
        style={{ width: "0.74em", height: "0.78em", transform: "translateY(-0.02em)" }}
      >
        <svg
          viewBox="0 0 22 24"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="lg-bar-inline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6ffdc" />
              <stop offset="40%" stopColor="#6bff7e" />
              <stop offset="100%" stopColor="#3dff55" />
            </linearGradient>
            <filter id="lg-bar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>

          {/* Left bracket */}
          <path
            d="M7 2 L3 2 L3 22 L7 22"
            stroke="#3dff55"
            strokeWidth="2.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Right bracket */}
          <path
            d="M15 2 L19 2 L19 22 L15 22"
            stroke="#3dff55"
            strokeWidth="2.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Soft glow behind the centre bar */}
          <rect
            x="8.4"
            y="3.5"
            width="5.2"
            height="17"
            rx="1"
            fill="#3dff55"
            opacity="0.4"
            filter="url(#lg-bar-glow)"
          />

          {/* Centre bar — the "1" / contestant */}
          <rect
            x="9.5"
            y="4.5"
            width="3"
            height="15"
            rx="0.6"
            fill="url(#lg-bar-inline)"
          />
        </svg>
      </span>

      <span aria-hidden>T</span>
    </span>
  );
}
