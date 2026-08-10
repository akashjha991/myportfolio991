"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  User,
  Code2,
  Trophy,
  FolderOpen,
  Rocket,
  GraduationCap,
  Mail,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";
import { GitHubIcon } from "@/components/icons/brand-icons";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { projects } from "@/lib/projects";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  About: <User className="h-4 w-4" />,
  Skills: <Code2 className="h-4 w-4" />,
  Projects: <FolderOpen className="h-4 w-4" />,
  Products: <Rocket className="h-4 w-4" />,
  GitHub: <GitHubIcon className="h-4 w-4" />,
  Contact: <Mail className="h-4 w-4" />,
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, projects, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => window.scrollTo({ top: 0, behavior: "smooth" }))}>
            <Home className="h-4 w-4" />
            Home
          </CommandItem>
          {NAV_LINKS.map((link) => (
            <CommandItem
              key={link.href}
              onSelect={() =>
                runCommand(() => {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                })
              }
            >
              {iconMap[link.label]}
              {link.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.slice(0, 8).map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() => runCommand(() => router.push(`/projects/${project.slug}`))}
            >
              <FolderOpen className="h-4 w-4" />
              {project.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
            <Moon className="h-4 w-4" />
            Dark Mode
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
            <Sun className="h-4 w-4" />
            Light Mode
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open(SITE_CONFIG.github, "_blank"))}
          >
            <GitHubIcon className="h-4 w-4" />
            View GitHub
            <ExternalLink className="ml-auto h-3 w-3" />
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => window.open(SITE_CONFIG.resumeUrl, "_blank"))}
          >
            <Trophy className="h-4 w-4" />
            Download Resume
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}
