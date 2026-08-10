"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Lightbulb, Rocket } from "lucide-react";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { GlassCard } from "@/components/premium/glass-card";
import { INTERESTS } from "@/lib/constants";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Building end-to-end web applications with React, Next.js, Node.js, and modern databases.",
  },
  {
    icon: Brain,
    title: "Problem Solver",
    description:
      "Global Rank 1799 in TCS CodeVita Season 12. Strong foundation in DSA, algorithms, and competitive programming.",
  },
  {
    icon: Lightbulb,
    title: "Product Mindset",
    description:
      "I think beyond code — focusing on user experience, engagement, and shipping products people actually use.",
  },
  {
    icon: Rocket,
    title: "Continuous Learner",
    description:
      "Currently pursuing MCA at ABES Engineering College while building live products and contributing to open source.",
  },
];

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      badge="About Me"
      title="Building Products That Matter"
      subtitle="A passionate software developer with a product-building mindset, focused on creating impactful digital experiences."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="h-full">
            <h3 className="mb-4 text-xl font-semibold">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m <strong className="text-foreground">Aakash Jha</strong>, a Software Developer
                and MCA student at <strong className="text-foreground">ABES Engineering College</strong>.
                My journey began with a BCA from IPEM College, where I discovered my passion for
                building software that solves real problems.
              </p>
              <p>
                From my first C project (a Product Management System) to shipping 10+ live
                applications on Vercel, I&apos;ve grown into a developer who combines strong
                fundamentals in Java and DSA with modern full-stack web development.
              </p>
              <p>
                I&apos;m deeply interested in <strong className="text-foreground">Artificial Intelligence</strong>,
                product development, and creating interfaces that feel premium — inspired by companies
                like Linear, Vercel, and Stripe.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400"
                >
                  {interest}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                  <item.icon className="h-5 w-5 text-violet-400" />
                </div>
                <h4 className="mb-2 font-semibold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
