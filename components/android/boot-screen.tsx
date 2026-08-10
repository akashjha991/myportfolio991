"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<"google" | "android" | "dots">("google");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("android"), 700);
    const t2 = setTimeout(() => setPhase("dots"), 1500);
    const t3 = setTimeout(() => onComplete(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "#000000" }}
      aria-label="Android boot screen"
      role="status"
    >
      <AnimatePresence mode="wait">
        {phase === "google" && (
          <motion.div
            key="google-g"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Google G Logo (CSS only) */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-14 h-14">
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
          </motion.div>
        )}

        {phase === "android" && (
          <motion.div
            key="android-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Android Robot head */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                {/* Antenna left */}
                <line x1="22" y1="14" x2="16" y2="6" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="16" cy="5" r="2.5" fill="#3DDC84"/>
                {/* Antenna right */}
                <line x1="42" y1="14" x2="48" y2="6" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="48" cy="5" r="2.5" fill="#3DDC84"/>
                {/* Head */}
                <rect x="14" y="14" width="36" height="22" rx="18" fill="#3DDC84"/>
                {/* Eyes */}
                <circle cx="24" cy="24" r="3" fill="#000"/>
                <circle cx="40" cy="24" r="3" fill="#000"/>
                {/* Body */}
                <rect x="10" y="36" width="44" height="24" rx="8" fill="#3DDC84"/>
                {/* Arms */}
                <rect x="0" y="36" width="8" height="18" rx="4" fill="#3DDC84"/>
                <rect x="56" y="36" width="8" height="18" rx="4" fill="#3DDC84"/>
                {/* Legs */}
                <rect x="16" y="58" width="10" height="6" rx="3" fill="#3DDC84"/>
                <rect x="38" y="58" width="10" height="6" rx="3" fill="#3DDC84"/>
              </svg>
            </motion.div>
            <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">Starting...</p>
          </motion.div>
        )}

        {phase === "dots" && (
          <motion.div
            key="dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-white text-lg font-light tracking-wide" style={{ fontFamily: "Roboto, sans-serif" }}>
              Android
            </p>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#3DDC84]"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
