"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { SKILL_CATEGORIES } from "@/lib/constants";

export function SkillsSection() {
  return (
    <SectionWrapper
      id="skills"
      badge="Skills"
      title="Technical Expertise"
      subtitle="A diverse toolkit spanning languages, frameworks, databases, and developer tools."
      className="bg-muted/30"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category, ci) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
          >
            <h3 className="mb-4 text-lg font-semibold">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition-all duration-200 group-hover:border-violet-500/20 group-hover:bg-violet-500/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
