"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { SquircleIcon } from "./ui/squircle-icon";
import { ANDROID_APPS, type AppId } from "@/lib/android-theme";
import { SITE_CONFIG } from "@/lib/constants";

interface HomeScreenProps {
  onOpenApp: (id: AppId) => void;
  theme: "dark" | "light";
}

const DOCK_APPS = ["projects", "about", "contact", "github"] as AppId[];
const GRID_APPS = ANDROID_APPS.filter((a) => !DOCK_APPS.includes(a.id));
const PAGE2_APPS = ANDROID_APPS.filter((a) => DOCK_APPS.includes(a.id));

function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <div
      className="mx-4 flex items-center gap-3 rounded-full px-4 py-2.5"
      style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)" }}
    >
      <span className="text-white/50 text-base">🔍</span>
      <input
        type="text"
        placeholder="Search apps or sections..."
        value={value}
        onChange={(e) => { setValue(e.target.value); onSearch(e.target.value); }}
        className="flex-1 bg-transparent text-white/90 placeholder-white/40 text-sm outline-none"
        aria-label="Search apps"
      />
      {value && (
        <button
          className="text-white/40 hover:text-white/70 text-sm"
          onClick={() => { setValue(""); onSearch(""); }}
          aria-label="Clear search"
        >✕</button>
      )}
    </div>
  );
}

function ClockWidget({ theme }: { theme: "dark" | "light" }) {
  const [time, setTime] = useState({ h: "00", m: "00", date: "" });
  const [mounted, setMounted] = useState(false);

  if (typeof window !== "undefined" && !mounted) {
    setMounted(true);
  }

  return (
    <motion.div
      className="mx-4 rounded-[24px] p-5 overflow-hidden relative"
      style={{ background: "rgba(61,220,132,0.15)", border: "1px solid rgba(61,220,132,0.25)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#3DDC84]/20 to-transparent pointer-events-none" />
      <p className="text-[#3DDC84] text-xs font-medium uppercase tracking-wider mb-1">🕐 Live Clock — IST</p>
      <LiveClockDisplay />
    </motion.div>
  );
}

function LiveClockDisplay() {
  const [display, setDisplay] = useState("--:--");
  const [date, setDate] = useState("");

  useState(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      const s = String(ist.getSeconds()).padStart(2, "0");
      setDisplay(`${h}:${m}:${s}`);
      setDate(ist.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "Asia/Kolkata" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  });

  return (
    <>
      <p className="text-white text-4xl font-thin tabular-nums tracking-tight">{display}</p>
      <p className="text-white/60 text-xs mt-1">{date}</p>
    </>
  );
}

function BuildingWidget() {
  return (
    <motion.div
      className="mx-4 rounded-[24px] p-4 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">🚀</span>
        </div>
        <div>
          <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider">Currently Building</p>
          <p className="text-white text-sm font-medium mt-0.5">Aakash's Android Portfolio</p>
          <p className="text-white/50 text-xs mt-0.5">React · Framer Motion · Next.js</p>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] animate-pulse" />
            <span className="text-[#3DDC84] text-[11px] font-medium">In Progress</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HomeScreen({ onOpenApp, theme }: HomeScreenProps) {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenApp = (id: string) => {
    if (id === "github") {
      window.open(SITE_CONFIG.github, "_blank");
      return;
    }
    if (id === "resume") {
      window.open(SITE_CONFIG.resumeUrl, "_blank");
      return;
    }
    if (id === "settings") {
      // Settings => toggle theme (handled by parent)
      onOpenApp("settings" as AppId);
      return;
    }
    onOpenApp(id as AppId);
  };

  const filteredApps = searchQuery
    ? ANDROID_APPS.filter((a) => a.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : null;

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -60 && page === 0) setPage(1);
    if (info.offset.x > 60 && page === 1) setPage(0);
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden relative"
      style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)" }}
    >
      {/* Wallpaper glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-[#3DDC84]/8 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 rounded-full bg-blue-500/8 blur-[80px]" />
      </div>

      {/* Search bar */}
      <div className="pt-2 pb-3 relative z-10">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Search results */}
      <AnimatePresence>
        {filteredApps && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 left-0 right-0 z-20 mx-4 rounded-[20px] overflow-hidden shadow-2xl"
            style={{ background: "rgba(30,30,30,0.96)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            {filteredApps.length === 0 ? (
              <p className="px-4 py-4 text-white/40 text-sm">No apps found</p>
            ) : (
              filteredApps.map((app) => (
                <button
                  key={app.id}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/8 transition-colors"
                  onClick={() => { setSearchQuery(""); handleOpenApp(app.id); }}
                >
                  <div className={`w-9 h-9 rounded-[10px] bg-gradient-to-br ${app.gradient} flex items-center justify-center text-base`}>
                    {app.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{app.label}</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div ref={containerRef} className="flex-1 overflow-hidden relative">
        <motion.div
          className="flex h-full"
          style={{ x: dragX }}
          animate={{ x: page === 0 ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: -50, right: 50 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {/* Page 1: App grid */}
          <div className="min-w-full h-full flex flex-col justify-center px-6">
            <div className="grid grid-cols-4 gap-x-2 gap-y-6 justify-items-center">
              {ANDROID_APPS.map((app) => (
                <SquircleIcon
                  key={app.id}
                  id={app.id}
                  label={app.label}
                  icon={app.icon}
                  gradient={app.gradient}
                  layoutId={`app-icon-${app.id}`}
                  onTap={() => handleOpenApp(app.id)}
                />
              ))}
            </div>
          </div>

          {/* Page 2: Widgets */}
          <div className="min-w-full h-full flex flex-col justify-center gap-4 py-4">
            <ClockWidget theme={theme} />
            <BuildingWidget />
            {/* Mini app grid for page 2 */}
            <div className="mx-4 flex gap-4 justify-center">
              {PAGE2_APPS.map((app) => (
                <SquircleIcon
                  key={app.id}
                  id={`p2-${app.id}`}
                  label={app.label}
                  icon={app.icon}
                  gradient={app.gradient}
                  size="sm"
                  onTap={() => handleOpenApp(app.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Page indicators */}
      <div className="flex justify-center gap-1.5 py-2">
        {[0, 1].map((i) => (
          <motion.button
            key={i}
            className="rounded-full"
            animate={{ width: page === i ? 20 : 6, background: page === i ? "#3DDC84" : "rgba(255,255,255,0.35)" }}
            style={{ height: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={() => setPage(i)}
            aria-label={`Home screen page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
