"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useRef } from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface NotificationShadeProps {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const NOTIFICATIONS = [
  {
    id: "codevita",
    icon: "🏆",
    app: "TCS CodeVita",
    title: "Achievement Unlocked",
    message: "Season 12 — Global Rank #1799 among 300,000+ participants",
    time: "2024",
    color: "#FFD700",
  },
  {
    id: "hire",
    icon: "💬",
    app: "Recruiter",
    title: "Hiring? Let's talk",
    message: "Tap to compose a message to Aakash",
    time: "now",
    color: "#3DDC84",
  },
  {
    id: "shipped",
    icon: "📦",
    app: "Vercel",
    title: "10+ Projects Shipped",
    message: "Production apps live — PokeUs, Weather Wizard, Bondly & more",
    time: "2026",
    color: "#4FC3F7",
  },
];

interface QSTile {
  id: string;
  icon: string;
  label: string;
  active: boolean;
  action: () => void;
}

export function NotificationShade({ open, onClose, theme, onToggleTheme }: NotificationShadeProps) {
  const y = useMotionValue(-100);
  const shadeOpacity = useTransform(y, [-window?.innerHeight ?? -800, 0], [0, 1]);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const tiles: QSTile[] = [
    {
      id: "theme",
      icon: theme === "dark" ? "🌙" : "☀️",
      label: theme === "dark" ? "Dark" : "Light",
      active: true,
      action: onToggleTheme,
    },
    {
      id: "email",
      icon: "📧",
      label: "Copy Email",
      active: false,
      action: () => {
        navigator.clipboard?.writeText(SITE_CONFIG.email).catch(() => {});
        alert(`Email copied: ${SITE_CONFIG.email}`);
      },
    },
    {
      id: "resume",
      icon: "📄",
      label: "Resume",
      active: false,
      action: () => window.open(SITE_CONFIG.resumeUrl, "_blank"),
    },
    {
      id: "github",
      icon: "🐙",
      label: "GitHub",
      active: false,
      action: () => window.open(SITE_CONFIG.github, "_blank"),
    },
    {
      id: "linkedin",
      icon: "💼",
      label: "LinkedIn",
      active: false,
      action: () => window.open(SITE_CONFIG.linkedin, "_blank"),
    },
    {
      id: "wifi",
      icon: "📶",
      label: "WiFi",
      active: true,
      action: () => {},
    },
    {
      id: "dnd",
      icon: "🔕",
      label: "DND",
      active: false,
      action: () => {},
    },
    {
      id: "brightness",
      icon: "🔆",
      label: "Brightness",
      active: true,
      action: () => {},
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            className="absolute inset-0 z-30"
            style={{ background: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Shade panel */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-40 flex flex-col overflow-hidden"
            style={{
              background: theme === "dark"
                ? "rgba(18,18,18,0.96)"
                : "rgba(240,240,240,0.96)",
              backdropFilter: "blur(30px)",
              borderBottomLeftRadius: 28,
              borderBottomRightRadius: 28,
              maxHeight: "85%",
            }}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y < -60 || info.velocity.y < -300) onClose();
            }}
            role="region"
            aria-label="Notification shade"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3">
              <div className={`w-10 h-1 rounded-full ${theme === "dark" ? "bg-white/20" : "bg-black/20"}`} />
            </div>

            <div className="overflow-y-auto">
              {/* Quick Settings label */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <p className={`text-xs font-medium uppercase tracking-widest ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
                  Quick Settings
                </p>
                <button
                  className={`text-xs font-medium ${theme === "dark" ? "text-[#3DDC84]" : "text-[#006C34]"}`}
                  onClick={onToggleTheme}
                  aria-label="Toggle dark/light mode"
                >
                  {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                </button>
              </div>

              {/* QS Tiles grid */}
              <div className="grid grid-cols-4 gap-2 px-4 pb-4">
                {tiles.map((tile) => (
                  <motion.button
                    key={tile.id}
                    className={`flex flex-col items-center gap-1.5 rounded-[16px] p-2 transition-colors ${
                      tile.active
                        ? "bg-[#3DDC84]/20 border border-[#3DDC84]/30"
                        : theme === "dark"
                        ? "bg-white/8 border border-white/10"
                        : "bg-black/5 border border-black/10"
                    }`}
                    whileTap={{ scale: 0.93 }}
                    onClick={tile.action}
                    aria-label={tile.label}
                    aria-pressed={tile.active}
                  >
                    <span className="text-xl">{tile.icon}</span>
                    <span className={`text-[10px] font-medium leading-tight text-center ${
                      tile.active ? "text-[#3DDC84]" : theme === "dark" ? "text-white/60" : "text-black/60"
                    }`}>
                      {tile.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Brightness bar */}
              <div className="px-4 pb-4">
                <div className={`h-1.5 rounded-full overflow-hidden ${theme === "dark" ? "bg-white/15" : "bg-black/15"}`}>
                  <div className="h-full w-[72%] rounded-full bg-[#3DDC84]" />
                </div>
              </div>

              <div className={`mx-4 h-px ${theme === "dark" ? "bg-white/10" : "bg-black/10"} mb-3`} />

              {/* Notification cards */}
              <div className="px-4 pb-6 space-y-2">
                <p className={`text-xs font-medium uppercase tracking-widest mb-3 ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
                  Notifications
                </p>
                {notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className={`relative flex items-start gap-3 rounded-[18px] px-4 py-3.5 overflow-hidden ${
                      theme === "dark" ? "bg-white/8" : "bg-black/5"
                    }`}
                    style={{ border: `1px solid ${n.color}20` }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={{ left: 0, right: 0.4 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) {
                        setNotifications((prev) => prev.filter((x) => x.id !== n.id));
                      }
                    }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: `${n.color}22` }}
                    >
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-[11px] font-medium uppercase tracking-wide ${theme === "dark" ? "text-white/50" : "text-black/50"}`}>
                          {n.app}
                        </p>
                        <p className={`text-[10px] flex-shrink-0 ${theme === "dark" ? "text-white/30" : "text-black/30"}`}>
                          {n.time}
                        </p>
                      </div>
                      <p className={`text-xs font-semibold mt-0.5 ${theme === "dark" ? "text-white/90" : "text-black/90"}`}>
                        {n.title}
                      </p>
                      <p className={`text-xs mt-0.5 leading-snug ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                        {n.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {notifications.length > 0 && (
                  <button
                    className={`w-full text-center text-xs py-2 ${theme === "dark" ? "text-white/30 hover:text-white/50" : "text-black/30 hover:text-black/50"} transition-colors`}
                    onClick={() => setNotifications([])}
                  >
                    Clear all notifications
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
