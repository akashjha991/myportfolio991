import type { GitHubRepo, GitHubStats } from "@/types";
import { SITE_CONFIG } from "./constants";

const GITHUB_API = "https://api.github.com";

export async function fetchGitHubUser(username: string) {
  const res = await fetch(`${GITHUB_API}/users/${username}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  return res.json();
}

export async function getGitHubStats(): Promise<GitHubStats> {
  const username = SITE_CONFIG.githubUsername;

  const [user, repos] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
  ]);

  const languages: Record<string, number> = {};
  let totalStars = 0;
  let totalForks = 0;

  for (const repo of repos) {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    totalStars,
    totalForks,
    languages,
    topRepos,
    avatarUrl: user.avatar_url,
    login: user.login,
    name: user.name,
  };
}

export function getLanguagePercentages(
  languages: Record<string, number>
): { name: string; percentage: number; count: number }[] {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
};
