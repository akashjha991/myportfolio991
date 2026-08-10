"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, Star, GitBranch } from "lucide-react";
import Image from "next/image";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { GlassCard } from "@/components/premium/glass-card";
import { AnimatedCounter } from "@/components/premium/animated-counter";
import { useGitHubStats } from "@/hooks/use-github";
import { getLanguagePercentages, LANGUAGE_COLORS } from "@/lib/github";
import { SITE_CONFIG } from "@/lib/constants";

export function GitHubDashboardSection() {
  const { data, isLoading, error } = useGitHubStats();

  return (
    <SectionWrapper
      id="github"
      badge="GitHub"
      title="Open Source Activity"
      subtitle="Real-time stats from my GitHub profile — repositories, languages, and contributions."
      className="bg-muted/30"
    >
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      )}

      {error && (
        <GlassCard className="text-center">
          <p className="text-muted-foreground">
            Unable to load GitHub data. Visit my{" "}
            <a
              href={SITE_CONFIG.github}
              className="text-violet-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile
            </a>{" "}
            directly.
          </p>
        </GlassCard>
      )}

      {data && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Repositories", value: data.publicRepos, icon: GitBranch },
              { label: "Total Stars", value: data.totalStars, icon: Star },
              { label: "Forks", value: data.totalForks, icon: GitFork },
              { label: "Followers", value: data.followers, icon: GitBranch },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="text-center">
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-violet-400" />
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <h3 className="mb-4 font-semibold">Languages Used</h3>
              <div className="space-y-3">
                {getLanguagePercentages(data.languages).map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span className="text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: LANGUAGE_COLORS[lang.name] || "#8b5cf6",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="mb-4 font-semibold">Contribution Activity</h3>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={`https://ghchart.rshah.org/${SITE_CONFIG.githubUsername}`}
                  alt="GitHub contribution chart"
                  width={700}
                  height={120}
                  className="w-full"
                  unoptimized
                />
              </div>
            </GlassCard>
          </div>

          <div className="mt-6">
            <h3 className="mb-4 font-semibold">Top Repositories</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.topRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{repo.name}</h4>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {repo.description || "No description"}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor:
                                LANGUAGE_COLORS[repo.language] || "#8b5cf6",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </GlassCard>
                </motion.a>
              ))}
            </div>
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
