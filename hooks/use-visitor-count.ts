"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchVisitorCount(): Promise<{ count: number }> {
  const res = await fetch("/api/visitors");
  if (!res.ok) throw new Error("Failed to fetch visitor count");
  return res.json();
}

export function useVisitorCount() {
  return useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
    staleTime: 1000 * 60 * 5,
  });
}
