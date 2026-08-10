"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface ContextMenuItem {
  icon: string;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

interface ContextMenuProps {
  open: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
  x: number;
  y: number;
  anchorLabel?: string;
}

export function ContextMenu({ open, onClose, items, x, y, anchorLabel }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  // Clamp position so menu doesn't overflow viewport
  const clampedX = Math.min(x, window.innerWidth - 200);
  const clampedY = Math.min(y, window.innerHeight - items.length * 52 - 20);

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label={anchorLabel ? `Context menu for ${anchorLabel}` : "Context menu"}
            className="fixed z-[70] rounded-[16px] overflow-hidden shadow-2xl min-w-[180px]"
            style={{
              left: clampedX,
              top: clampedY,
              background: "var(--md-surface-3)",
              border: "1px solid var(--md-outline-variant)",
            }}
            initial={{ scale: 0.8, opacity: 0, transformOrigin: "top left" }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            {anchorLabel && (
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs text-[var(--md-on-surface-variant)] font-medium">{anchorLabel}</p>
              </div>
            )}
            {items.map((item, i) => (
              <button
                key={i}
                role="menuitem"
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-white/10 active:bg-white/15 ${
                  item.destructive ? "text-[var(--md-error)]" : "text-[var(--md-on-surface)]"
                }`}
                onClick={() => {
                  item.onClick();
                  onClose();
                }}
              >
                <span className="text-base" aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
