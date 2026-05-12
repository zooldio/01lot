import { cn } from "@/lib/utils";

/**
 * Inline SVG brand marks for every payment rail we support.
 *
 * Drawn from memory of each brand's visual identity (color + wordmark / mark)
 * with deliberately simple geometry — these are recognition glyphs, not
 * pixel-perfect reproductions of the official logos. For production you'd
 * swap these out for the actual brand-asset SVGs with permission.
 *
 * Every icon renders inside a 40×40 viewBox so it slots cleanly into the
 * fixed 40×40 frame in <Payments /> and the /payments page table.
 */

type IconProps = { className?: string };

const baseClass = "block";

/* ─────────────────── Cards ─────────────────── */

function Visa({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Visa">
      <rect x="3" y="11" width="34" height="18" rx="3" fill="#1A1F71" />
      <text
        x="20"
        y="24.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="10.5"
        textAnchor="middle"
        fill="#fff"
        letterSpacing="0.6"
      >
        VISA
      </text>
      <rect x="3" y="25.5" width="34" height="1.6" fill="#F7B600" />
    </svg>
  );
}

function Mastercard({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Mastercard">
      <rect x="3" y="9" width="34" height="22" rx="3" fill="#0a0f1a" />
      <circle cx="16" cy="20" r="7" fill="#EB001B" />
      <circle cx="24" cy="20" r="7" fill="#F79E1B" />
      <path
        d="M20 14.4a7 7 0 0 1 0 11.2 7 7 0 0 1 0 -11.2z"
        fill="#FF5F00"
      />
    </svg>
  );
}

/* ─────────────────── Crypto ─────────────────── */

function Crypto({ className }: IconProps) {
  // Composite mark — BTC, ETH, USDC stacked to read as "multi-coin"
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Crypto">
      <circle cx="14" cy="20" r="9" fill="#F7931A" />
      <text
        x="14"
        y="24"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontSize="11"
        textAnchor="middle"
        fill="#fff"
      >
        ₿
      </text>
      <circle cx="22" cy="20" r="9" fill="#627EEA" />
      <path
        d="M22 14.5 L25.5 20 L22 22 L18.5 20 Z M22 22.6 L25.5 20.6 L22 25.5 L18.5 20.6 Z"
        fill="#fff"
        fillOpacity="0.9"
      />
      <circle cx="30" cy="20" r="9" fill="#2775CA" />
      <text
        x="30"
        y="24"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9"
        textAnchor="middle"
        fill="#fff"
      >
        $
      </text>
    </svg>
  );
}

/* ─────────────────── Banking (generic, in-brand) ─────────────────── */

function Bank({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Bank transfer">
      <rect x="3" y="9" width="34" height="22" rx="3" fill="#0a0f1a" stroke="#3dff55" strokeOpacity="0.35" />
      <path
        d="M9 19 L20 13 L31 19 M11 19 v6 M16 19 v6 M24 19 v6 M29 19 v6 M9 26 h22"
        stroke="#3dff55"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function VirtualAccount({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Virtual account">
      <rect x="3" y="9" width="34" height="22" rx="3" fill="#0a0f1a" stroke="#3dff55" strokeOpacity="0.35" />
      <rect x="8" y="14" width="9" height="6" rx="1" fill="#3dff55" fillOpacity="0.18" stroke="#3dff55" strokeOpacity="0.6" />
      <line x1="20" y1="16" x2="32" y2="16" stroke="#3dff55" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="19" x2="29" y2="19" stroke="#3dff55" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="8" y1="24" x2="32" y2="24" stroke="#3dff55" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="8" y1="27" x2="24" y2="27" stroke="#3dff55" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function Ussd({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="USSD">
      <rect x="12" y="6" width="16" height="28" rx="2.5" fill="#0a0f1a" stroke="#3dff55" strokeOpacity="0.45" />
      <rect x="14.5" y="10" width="11" height="14" rx="1" fill="#3dff55" fillOpacity="0.12" />
      <text
        x="20"
        y="20"
        fontFamily="ui-monospace, monospace"
        fontSize="6"
        fontWeight="700"
        textAnchor="middle"
        fill="#3dff55"
      >
        *01#
      </text>
      <circle cx="20" cy="29" r="1.2" fill="#3dff55" />
    </svg>
  );
}

/* ─────────────────── Mobile Money — Africa ─────────────────── */

function MPesa({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="M-Pesa">
      <rect x="3" y="11" width="34" height="18" rx="9" fill="#00A859" />
      <text
        x="20"
        y="24"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9"
        letterSpacing="0.3"
        textAnchor="middle"
        fill="#fff"
      >
        M-PESA
      </text>
    </svg>
  );
}

function AirtelMoney({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Airtel Money">
      <rect x="3" y="11" width="34" height="18" rx="9" fill="#E40000" />
      <text
        x="20"
        y="24.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="11"
        textAnchor="middle"
        fill="#fff"
      >
        airtel
      </text>
    </svg>
  );
}

function MixxYas({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Mixx by Yas">
      <rect x="3" y="11" width="34" height="18" rx="3" fill="#1B1464" />
      <circle cx="11" cy="20" r="2.4" fill="#FF4FA3" />
      <text
        x="23.5"
        y="23.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9.5"
        textAnchor="middle"
        fill="#fff"
      >
        Mixx
      </text>
    </svg>
  );
}

function HaloPesa({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="HaloPesa">
      <rect x="3" y="11" width="34" height="18" rx="3" fill="#D31F3C" />
      <circle cx="11" cy="20" r="3" fill="none" stroke="#fff" strokeWidth="1.2" />
      <text
        x="24"
        y="23.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="9.5"
        textAnchor="middle"
        fill="#fff"
      >
        Halo
      </text>
    </svg>
  );
}

function MtnMomo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="MTN MoMo">
      <ellipse cx="20" cy="20" rx="16" ry="10.5" fill="#FFCC00" />
      <text
        x="20"
        y="23.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontSize="10.5"
        textAnchor="middle"
        fill="#003B72"
      >
        MTN
      </text>
    </svg>
  );
}

function VodafoneCash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Vodafone Cash">
      <circle cx="20" cy="20" r="13" fill="#E60000" />
      {/* Stylised speech-mark */}
      <path
        d="M15.5 12.5 C 11.5 13.5 10 16 10 19 C 10 24 14 27.5 18 28 C 16.5 26.5 16 24.5 16 22.5 C 16 20 17.5 18 20 18 C 21.5 18 22.5 19 23 20.5 C 24 17 21 13 18 12.5 C 17 12.3 16 12.3 15.5 12.5 Z"
        fill="#fff"
      />
    </svg>
  );
}

