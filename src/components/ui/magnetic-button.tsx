"use client";

import { useRef, forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
  href?: string;
  strength?: number;
  asLink?: boolean;
};

/**
 * Button with magnetic hover (cursor pull). Uses raw transforms for perf —
 * no spring lib required at this size.
 */
export const MagneticButton = forwardRef<HTMLElement, Props>(function MagneticButton(
  { variant = "primary", href, strength = 0.32, className, children, asLink, ...rest },
  _ref
) {
  const innerRef = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  const cls = cn(
    variant === "primary" ? "btn-primary" : "btn-ghost",
    "transition-transform duration-300 ease-out will-change-transform",
    "hover:[transform:translateY(-1px)]",
    className
  );

  if (asLink || href) {
    return (
      <a
        ref={(n) => { innerRef.current = n; }}
        href={href}
        data-cursor="grow"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={(n) => { innerRef.current = n as unknown as HTMLElement; }}
      data-cursor="grow"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cls}
      {...rest}
    >
      {children}
    </button>
  );
});
