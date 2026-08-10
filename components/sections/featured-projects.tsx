"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SectionWrapper } from "@/components/premium/section-wrapper";
import { ProjectCard } from "@/components/projects/project-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects, filterAndSortProjects, type SortOption } from "@/lib/projects";
import { PROJECT_FILTERS, PROJECT_SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("latest");

  const filteredProjects = useMemo(
    () => filterAndSortProjects(projects, { search, category, sort }),
    [search, category, sort]
  );

  return (
    <SectionWrapper
      id="projects"
      badge="Projects"
      title="Featured Projects"
      subtitle="A curated collection of full-stack applications, AI projects, and production deployments."
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-white/10 bg-white/5 pl-10 backdrop-blur-xl"
          />
        </div>

        <div className="flex gap-3">
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[140px] border-white/10 bg-white/5">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setCategory(filter)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all duration-200",
              category === filter
                ? "border-violet-500/50 bg-violet-500/20 text-violet-300"
                : "border-white/10 bg-white/5 text-muted-foreground hover:border-violet-500/30 hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No projects match your filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
