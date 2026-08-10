"use client";

import { useCallback, useRef } from "react";

interface RippleProps {
  color?: string;
  className?: string;
}

export function useRipple() {
  const rippleRef = useRef<HTMLDivElement>(null);

  const trigger = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = rippleRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute;
      border-radius:50%;
      pointer-events:none;
      width:${size}px;height:${size}px;
      left:${x - size / 2}px;top:${y - size / 2}px;
      background:rgba(255,255,255,0.18);
      transform:scale(0);
      animation:android-ripple 550ms cubic-bezier(0.4,0,0.2,1) forwards;
    `;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return { rippleRef, trigger };
}

export function Ripple({ color = "rgba(255,255,255,0.18)", className = "" }: RippleProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