function AirtelTigo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="AirtelTigo Money">
      <defs>
        <linearGradient id="at-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E40000" />
          <stop offset="100%" stopColor="#0055A4" />
        </linearGradient>
      </defs>
      <rect x="3" y="11" width="34" height="18" rx="3" fill="url(#at-grad)" />
      <text
        x="20"
        y="24"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontSize="12"
        letterSpacing="0.8"
        textAnchor="middle"
        fill="#fff"
      >
        AT
      </text>
    </svg>
  );
}

function OrangeMoney({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Orange Money">
      <rect x="7" y="7" width="26" height="26" rx="2" fill="#FF7900" />
      <text
        x="20"
        y="24"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontSize="9"
        textAnchor="middle"
        fill="#000"
      >
        orange
      </text>
    </svg>
  );
}

function Wave({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Wave">
      <circle cx="20" cy="20" r="13" fill="#1DC8F2" />
      {/* Stylised W */}
      <path
        d="M11.5 15 L14.5 25 L17 18 L19.5 25 L22 18 L24.5 25 L28.5 15"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function Moov({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label="Moov Money">
      <rect x="3" y="11" width="34" height="18" rx="9" fill="#005FAB" />
      <text
        x="20"
        y="24.5"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
        fontSize="11"
        textAnchor="middle"
        fill="#fff"
      >
        moov
      </text>
      <circle cx="33" cy="14" r="2.2" fill="#FFCC00" />
    </svg>
  );
}

/* ─────────────────── Generic fallback ─────────────────── */

function Generic({ name, className }: { name: string; className?: string }) {
  const initials = (() => {
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  })();
  return (
    <svg viewBox="0 0 40 40" className={cn(baseClass, className)} aria-label={name}>
      <rect x="3" y="11" width="34" height="18" rx="3" fill="#0c1014" stroke="#3dff55" strokeOpacity="0.35" />
      <text
        x="20"
        y="24"
        fontFamily="ui-monospace, monospace"
        fontWeight="700"
        fontSize="9.5"
        letterSpacing="0.4"
        textAnchor="middle"
        fill="#3dff55"
      >
        {initials}
      </text>
    </svg>
  );
}

/* ─────────────────── Public API ─────────────────── */

export function PaymentIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Visa":               return <Visa className={className} />;
    case "Mastercard":         return <Mastercard className={className} />;
    case "Crypto":             return <Crypto className={className} />;
    case "Instant bank transfer": return <Bank className={className} />;
    case "Virtual accounts":   return <VirtualAccount className={className} />;
    case "USSD":               return <Ussd className={className} />;
    case "M-Pesa":             return <MPesa className={className} />;
    case "Airtel Money":       return <AirtelMoney className={className} />;
    case "Mixx by Yas":        return <MixxYas className={className} />;
    case "HaloPesa":           return <HaloPesa className={className} />;
    case "MTN MoMo":           return <MtnMomo className={className} />;
    case "Vodafone Cash":      return <VodafoneCash className={className} />;
    case "AirtelTigo Money":   return <AirtelTigo className={className} />;
    case "Orange Money":       return <OrangeMoney className={className} />;
    case "Wave":               return <Wave className={className} />;
    case "Moov Money":         return <Moov className={className} />;
    default:                   return <Generic name={name} className={className} />;
  }
}
