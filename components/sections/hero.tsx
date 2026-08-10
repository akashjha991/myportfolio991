"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import { LinkButton } from "@/components/ui/link-button";
import { TypingAnimation } from "@/components/premium/typing-animation";
import { SITE_CONFIG, TYPING_ROLES } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:gap-16 lg:text-left">
          <motion.div
            className="relative mb-8 lg:mb-0 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500/30 to-blue-500/30 blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
              <Image
                src="/profile.jpg"
                alt="Aakash Jha"
                width={200}
                height={200}
                className="rounded-xl"
                priority
              />
            </div>
            <motion.div
              className="absolute -right-2 -top-2 flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 backdrop-blur-sm"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              Available for work
            </motion.div>
          </motion.div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400">
                <Sparkles className="h-3.5 w-3.5" />
                Software Developer & Product Builder
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Aakash Jha
                </span>
              </h1>

              <div className="mt-4 h-8 text-xl text-muted-foreground sm:text-2xl">
                <TypingAnimation words={TYPING_ROLES} />
              </div>

              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                I build production-ready web applications with Java, React, and Next.js.
                MCA student at ABES Engineering College with a global rank of{" "}
                <span className="font-semibold text-foreground">1799 in TCS CodeVita</span>.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <LinkButton
                  size="lg"
                  href="#products"
                  className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500"
                >
                  View Projects
                  <ArrowDown className="ml-2 h-4 w-4" />
                </LinkButton>
                <LinkButton
                  size="lg"
                  variant="outline"
                  href={SITE_CONFIG.resumeUrl}
                  download
                  className="border-white/10"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </LinkButton>
                <LinkButton size="lg" variant="ghost" href="#contact">
                  Contact Me
                </LinkButton>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
                <a
                  href={SITE_CONFIG.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-violet-500/30 hover:text-foreground"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
                <a
                  href={SITE_CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-violet-500/30 hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-violet-500/30 hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" aria-label="Scroll to about">
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </a>
      </motion.div>
    </section>
  );
}
