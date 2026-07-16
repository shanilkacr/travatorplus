import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon?: React.ElementType;
  description: string;
  step?: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(12rem,auto)] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  step,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-4xl shadow-glass",
      "bg-white/50 transition-shadow duration-200 hover:bg-white/65 hover:shadow-glass-lg",
      className
    )}
    {...props}
  >
    {background && <div className="absolute inset-0 opacity-40">{background}</div>}
    <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
      <div>
        {step && (
          <span className="font-headline text-2xl text-gray-300">{step}</span>
        )}
        {Icon && (
          <Icon className="mb-4 h-8 w-8 text-ink opacity-60" strokeWidth={1.5} />
        )}
        <h3 className="text-xl font-light tracking-headline">{name}</h3>
        <p className="mt-3 max-w-lg text-sm text-gray-500">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 opacity-0 transition-opacity group-hover:opacity-100">
        <span>Learn more</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
