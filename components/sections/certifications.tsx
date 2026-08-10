"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { GlassCard } from "@/components/premium/glass-card";
import { CERTIFICATIONS } from "@/lib/constants";

export function CertificationsSection() {
  return (
    <SectionWrapper
      id="certifications"
      badge="Certifications"
      title="Credentials & Certifications"
      subtitle="Validated skills and competitive achievements."
      className="bg-muted/30"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <GlassCard className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                <Award className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h3 className="font-semibold">{cert.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                <span className="mt-2 inline-block text-xs text-violet-400">
                  {cert.date}
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
