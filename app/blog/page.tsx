import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { GlassCard } from "@/components/premium/glass-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Aakash Jha",
  description: "Technical articles and insights on software development.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <LinkButton variant="ghost" size="sm" href="/" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back Home
        </LinkButton>

        <GlassCard className="text-center py-16">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-4 text-muted-foreground">
            Technical articles and development insights coming soon.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Architecture is blog-ready — add MDX content when you&apos;re ready to publish.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
