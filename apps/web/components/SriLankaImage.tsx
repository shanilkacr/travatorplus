import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SriLankaImageMeta } from "@/lib/images";

interface SriLankaImageProps {
  image: SriLankaImageMeta;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  rounded?: "lg" | "xl" | "2xl" | "3xl";
}

const roundedMap = {
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-4xl",
  "3xl": "rounded-4xl",
};

export function SriLankaImage({
  image,
  className,
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = "3xl",
}: SriLankaImageProps) {
  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", roundedMap[rounded], className)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={1200}
      height={800}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", roundedMap[rounded], className)}
    />
  );
}
