import Link from "next/link";
import { cn } from "@/lib/utils";

export type BlogCardItem = {
  title: string;
  description: string;
  link: string;
  image: React.ReactNode;
};

export function BlogCardList({ items }: { items: BlogCardItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className={cn(
            "group overflow-hidden rounded-4xl bg-white/50 shadow-glass transition-shadow duration-200",
            "hover:shadow-glass-lg"
          )}
        >
          {item.image}
          <div className="p-6">
            <h2 className="text-xl transition-colors group-hover:text-ink">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
