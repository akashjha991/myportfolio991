"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContextMenu } from "../ui/context-menu";
import projectsData from "@/data/projects.json";

interface ProjectsAppProps {
  theme: "dark" | "light";
}

const FILTERS = ["All", "Full Stack", "React", "AI", "Other"];

const PROJECT_ICONS: Record<string, { icon: string; gradient: string }> = {
  pokeus: { icon: "💕", gradient: "from-pink-500 to-rose-600" },
  bondly: { icon: "🔗", gradient: "from-blue-500 to-indigo-600" },
  "mausam-sathi": { icon: "⛅", gradient: "from-sky-400 to-blue-600" },
  heybuddy: { icon: "⚽", gradient: "from-green-500 to-emerald-600" },
  "speech-emotion": { icon: "🎙️", gradient: "from-violet-500 to-purple-700" },
  apnastore: { icon: "🛒", gradient: "from-orange-400 to-red-500" },
  "video-conferencing": { icon: "📹", gradient: "from-teal-400 to-cyan-600" },
  dinacharya: { icon: "📅", gradient: "from-amber-400 to-orange-500" },
  "store-rating": { icon: "⭐", gradient: "from-yellow-400 to-amber-600" },
  "real-estate": { icon: "🏠", gradient: "from-stone-400 to-stone-600" },
};

export function ProjectsApp({ theme }: ProjectsAppProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    open: boolean; x: number; y: number; project: (typeof projectsData)[0] | null;
  }>({ open: false, x: 0, y: 0, project: null });

  const isDark = theme === "dark";
  const bg = isDark ? "#0F0F0F" : "#FAFAFA";
  const surface = isDark ? "#1A1A1A" : "#FFFFFF";
  const text = isDark ? "#E6E1E5" : "#1C1B1F";
  const subtext = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const filtered = activeFilter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  const handleLongPress = (e: React.PointerEvent, project: (typeof projectsData)[0]) => {
    setContextMenu({ open: true, x: e.clientX, y: e.clientY, project });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: bg, color: text }}>
      {/* Play Store header */}
      <div
        className="px-4 pt-4 pb-3"
        style={{ background: isDark ? "#131313" : "#F5F5F5", borderBottom: `1px solid ${border}` }}
      >
        <h1 className="text-xl font-medium mb-3" style={{ color: text }}>Apps & Projects</h1>
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              style={{
                background: activeFilter === f
                  ? "#3DDC84"
                  : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                color: activeFilter === f ? "#000" : subtext,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              aria-label={`Filter by ${f}`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => {
            const iconData = PROJECT_ICONS[project.id] ?? { icon: "📦", gradient: "from-gray-500 to-gray-700" };
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-[18px] overflow-hidden"
                style={{ background: surface, border: `1px solid ${border}` }}
              >
                {/* App listing row */}
                <motion.div
                  className="flex items-center gap-3 px-4 py-3.5"
                  whileTap={{ scale: 0.99, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" }}
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  onPointerDown={(e) => {
                    const timer = setTimeout(() => handleLongPress(e, project), 500);
                    const cleanup = () => clearTimeout(timer);
                    e.currentTarget.addEventListener("pointerup", cleanup, { once: true });
                    e.currentTarget.addEventListener("pointerleave", cleanup, { once: true });
                  }}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`${project.title} — ${isExpanded ? "collapse" : "expand"} details`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-[16px] bg-gradient-to-br ${iconData.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                  >
                    {iconData.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: text }}>{project.title}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: subtext }}>{project.description}</p>
                    {/* Star rating decorative */}
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="text-[10px]" style={{ color: s <= 4 ? "#FFD700" : "rgba(255,255,255,0.2)" }}>★</span>
                      ))}
                      <span className="text-[10px] ml-0.5" style={{ color: subtext }}>4.{project.featured ? "8" : "5"}</span>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col gap-1.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-center whitespace-nowrap"
                        style={{ background: "#3DDC84", color: "#000" }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} live`}
                      >
                        View App
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-center whitespace-nowrap"
                        style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)", color: text }}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} source code`}
                      >
                        Source
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ borderTop: `1px solid ${border}`, overflow: "hidden" }}
                    >
                      <div className="px-4 py-4 space-y-3">
                        <p className="text-xs leading-relaxed" style={{ color: subtext }}>
                          {project.longDescription}
                        </p>

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#3DDC84" }}>
                              Features
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.features.slice(0, 4).map((f) => (
                                <span
                                  key={f}
                                  className="px-2 py-1 rounded-full text-[10px]"
                                  style={{ background: "rgba(61,220,132,0.12)", color: "#3DDC84", border: "1px solid rgba(61,220,132,0.2)" }}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech stack */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: subtext }}>
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-1 rounded-full text-[10px]"
                                style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: text }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Context Menu */}
      <ContextMenu
        open={contextMenu.open}
        onClose={() => setContextMenu((p) => ({ ...p, open: false }))}
        x={contextMenu.x}
        y={contextMenu.y}
        anchorLabel={contextMenu.project?.title}
        items={[
          {
            icon: "🔗",
            label: "Share",
            onClick: () => {
              if (contextMenu.project?.liveUrl) {
                navigator.clipboard?.writeText(contextMenu.project.liveUrl).catch(() => {});
              }
            },
          },
          {
            icon: "💻",
            label: "View Code",
            onClick: () => {
              if (contextMenu.project?.githubUrl) {
                window.open(contextMenu.project.githubUrl, "_blank");
              }
            },
          },
          {
            icon: "📌",
            label: "Pin to Dock",
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}
