import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Lightweight CSS fade — no client JS, no animation libraries. */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <div
      className={cn("animate-fade-up", className)}
      style={delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
