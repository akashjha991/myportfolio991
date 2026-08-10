"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG, EDUCATION, INTERESTS } from "@/lib/constants";

interface AboutAppProps {
  theme: "dark" | "light";
}

const QUICK_ACTIONS = [
  { icon: "📧", label: "Email", action: () => window.open(`mailto:${SITE_CONFIG.email}`) },
  { icon: "🐙", label: "GitHub", action: () => window.open(SITE_CONFIG.github, "_blank") },
  { icon: "💼", label: "LinkedIn", action: () => window.open(SITE_CONFIG.linkedin, "_blank") },
  { icon: "📄", label: "Resume", action: () => window.open(SITE_CONFIG.resumeUrl, "_blank") },
];

export function AboutApp({ theme }: AboutAppProps) {
  const isDark = theme === "dark";
  const bg = isDark ? "#0F0F0F" : "#FAFAFA";
  const surface = isDark ? "#1A1A1A" : "#FFFFFF";
  const text = isDark ? "#E6E1E5" : "#1C1B1F";
  const subtext = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: bg, color: text }}>
      {/* Contacts-style profile header */}
      <div
        className="relative overflow-hidden pt-8 pb-6 px-6"
        style={{ background: isDark ? "linear-gradient(180deg,#1A2E1F 0%, #0F0F0F 100%)" : "linear-gradient(180deg,#D4EDDA 0%,#FAFAFA 100%)" }}
      >
        {/* Avatar */}
        <motion.div
          className="mx-auto mb-4 relative"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ width: 96, height: 96 }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl"
            style={{
              background: "linear-gradient(135deg, #3DDC84, #006C34)",
              color: "#fff",
              fontFamily: "Roboto, sans-serif",
            }}
            aria-label="Aakash Jha profile avatar"
          >
            AJ
          </div>
          <div
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ background: "#3DDC84", color: "#000", fontWeight: 700 }}
          >
            ✓
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <h1 className="text-2xl font-medium" style={{ color: text }}>
            Aakash Jha
          </h1>
          <p className="text-sm mt-1" style={{ color: "#3DDC84" }}>
            Software Developer · Full Stack
          </p>
          <p className="text-xs mt-1" style={{ color: subtext }}>
            Final-year MCA @ ABES Engineering College
          </p>
        </motion.div>

        {/* Quick actions row */}
        <motion.div
          className="flex justify-center gap-4 mt-5"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {QUICK_ACTIONS.map((action, i) => (
            <motion.button
              key={action.label}
              className="flex flex-col items-center gap-1"
              whileTap={{ scale: 0.88 }}
              onClick={action.action}
              aria-label={action.label}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm"
                style={{ background: isDark ? "rgba(61,220,132,0.15)" : "rgba(0,108,52,0.12)", border: "1px solid rgba(61,220,132,0.25)" }}
              >
                {action.icon}
              </div>
              <span className="text-[10px] font-medium" style={{ color: subtext }}>{action.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Info sections */}
      <div className="px-4 py-4 space-y-3">
        {/* Bio */}
        <motion.div
          className="rounded-[18px] overflow-hidden"
          style={{ background: surface, border: `1px solid ${border}` }}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: border }}>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#3DDC84" }}>About Me</p>
          </div>
          <div className="px-4 py-4 space-y-3">
            <p className="text-sm leading-relaxed" style={{ color: subtext }}>
              I'm <strong style={{ color: text }}>Aakash Jha</strong>, a software developer and MCA student at{" "}
              <strong style={{ color: text }}>ABES Engineering College</strong>. My journey began with a BCA from IPEM College,
              where I discovered my passion for building software that solves real problems.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: subtext }}>
              From my first C project to shipping <strong style={{ color: text }}>10+ live applications</strong> on Vercel,
              I combine strong fundamentals in Java and DSA with modern full-stack web development.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: subtext }}>
              <strong style={{ color: "#FFD700" }}>🏆 TCS CodeVita S12 — Global Rank #1799</strong> among 300,000+ participants.
            </p>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          className="rounded-[18px] overflow-hidden"
          style={{ background: surface, border: `1px solid ${border}` }}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: border }}>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#3DDC84" }}>Interests</p>
          </div>
          <div className="px-4 py-3 flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(61,220,132,0.12)", color: "#3DDC84", border: "1px solid rgba(61,220,132,0.22)" }}
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Education timeline */}
        <motion.div
          className="rounded-[18px] overflow-hidden"
          style={{ background: surface, border: `1px solid ${border}` }}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: border }}>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#3DDC84" }}>Education</p>
          </div>
          <div className="px-4 py-3 space-y-0">
            {EDUCATION.map((edu, i) => (
              <div
                key={edu.id}
                className="relative flex gap-4 pb-4"
                style={{ borderLeft: i < EDUCATION.length - 1 ? `2px solid ${border}` : undefined, marginLeft: 10 }}
              >
                <div
                  className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: "#3DDC84" }}
                />
                <div className="pl-5 flex-1">
                  <p className="text-sm font-medium" style={{ color: text }}>{edu.degree}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#3DDC84" }}>{edu.institution}</p>
                  <p className="text-xs mt-0.5" style={{ color: subtext }}>{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "Live Apps", value: "10+", icon: "🚀" },
            { label: "Repos", value: "23+", icon: "🐙" },
            { label: "Global Rank", value: "#1799", icon: "🏆" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-[16px] p-3 text-center"
              style={{ background: surface, border: `1px solid ${border}` }}
            >
              <p className="text-xl">{s.icon}</p>
              <p className="text-base font-bold mt-1" style={{ color: "#3DDC84" }}>{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: subtext }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
