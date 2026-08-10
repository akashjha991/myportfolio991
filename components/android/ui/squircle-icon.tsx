"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { useRipple } from "./ripple";

interface SquircleIconProps {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  onTap?: () => void;
  onLongPress?: () => void;
  layoutId?: string;
}

export function SquircleIcon({
  id,
  label,
  icon,
  gradient,
  size = "md",
  showLabel = true,
  onTap,
  onLongPress,
  layoutId,
}: SquircleIconProps) {
  const { rippleRef, trigger } = useRipple();
  const [pressed, setPressed] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sizes = {
    sm: { outer: "w-12 h-12", text: "text-xl", label: "text-[10px]" },
    md: { outer: "w-[60px] h-[60px]", text: "text-2xl", label: "text-[11px]" },
    lg: { outer: "w-[72px] h-[72px]", text: "text-3xl", label: "text-xs" },
  };

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(true);
      trigger(e);
      longPressTimer.current = setTimeout(() => {
        onLongPress?.();
      }, 500);
    },
    [trigger, onLongPress]
  );

  const handlePointerUp = useCallback(() => {
    setPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPressed(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-1.5 select-none">
      <motion.button
        layoutId={layoutId}
        id={`app-icon-${id}`}
        aria-label={`Open ${label} app`}
        className={`relative ${sizes[size].outer} rounded-[22px] bg-gradient-to-br ${gradient} overflow-hidden cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
        animate={{ scale: pressed ? 0.92 : 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onClick={onTap}
        whileTap={{ scale: 0.9 }}
      >
        {/* Ripple container */}
        <div ref={rippleRef} className="absolute inset-0 overflow-hidden rounded-[22px]" />
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-[22px]" />
        <span className={`relative z-10 ${sizes[size].text}`} role="img" aria-hidden>
          {icon}
        </span>
      </motion.button>
      {showLabel && (
        <span
          className={`${sizes[size].label} font-medium text-white/90 text-center leading-tight max-w-[64px] truncate drop-shadow-sm`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
