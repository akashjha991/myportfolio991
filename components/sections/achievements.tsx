"use client";

import { motion } from "framer-motion";
import { Database, GitBranch, Rocket, Trophy } from "lucide-react";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { GlassCard } from "@/components/premium/glass-card";
import { AnimatedCounter } from "@/components/premium/animated-counter";
import { ACHIEVEMENTS } from "@/lib/constants";

const iconComponents = {
  Trophy,
  Database,
  GitBranch,
  Rocket,
} as const;

export function AchievementsSection() {
  return (
    <SectionWrapper
      id="achievements"
      badge="Achievements"
      title="Milestones & Recognition"
      subtitle="Competitive programming success, certifications, and a track record of shipping products."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((achievement, i) => {
          const Icon = iconComponents[achievement.icon as keyof typeof iconComponents];
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>
                <div className="text-3xl font-bold">
                  {"numericValue" in achievement && achievement.numericValue ? (
                    <AnimatedCounter
                      value={achievement.numericValue}
                      suffix={"suffix" in achievement ? achievement.suffix : ""}
                    />
                  ) : (
                    achievement.value
                  )}
                </div>
                <h3 className="mt-2 font-semibold">{achievement.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {achievement.description}
                </p>
                <span className="mt-3 inline-block text-xs text-violet-400">
                  {achievement.year}
                </span>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
