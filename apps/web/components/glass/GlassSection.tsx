import { cn } from "@/lib/utils";

interface GlassSectionProps {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}

export function GlassSection({
  children,
  className,
  muted = false,
  id,
}: GlassSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        muted && "bg-gray-50/50",
        className
      )}
    >
      {children}
    </section>
  );
}
