"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type AppId } from "@/lib/android-theme";
import { BootScreen } from "./boot-screen";
import { LockScreen } from "./lock-screen";
import { HomeScreen } from "./home-screen";
import { StatusBar } from "./status-bar";
import { NotificationShade } from "./notification-shade";
import { BottomNav } from "./bottom-nav";
import { RecentsScreen } from "./recents-screen";
import { AppLauncher } from "./app-launcher";
import { ANDROID_APPS } from "@/lib/android-theme";

type Phase = "boot" | "lock" | "home" | "app";

const BOOT_SKIP_KEY = "android-portfolio-booted";
const THEME_KEY = "android-portfolio-theme";

/** Desktop phone bezel shell — wraps content in an iPhone-style phone frame */
function PhoneBezel({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "dark" | "light";
}) {
  return (
    // Outer ambient background
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background: theme === "dark"
          ? "radial-gradient(ellipse at 50% 40%, #0d2618 0%, #050a06 60%, #000 100%)"
          : "radial-gradient(ellipse at 50% 40%, #d4edda 0%, #e8f5e9 60%, #c8e6c9 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(61,220,132,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: "min(390px, 90vw)",
          height: "min(844px, 95dvh)",
          borderRadius: 50,
          background: "#000",
          boxShadow: `
            0 0 0 2px ${theme === "dark" ? "#333" : "#ccc"},
            0 0 0 3px ${theme === "dark" ? "#1a1a1a" : "#e0e0e0"},
            0 40px 120px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
        }}
      >
        {/* Inner content area */}
        <div
          className="relative flex-1 flex flex-col overflow-hidden"
          style={{ borderRadius: 48, background: "#000" }}
        >
          {children}
        </div>

        {/* Side buttons (decorative) */}
        <div
          className="absolute left-[-3px] top-28 w-1 h-12 rounded-l-full"
          style={{ background: theme === "dark" ? "#222" : "#bbb" }}
          aria-hidden="true"
        />
        <div
          className="absolute left-[-3px] top-44 w-1 h-16 rounded-l-full"
          style={{ background: theme === "dark" ? "#222" : "#bbb" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-[-3px] top-36 w-1 h-20 rounded-r-full"
          style={{ background: theme === "dark" ? "#222" : "#bbb" }}
          aria-hidden="true"
        />
      </div>

      {/* Desktop label */}
      <div
        className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none"
      >
        <p className="text-xs font-medium" style={{ color: theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)" }}>
          Aakash Jha — Android Portfolio
        </p>
        <button
          className="pointer-events-auto text-xs font-medium px-3 py-1 rounded-full transition-colors"
          style={{
            background: "rgba(61,220,132,0.15)",
            color: "#3DDC84",
            border: "1px solid rgba(61,220,132,0.25)",
            cursor: "pointer",
          }}
          aria-label="Switch to classic portfolio view"
          onClick={() => {
            // Set cookie so proxy doesn't redirect back to /android on mobile
            document.cookie = "view-preference=classic; path=/; max-age=86400";
            window.location.href = "/";
          }}
        >
          ← Classic View
        </button>
      </div>
    </div>
  );
}

/** Wallpaper behind home screen */
function Wallpaper({ theme }: { theme: "dark" | "light" }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: theme === "dark"
          ? "linear-gradient(160deg, #0a1a12 0%, #0a0f1a 50%, #0f0a1a 100%)"
          : "linear-gradient(160deg, #e8f5e9 0%, #e3f2fd 50%, #f3e5f5 100%)",
      }}
      aria-hidden="true"
    >
      {/* Bokeh orbs */}
      {[
        { x: "20%", y: "15%", size: 200, color: "rgba(61,220,132,0.08)" },
        { x: "75%", y: "35%", size: 160, color: "rgba(79,195,247,0.07)" },
        { x: "40%", y: "70%", size: 240, color: "rgba(206,147,216,0.06)" },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x, top: orb.y,
            width: orb.size, height: orb.size,
            background: orb.color,
            filter: "blur(60px)",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
    </div>
  );
}

// The actual phone OS content (works on both mobile and inside bezel)
function AndroidContent() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [shadeOpen, setShadeOpen] = useState(false);
  const [recentsOpen, setRecentsOpen] = useState(false);
  const [recentApps, setRecentApps] = useState<AppId[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // On mount: check if boot was already seen
  useEffect(() => {
    const booted = sessionStorage.getItem(BOOT_SKIP_KEY);
    if (booted) setPhase("lock");
    const savedTheme = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem(BOOT_SKIP_KEY, "1");
    setPhase("lock");
  }, []);

  const handleUnlock = useCallback(() => setPhase("home"), []);

  const handleOpenApp = useCallback((id: AppId) => {
    // Special: settings toggles theme
    if (id === "settings") {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
      localStorage.setItem(THEME_KEY, next);
      return;
    }
    setActiveApp(id);
    setPhase("app");
    setRecentApps((prev) => {
      const filtered = prev.filter((x) => x !== id);
      return [id, ...filtered].slice(0, 8);
    });
  }, [theme]);

  const handleCloseApp = useCallback(() => {
    setActiveApp(null);
    setPhase("home");
  }, []);

  const handleToggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }, [theme]);

  const isDark = theme === "dark";
  const bg = isDark ? "#000000" : "#F5F5F5";

  return (
    <div
      className="relative flex flex-col w-full h-full overflow-hidden select-none"
      style={{
        background: bg,
        color: isDark ? "#E6E1E5" : "#1C1B1F",
        fontFamily: "'Roboto', 'Google Sans', system-ui, sans-serif",
      }}
    >
      {/* Wallpaper (only on home/app) */}
      {(phase === "home" || phase === "app") && <Wallpaper theme={theme} />}

      {/* === PHASES === */}
      <AnimatePresence mode="wait">
        {phase === "boot" && (
          <motion.div key="boot" className="absolute inset-0 z-50" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <BootScreen onComplete={handleBootComplete} />
          </motion.div>
        )}

        {phase === "lock" && (
          <motion.div
            key="lock"
            className="absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LockScreen onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === HOME + APP LAYER === */}
      {(phase === "home" || phase === "app") && (
        <div className="flex flex-col h-full relative z-10">
          {/* Status bar (always at top) */}
          <StatusBar theme={theme} onSwipeDown={() => setShadeOpen(true)} />

          {/* Middle screen area (Home or App) */}
          <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
            {/* Home screen */}
            <AnimatePresence>
              {phase === "home" && (
                <motion.div
                  key="home"
                  className="absolute inset-0 flex flex-col overflow-hidden"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <HomeScreen onOpenApp={handleOpenApp} theme={theme} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* App screens */}
            <AnimatePresence>
              {phase === "app" && activeApp && (
                <AppLauncher
                  key={`app-${activeApp}`}
                  activeApp={activeApp}
                  theme={theme}
                  onClose={handleCloseApp}
                  onOpenShade={() => setShadeOpen(true)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom nav (permanently fixed at bottom) */}
          <BottomNav
            activeApp={activeApp}
            theme={theme}
            onBack={handleCloseApp}
            onHome={handleCloseApp}
            onRecents={() => setRecentsOpen(true)}
          />
        </div>
      )}

      {/* === OVERLAYS === */}
      {/* Notification shade */}
      {(phase === "home" || phase === "app") && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <NotificationShade
              open={shadeOpen}
              onClose={() => setShadeOpen(false)}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          </div>
        </div>
      )}

      {/* Recents screen */}
      <AnimatePresence>
        {recentsOpen && (
          <RecentsScreen
            recentApps={recentApps}
            onOpenApp={(id) => {
              handleOpenApp(id);
              setRecentsOpen(false);
            }}
            onClose={() => setRecentsOpen(false)}
            onClearAll={() => {
              setRecentApps([]);
              setRecentsOpen(false);
            }}
            theme={theme}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/** Top-level export — handles responsive layout: bezel on desktop, edge-to-edge on mobile */
export function AndroidOS() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isMobile) {
    // Edge-to-edge on real phones
    return (
      <div style={{ width: "100dvw", height: "100dvh", overflow: "hidden" }}>
        <AndroidContent />
      </div>
    );
  }

  // Desktop: phone-in-bezel layout
  return (
    <div style={{ width: "100dvw", height: "100dvh", overflow: "hidden", position: "relative" }}>
      <PhoneBezel theme="dark">
        <AndroidContent />
      </PhoneBezel>
    </div>
  );
}
