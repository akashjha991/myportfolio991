import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
        "dark:border-white/10 dark:bg-white/5",
        hover && "transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-violet-500/5",
        className
      )}
    >
      {children}
    </div>
  );
}
