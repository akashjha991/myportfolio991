"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BottomSheet } from "../ui/bottom-sheet";

interface SkillsAppProps {
  theme: "dark" | "light";
}

interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
  description: string;
}

interface SkillGroup {
  title: string;
  icon: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    icon: "💻",
    skills: [
      { name: "JavaScript", icon: "JS", level: 5, description: "Primary language for both frontend and backend. Used in all major projects." },
      { name: "TypeScript", icon: "TS", level: 4, description: "Strongly typed JS. Used in PokeUs, Bondly, and HeyBuddy with full type-safety." },
      { name: "Java", icon: "☕", level: 4, description: "Core language with deep knowledge of OOP, Spring Boot, and data structures." },
      { name: "Python", icon: "🐍", level: 3, description: "Used for ML/AI projects including Speech Emotion Detector." },
      { name: "C", icon: "C", level: 3, description: "First programming language — built Product Management System in C." },
      { name: "SQL", icon: "🗄", level: 4, description: "SQL Essentials Bootcamp certified. MySQL used in multiple projects." },
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", icon: "⚛", level: 5, description: "Core frontend library. Used in nearly every project." },
      { name: "Next.js", icon: "▲", level: 5, description: "Full-stack React framework. Used for portfolio, PokeUs, Bondly." },
      { name: "Tailwind CSS", icon: "🌊", level: 5, description: "Utility-first CSS used across all modern projects." },
      { name: "Framer Motion", icon: "🎬", level: 4, description: "Animations and transitions — including this Android OS simulation!" },
      { name: "Redux", icon: "🔄", level: 3, description: "State management — used in Dinacharya habit tracker." },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", icon: "🟢", level: 4, description: "Server runtime. Used in Bondly, ApnaStore, Video Conferencing." },
      { name: "Express.js", icon: "🚂", level: 4, description: "REST API framework. Powers the backend of multiple projects." },
      { name: "Spring Boot", icon: "🍃", level: 3, description: "Java web framework for enterprise-grade applications." },
      { name: "WebRTC", icon: "📹", level: 3, description: "Real-time video communication — Video Conferencing project." },
    ],
  },
  {
    title: "Databases & Realtime",
    icon: "🗃",
    skills: [
      { name: "MongoDB", icon: "🍃", level: 4, description: "Document database. Used in PokeUs, ApnaStore, and more." },
      { name: "MySQL", icon: "🐬", level: 4, description: "Relational DB — Store Rating Platform." },
      { name: "Socket.io", icon: "⚡", level: 3, description: "Real-time bidirectional events for chat and video apps." },
    ],
  },
  {
    title: "Other",
    icon: "🔧",
    skills: [
      { name: "Git & GitHub", icon: "🐙", level: 5, description: "Version control, branching, PRs. 23+ public repositories." },
      { name: "Vercel", icon: "▲", level: 4, description: "Primary deployment platform — 10+ apps live on Vercel." },
      { name: "ServiceNow", icon: "🔵", level: 2, description: "ITSM platform. Basic workflow and Apex development." },
    ],
  },
];

const LEVEL_LABELS = ["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

export function SkillsApp({ theme }: SkillsAppProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isDark = theme === "dark";
  const bg = isDark ? "#0F0F0F" : "#FAFAFA";
  const surface = isDark ? "#1A1A1A" : "#FFFFFF";
  const text = isDark ? "#E6E1E5" : "#1C1B1F";
  const subtext = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const rowHover = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";

  const handleSkillTap = (skill: Skill) => {
    setSelectedSkill(skill);
    setSheetOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative" style={{ background: bg, color: text }}>
      {/* Settings-style header */}
      <div className="px-4 pt-4 pb-3" style={{ background: isDark ? "#131313" : "#F5F5F5", borderBottom: `1px solid ${border}` }}>
        <h1 className="text-xl font-medium" style={{ color: text }}>Settings · Skills</h1>
        <p className="text-xs mt-1" style={{ color: subtext }}>Tap any skill to see details</p>
      </div>

      {/* Settings groups */}
      <div className="flex-1 overflow-y-auto py-3 space-y-1">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.07 }}
          >
            {/* Group header */}
            <div className="px-5 py-1.5 flex items-center gap-2">
              <span className="text-base">{group.icon}</span>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#3DDC84" }}>
                {group.title}
              </p>
            </div>

            {/* Group rows */}
            <div className="mx-4 rounded-[18px] overflow-hidden" style={{ background: surface, border: `1px solid ${border}` }}>
              {group.skills.map((skill, si) => (
                <motion.button
                  key={skill.name}
                  className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left"
                  style={{
                    borderTop: si > 0 ? `1px solid ${border}` : undefined,
                  }}
                  whileTap={{ background: rowHover }}
                  onClick={() => handleSkillTap(skill)}
                  aria-label={`${skill.name} — ${LEVEL_LABELS[skill.level]}`}
                >
                  {/* Skill icon badge */}
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "rgba(61,220,132,0.15)", color: "#3DDC84", fontFamily: "Roboto Mono, monospace" }}
                  >
                    {typeof skill.icon === "string" && skill.icon.length <= 2 ? skill.icon : "•"}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: text }}>{skill.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: subtext }}>{LEVEL_LABELS[skill.level]}</p>
                  </div>

                  {/* Proficiency bar */}
                  <div className="flex items-center gap-1" aria-hidden="true">
                    {[1,2,3,4,5].map((dot) => (
                      <div
                        key={dot}
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{ background: dot <= skill.level ? "#3DDC84" : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" }}
                      />
                    ))}
                    <span className="text-[#3DDC84]/60 text-xs ml-1">›</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
        <div style={{ height: 16 }} />
      </div>

      {/* Skill detail bottom sheet */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={selectedSkill?.name}
      >
        {selectedSkill && (
          <div className="space-y-4 pb-2">
            {/* Level indicator */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: text }}>Proficiency</p>
              <p className="text-sm font-semibold" style={{ color: "#3DDC84" }}>
                {LEVEL_LABELS[selectedSkill.level]}
              </p>
            </div>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map((dot) => (
                <div
                  key={dot}
                  className="flex-1 h-2 rounded-full"
                  style={{ background: dot <= selectedSkill.level ? "#3DDC84" : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)" }}
                />
              ))}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: subtext }}>
              {selectedSkill.description}
            </p>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
