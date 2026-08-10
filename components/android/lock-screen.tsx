"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface LockScreenProps {
  onUnlock: () => void;
}

function useIST() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00", date: "" });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      const s = String(ist.getSeconds()).padStart(2, "0");
      const date = ist.toLocaleDateString("en-US", {
        weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Kolkata"
      });
      setTime({ h, m, s, date });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const NOTIFICATIONS = [
  { icon: "🏆", app: "TCS CodeVita", message: "Global Rank #1799 — Season 12", time: "2024" },
  { icon: "💬", app: "Recruiter", message: "Hiring? Let's talk — Tap to compose", time: "now" },
];

export function LockScreen({ onUnlock }: LockScreenProps) {
  const { h, m, date } = useIST();
  const dragY = useMotionValue(0);
  const opacity = useTransform(dragY, [-200, 0], [0, 1]);
  const blur = useTransform(dragY, [-200, 0], [0, 0]);
  const [swiping, setSwiping] = useState(false);
  const unlocked = useRef(false);

  const handleDragEnd = (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
    if ((info.offset.y < -80 || info.velocity.y < -300) && !unlocked.current) {
      unlocked.current = true;
      animate(dragY, -window.innerHeight, { duration: 0.3, ease: [0.4, 0, 0.2, 1] });
      setTimeout(onUnlock, 280);
    } else {
      animate(dragY, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
    setSwiping(false);
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden cursor-pointer select-none"
      style={{
        background: "linear-gradient(160deg, #0a1628 0%, #0d2234 40%, #0a1a15 100%)",
        y: dragY,
      }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.6, bottom: 0 }}
      onDragStart={() => setSwiping(true)}
      onDragEnd={handleDragEnd}
      aria-label="Lock screen — swipe up to unlock"
      role="region"
    >
      {/* Wallpaper glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#3DDC84]/10 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-blue-500/10 blur-[60px]" />
      </div>

      {/* Clock area */}
      <div className="flex-1 flex flex-col items-center justify-center pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          {/* Time */}
          <div
            className="text-white font-light leading-none select-none"
            style={{ fontSize: "clamp(64px, 18vw, 96px)", fontFamily: "Roboto, sans-serif", fontWeight: 100 }}
          >
            {h}:{m}
          </div>
          {/* Date */}
          <p className="text-white/70 text-base mt-2 font-light tracking-wide">
            {date}
          </p>
          <p className="text-[#3DDC84]/80 text-xs mt-1 font-medium tracking-widest uppercase">
            IST — India Standard Time
          </p>
        </motion.div>
      </div>

      {/* Notification cards */}
      <motion.div
        className="px-4 pb-6 space-y-2"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3 rounded-[20px] px-4 py-3.5"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white/60 text-[11px] font-medium uppercase tracking-wide truncate">{n.app}</p>
                <p className="text-white/40 text-[10px] flex-shrink-0">{n.time}</p>
              </div>
              <p className="text-white/90 text-sm mt-0.5 leading-snug">{n.message}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Swipe up hint */}
      <div className="flex flex-col items-center pb-8 gap-2">
        <motion.div
          animate={{ y: swiping ? -8 : [0, -6, 0] }}
          transition={swiping ? { duration: 0.1 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="w-6 h-px bg-white/40 rounded-full"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
          <motion.div
            className="w-px h-4 bg-white/30 rounded-full"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
        <p className="text-white/40 text-xs tracking-widest uppercase">Swipe up to unlock</p>
      </div>
    </motion.div>
  );
}
