"use client";

import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { GlassCard } from "@/components/premium/glass-card";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  live: "bg-green-500/10 text-green-400 border-green-500/20",
  "in-progress": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <GlassCard className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-lg font-bold text-violet-400">
            {project.title.charAt(0)}
          </div>
          <Badge
            variant="outline"
            className={cn("text-xs capitalize", statusColors[project.status])}
          >
            {project.status}
          </Badge>
        </div>

        <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-muted-foreground">
            {new Date(project.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <div className="flex gap-2">
            {project.liveUrl && (
              <LinkButton
                size="sm"
                variant="ghost"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="h-4 w-4" />
              </LinkButton>
            )}
            <LinkButton
              size="sm"
              variant="ghost"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="h-8 w-8 p-0"
            >
              <GitHubIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              size="sm"
              variant="ghost"
              href={`/projects/${project.slug}`}
              className="h-8 gap-1 px-2"
            >
              Details
              <ArrowRight className="h-3 w-3" />
            </LinkButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
