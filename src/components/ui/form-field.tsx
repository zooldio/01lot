import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared label + control wrapper used by every form on the site
 * (login, signup, contact, anything else). Centralises the field-label
 * eyebrow + optional hint + optional trailing slot (e.g. a "Forgot?" link).
 */
export function Field({
  label,
  hint,
  trailing,
  required,
  className,
  children,
}: {
  label: string;
  hint?: ReactNode;
  trailing?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="field-label">
          {label}
          {required && <span className="ml-0.5 text-orange" aria-hidden> *</span>}
        </span>
        {trailing && <span className="text-mono text-[11px] uppercase tracking-wider">{trailing}</span>}
      </div>
      {children}
      {hint && <p className="field-hint">{hint}</p>}
    </label>
  );
}

/**
 * Visually identical "OR" divider used to split the primary form from
 * alternate sign-in methods (social, magic-link, etc.).
 */
export function FormDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="relative flex items-center text-mono text-[10px] uppercase tracking-widest text-text-muted">
      <span className="flex-1 border-t border-line" />
      <span className="px-3">{label}</span>
      <span className="flex-1 border-t border-line" />
    </div>
  );
}
