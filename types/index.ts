export type ProjectStatus = "live" | "in-progress" | "completed" | "archived";

export type ProjectCategory =
  | "Full Stack"
  | "Java"
  | "React"
  | "Next.js"
  | "AI"
  | "Database"
  | "Mobile"
  | "Other";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  date: string;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  githubUrl: string;
  liveUrl: string | null;
  screenshots: string[];
  category: ProjectCategory;
  problemStatement: string;
  features: string[];
  architecture: string;
  challenges: string[];
  learnings: string[];
}

export interface LiveProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  liveUrl: string;
  githubUrl: string;
  status: "live" | "beta" | "maintenance";
  technologies: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  icon: string;
  year: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
  topRepos: GitHubRepo[];
  avatarUrl: string;
  login: string;
  name: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
