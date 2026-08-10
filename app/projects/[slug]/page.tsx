import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { SITE_CONFIG } from "@/lib/constants";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/premium/glass-card";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — ${SITE_CONFIG.name}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-violet-500/10 to-background pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <LinkButton variant="ghost" size="sm" href="/#projects" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </LinkButton>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="capitalize">
              {project.status}
            </Badge>
            <Badge variant="secondary">{project.category}</Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {project.longDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <LinkButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </LinkButton>
            )}
            <LinkButton
              variant="outline"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-white/10"
            >
              <GitHubIcon className="mr-2 h-4 w-4" />
              View on GitHub
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <GlassCard>
            <h2 className="mb-4 text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground">{project.longDescription}</p>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-4 text-xl font-semibold">Problem Statement</h2>
            <p className="text-muted-foreground">{project.problemStatement}</p>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-4 text-xl font-semibold">Features</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-4 text-xl font-semibold">Architecture</h2>
            <p className="text-muted-foreground">{project.architecture}</p>
          </GlassCard>

          <GlassCard>
            <h2 className="mb-4 text-xl font-semibold">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </GlassCard>

          <div className="grid gap-8 sm:grid-cols-2">
            <GlassCard>
              <h2 className="mb-4 text-xl font-semibold">Challenges</h2>
              <ul className="space-y-2">
                {project.challenges.map((c) => (
                  <li key={c} className="text-sm text-muted-foreground">
                    • {c}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard>
              <h2 className="mb-4 text-xl font-semibold">Learnings</h2>
              <ul className="space-y-2">
                {project.learnings.map((l) => (
                  <li key={l} className="text-sm text-muted-foreground">
                    • {l}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
