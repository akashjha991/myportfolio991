"use client";

import { motion } from "framer-motion";
import { type AppId } from "@/lib/android-theme";

interface BottomNavProps {
  activeApp: AppId | null;
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
  theme: "dark" | "light";
}

function NavButton({
  label,
  icon,
  onClick,
  theme,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  theme: "dark" | "light";
}) {
  return (
    <motion.button
      className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-colors ${
        theme === "dark" ? "hover:bg-white/8 active:bg-white/12" : "hover:bg-black/6 active:bg-black/10"
      }`}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 600, damping: 35 }}
      onClick={onClick}
      aria-label={label}
    >
      <span className={`${theme === "dark" ? "text-white/70" : "text-black/60"}`}>{icon}</span>
    </motion.button>
  );
}

export function BottomNav({ activeApp, onBack, onHome, onRecents, theme }: BottomNavProps) {
  return (
    <div
      className="flex items-center px-6 h-14 flex-shrink-0 relative z-20"
      style={{
        background: theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        borderTop: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
      }}
      role="navigation"
      aria-label="Android system navigation"
    >
      {/* Back */}
      <NavButton
        label="Back — close current app"
        theme={theme}
        onClick={onBack}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        }
      />

      {/* Home */}
      <NavButton
        label="Home — go to home screen"
        theme={theme}
        onClick={onHome}
        icon={
          <div className={`w-5 h-5 rounded-full border-2 ${theme === "dark" ? "border-white/70" : "border-black/60"}`} />
        }
      />

      {/* Recents */}
      <NavButton
        label="Recents — show recent apps"
        theme={theme}
        onClick={onRecents}
        icon={
          <div
            className={`w-4 h-4 rounded-[3px] border-2 ${theme === "dark" ? "border-white/70" : "border-black/60"}`}
          />
        }
      />
    </div>
  );
}
