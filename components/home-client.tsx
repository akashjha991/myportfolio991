"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/premium/loading-screen";
import { ScrollProgress } from "@/components/premium/scroll-progress";
import { AnimatedCursor } from "@/components/premium/animated-cursor";
import { GradientBackground } from "@/components/premium/gradient-background";
import { ParticleField } from "@/components/premium/particle-field";
import {
  CommandPalette,
  useCommandPalette,
} from "@/components/premium/command-palette";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { AchievementsSection } from "@/components/sections/achievements";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { LiveProductsSection } from "@/components/sections/live-products";
import { GitHubDashboardSection } from "@/components/sections/github-dashboard";
import { EducationSection } from "@/components/sections/education";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";

export function HomeClient() {
  const { open, setOpen } = useCommandPalette();

  useEffect(() => {
    fetch("/api/visitors", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <AnimatedCursor />
      <GradientBackground />
      <ParticleField />
      <Navbar onOpenCommand={() => setOpen(true)} />
      <CommandPalette open={open} onOpenChange={setOpen} />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AchievementsSection />
        <LiveProductsSection />
        <FeaturedProjectsSection />
        <GitHubDashboardSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Android Mode floating button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(61,220,132,0.4)] active:scale-95"
        style={{
          background: "linear-gradient(135deg, #3DDC84, #006C34)",
          color: "#000",
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Switch to Android OS themed portfolio view"
        onClick={() => {
          // Record that this desktop user explicitly chose Android mode
          document.cookie = "view-preference=android; path=/; max-age=86400";
          window.location.href = "/android";
        }}
      >
        <span role="img" aria-hidden="true" style={{ fontSize: 16 }}>🤖</span>
        Android Mode
      </button>
    </>
  );
}

