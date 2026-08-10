"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { EDUCATION } from "@/lib/constants";

export function EducationSection() {
  return (
    <SectionWrapper
      id="education"
      badge="Education"
      title="Academic Journey"
      subtitle="Building strong foundations in computer science and software engineering."
    >
      <div className="relative">
        <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/50 via-blue-500/30 to-transparent md:block" />

        <div className="space-y-8">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="relative flex gap-6 md:gap-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="relative z-10 hidden md:flex">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 backdrop-blur-xl">
                  <GraduationCap className="h-7 w-7 text-violet-400" />
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <p className="text-violet-400">{edu.institution}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{edu.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {edu.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
