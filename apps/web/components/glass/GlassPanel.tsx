import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function GlassPanel({
  children,
  className,
  as: Tag = "div",
}: GlassPanelProps) {
  return <Tag className={cn("glass-panel p-6 md:p-8", className)}>{children}</Tag>;
}
