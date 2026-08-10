"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ANDROID_APPS, type AppId } from "@/lib/android-theme";
import { AboutApp } from "./apps/about-app";
import { ProjectsApp } from "./apps/projects-app";
import { SkillsApp } from "./apps/skills-app";
import { AchievementsApp } from "./apps/achievements-app";
import { ContactApp } from "./apps/contact-app";

interface AppLauncherProps {
  activeApp: AppId;
  theme: "dark" | "light";
  onClose: () => void;
  onOpenShade: () => void;
}

const APP_TITLES: Partial<Record<AppId, string>> = {
  about: "About",
  projects: "Projects",
  skills: "Skills",
  achievements: "Achievements",
  contact: "Contact",
};

export function AppLauncher({ activeApp, theme, onClose, onOpenShade }: AppLauncherProps) {
  const isDark = theme === "dark";
  const appDef = ANDROID_APPS.find((a) => a.id === activeApp);
  const title = APP_TITLES[activeApp] ?? appDef?.label ?? activeApp;

  const bg = isDark ? "#0F0F0F" : "#FAFAFA";
  const headerBg = isDark ? "#131313" : "#F0F0F0";
  const text = isDark ? "#E6E1E5" : "#1C1B1F";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  return (
    <motion.div
      key={`app-${activeApp}`}
      className="absolute inset-0 flex flex-col z-10"
      style={{ background: bg }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 32 }}
      layoutId={`app-icon-${activeApp}`}
    >

      {/* App top bar */}
      <div
        className="flex items-center gap-3 px-3 py-2 flex-shrink-0"
        style={{ background: headerBg, borderBottom: `1px solid ${border}` }}
      >
        <motion.button
          className={`w-9 h-9 rounded-full flex items-center justify-center ${isDark ? "hover:bg-white/10" : "hover:bg-black/6"}`}
          whileTap={{ scale: 0.88 }}
          onClick={onClose}
          aria-label="Close app, go back to home screen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"} strokeWidth="2" strokeLinecap="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </motion.button>
        <div className="flex items-center gap-2">
          {appDef && (
            <div
              className={`w-7 h-7 rounded-[8px] bg-gradient-to-br ${appDef.gradient} flex items-center justify-center text-sm`}
            >
              {appDef.icon}
            </div>
          )}
          <h2 className="text-base font-medium" style={{ color: text }}>{title}</h2>
        </div>
      </div>

      {/* App content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {activeApp === "about" && <AboutApp key="about" theme={theme} />}
          {activeApp === "projects" && <ProjectsApp key="projects" theme={theme} />}
          {activeApp === "skills" && <SkillsApp key="skills" theme={theme} />}
          {activeApp === "achievements" && <AchievementsApp key="achievements" theme={theme} />}
          {activeApp === "contact" && <ContactApp key="contact" theme={theme} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
