"use client";

import { useQuery } from "@tanstack/react-query";
import type { GitHubStats } from "@/types";

async function fetchGitHubStats(): Promise<GitHubStats> {
  const res = await fetch("/api/github");
  if (!res.ok) throw new Error("Failed to fetch GitHub stats");
  return res.json();
}

export function useGitHubStats() {
  return useQuery({
    queryKey: ["github-stats"],
    queryFn: fetchGitHubStats,
    staleTime: 1000 * 60 * 30,
    retry: 2,
  });
}
