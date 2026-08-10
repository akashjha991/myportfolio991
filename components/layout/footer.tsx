"use client";

import { Mail, Heart } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { useVisitorCount } from "@/hooks/use-visitor-count";

export function Footer() {
  const { data } = useVisitorCount();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 text-sm font-bold text-white">
              AJ
            </div>
            <div>
              <p className="text-sm font-medium">{SITE_CONFIG.name}</p>
              <p className="text-xs text-muted-foreground">Software Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-center text-xs text-muted-foreground md:text-right">
            <p className="flex items-center justify-center gap-1 md:justify-end">
              Built with <Heart className="h-3 w-3 text-red-500" /> by Aakash Jha
            </p>
            {data && (
              <p className="mt-1">
                {data.count.toLocaleString()} visitors
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog (Coming Soon)
          </Link>
          <span>·</span>
          <a href="#projects" className="hover:text-foreground transition-colors">
            Projects
          </a>
          <span>·</span>
          <a href="#contact" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
