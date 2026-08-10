import projectsData from "@/data/projects.json";
import type { Project, ProjectCategory } from "@/types";

export const projects: Project[] = projectsData as Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export type SortOption = "latest" | "oldest" | "featured" | "technology";

export function filterAndSortProjects(
  items: Project[],
  options: {
    search?: string;
    category?: string;
    technology?: string;
    sort?: SortOption;
  }
): Project[] {
  let result = [...items];

  if (options.search) {
    const q = options.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (options.category && options.category !== "All") {
    result = result.filter(
      (p) =>
        p.category === options.category ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(options.category!.toLowerCase())
        )
    );
  }

  if (options.technology) {
    result = result.filter((p) =>
      p.technologies.some((t) =>
        t.toLowerCase().includes(options.technology!.toLowerCase())
      )
    );
  }

  switch (options.sort) {
    case "oldest":
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case "featured":
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
    case "technology":
      result.sort((a, b) => a.technologies[0]?.localeCompare(b.technologies[0] ?? "") ?? 0);
      break;
    case "latest":
    default:
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return result;
}

export function getProjectCategories(): ProjectCategory[] {
  return [...new Set(projects.map((p) => p.category))];
}
