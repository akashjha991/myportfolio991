"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";

interface AchievementsAppProps {
  theme: "dark" | "light";
}

const EXTRA_BADGES = [
  {
    id: "apps-shipped",
    icon: "📦",
    title: "10+ Live Apps Shipped",
    subtitle: "Production-deployed on Vercel",
    description: "Built and shipped 10+ real-world applications used by actual users.",
    color: "#4FC3F7",
    unlocked: true,
    year: "2026",
  },
  {
    id: "open-source",
    icon: "🌐",
    title: "Open Source Contributor",
    subtitle: "23+ Public Repositories",
    description: "Actively contributing to the open source ecosystem with 23+ public GitHub repositories.",
    color: "#CE93D8",
    unlocked: true,
    year: "2025",
  },
  {
    id: "mca-grad",
    icon: "🎓",
    title: "MCA Graduate",
    subtitle: "ABES Engineering College — 2026",
    description: "Master of Computer Applications — graduating June 2026 with a specialization in software engineering.",
    color: "#80DEEA",
    unlocked: true,
    year: "2026",
  },
  {
    id: "sql-cert",
    icon: "🗃",
    title: "SQL Essentials Certified",
    subtitle: "Database & Query Mastery",
    description: "Certified in SQL fundamentals, complex joins, subqueries, and schema design.",
    color: "#FFD54F",
    unlocked: true,
    year: "2024",
  },
  {
    id: "future-1",
    icon: "🔒",
    title: "???",
    subtitle: "Achievement Locked",
    description: "Keep building — the next achievement is just around the corner.",
    color: "rgba(255,255,255,0.15)",
    unlocked: false,
    year: "",
  },
  {
    id: "future-2",
    icon: "🔒",
    title: "???",
    subtitle: "Achievement Locked",
    description: "Keep building — the next achievement is just around the corner.",
    color: "rgba(255,255,255,0.15)",
    unlocked: false,
    year: "",
  },
];

const HERO_BADGE = {
  icon: "🏆",
  title: "TCS CodeVita Season 12",
  subtitle: "Global Rank #1799",
  description: "Placed in the top global rankings among 300,000+ competitive programmers worldwide in one of the most prestigious coding competitions.",
  color: "#FFD700",
  year: "2024",
};

export function AchievementsApp({ theme }: AchievementsAppProps) {
  const isDark = theme === "dark";
  const bg = isDark ? "#0F0F0F" : "#FAFAFA";
  const text = isDark ? "#E6E1E5" : "#1C1B1F";
  const subtext = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: bg, color: text }}>
      {/* Play Games–style header */}
      <div
        className="relative overflow-hidden px-5 pt-5 pb-4"
        style={{ background: isDark ? "linear-gradient(160deg,#1A1408 0%,#0F0F0F 100%)" : "linear-gradient(160deg,#FFF8E1 0%,#FAFAFA 100%)", borderBottom: `1px solid ${border}` }}
      >
        <h1 className="text-xl font-medium" style={{ color: text }}>Achievements</h1>
        <p className="text-xs mt-0.5" style={{ color: subtext }}>Milestones &amp; Recognition</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Hero badge */}
        <motion.div
          className="relative rounded-[22px] overflow-hidden p-5"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #1A1408 0%, #2A1F00 100%)"
              : "linear-gradient(135deg, #FFF8DC 0%, #FFF3C0 100%)",
            border: "2px solid #FFD700",
          }}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
          />

          <div className="flex items-start gap-4 relative z-10">
            <div
              className="w-16 h-16 rounded-[18px] flex items-center justify-center text-3xl flex-shrink-0 shadow-lg"
              style={{ background: "linear-gradient(135deg,#FFD700,#FFA000)", boxShadow: "0 4px 20px rgba(255,215,0,0.4)" }}
            >
              🏆
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700] mb-1">Top Achievement</p>
                  <p className="text-base font-semibold" style={{ color: text }}>{HERO_BADGE.title}</p>
                  <p className="text-xl font-bold text-[#FFD700] mt-0.5">{HERO_BADGE.subtitle}</p>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded-full" style={{ background: "rgba(255,215,0,0.2)", color: "#FFD700" }}>
                  {HERO_BADGE.year}
                </span>
              </div>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: subtext }}>
                {HERO_BADGE.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Global Rank", value: "#1799", icon: "🌍" },
            { label: "Participants", value: "300K+", icon: "👥" },
            { label: "Year", value: "2024", icon: "📅" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="rounded-[16px] p-3 text-center"
              style={{ background: isDark ? "#1A1A1A" : "#FFFFFF", border: `1px solid ${border}` }}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg">{s.icon}</p>
              <p className="text-sm font-bold text-[#FFD700] mt-1">{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: subtext }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Badge grid */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: subtext }}>
            All Achievements
          </p>
          <div className="grid grid-cols-2 gap-3">
            {EXTRA_BADGES.map((badge, i) => (
              <motion.div
                key={badge.id}
                className={`rounded-[18px] p-4 ${!badge.unlocked ? "opacity-40" : ""}`}
                style={{
                  background: isDark ? "#1A1A1A" : "#FFFFFF",
                  border: badge.unlocked ? `1px solid ${badge.color}40` : `1px solid ${border}`,
                }}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: badge.unlocked ? 1 : 0.4 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                whileTap={{ scale: badge.unlocked ? 0.97 : 1 }}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-3"
                  style={{
                    background: badge.unlocked ? `${badge.color}22` : "rgba(255,255,255,0.06)",
                  }}
                >
                  {badge.icon}
                </div>
                <p className="text-xs font-semibold leading-tight" style={{ color: badge.unlocked ? text : subtext }}>
                  {badge.title}
                </p>
                <p className="text-[10px] mt-1 leading-snug" style={{ color: subtext }}>
                  {badge.subtitle}
                </p>
                {badge.year && (
                  <span
                    className="inline-block mt-2 text-[9px] font-medium px-2 py-0.5 rounded-full"
                    style={{ background: `${badge.color}20`, color: badge.color }}
                  >
                    {badge.year}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
