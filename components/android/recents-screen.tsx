"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ANDROID_APPS, type AppId } from "@/lib/android-theme";

interface RecentsScreenProps {
  recentApps: AppId[];
  onOpenApp: (id: AppId) => void;
  onClose: () => void;
  onClearAll: () => void;
  theme: "dark" | "light";
}

export function RecentsScreen({ recentApps, onOpenApp, onClose, onClearAll, theme }: RecentsScreenProps) {
  const apps = recentApps
    .map((id) => ANDROID_APPS.find((a) => a.id === id))
    .filter(Boolean) as (typeof ANDROID_APPS)[number][];

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-50 flex flex-col"
        style={{ background: theme === "dark" ? "rgba(0,0,0,0.92)" : "rgba(240,240,240,0.95)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="region"
        aria-label="Recent apps"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-8 pb-4">
          <p className={`text-sm font-medium ${theme === "dark" ? "text-white/50" : "text-black/50"}`}>Recent Apps</p>
          <button
            className="text-[#3DDC84] text-sm font-medium"
            onClick={onClearAll}
            aria-label="Clear all recent apps"
          >
            Clear all
          </button>
        </div>

        {/* Cards */}
        <div className="flex-1 flex items-center justify-center px-8 overflow-hidden">
          {apps.length === 0 ? (
            <div className="text-center">
              <p className="text-4xl mb-3">📱</p>
              <p className={`text-sm ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>No recent apps</p>
            </div>
          ) : (
            <div className="w-full relative" style={{ height: Math.min(apps.length * 80 + 200, 420) }}>
              {apps.map((app, i) => (
                <motion.div
                  key={app.id}
                  className="absolute w-full"
                  style={{ top: i * 70, zIndex: apps.length - i }}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 28 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={{ left: 0.3, right: 0.3 }}
                >
                  <motion.div
                    className={`rounded-[20px] overflow-hidden shadow-xl`}
                    style={{
                      background: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
                      border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onOpenApp(app.id);
                      onClose();
                    }}
                  >
                    {/* App header bar */}
                    <div className={`flex items-center gap-3 px-4 py-3 border-b ${theme === "dark" ? "border-white/8" : "border-black/6"}`}>
                      <div className={`w-7 h-7 rounded-[8px] bg-gradient-to-br ${app.gradient} flex items-center justify-center text-sm`}>
                        {app.icon}
                      </div>
                      <span className={`text-sm font-medium ${theme === "dark" ? "text-white/80" : "text-black/80"}`}>
                        {app.label}
                      </span>
                    </div>
                    {/* Placeholder app content preview */}
                    <div className="px-4 py-4 h-28 flex items-start gap-3">
                      <div className="space-y-2 w-full">
                        {[100, 75, 90].map((w, j) => (
                          <div
                            key={j}
                            className={`h-2 rounded-full ${theme === "dark" ? "bg-white/10" : "bg-black/8"}`}
                            style={{ width: `${w}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Close button */}
        <div className="flex justify-center pb-8">
          <motion.button
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
              theme === "dark" ? "bg-white/10 hover:bg-white/15" : "bg-black/8 hover:bg-black/12"
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Close recents"
          >
            ✕
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
