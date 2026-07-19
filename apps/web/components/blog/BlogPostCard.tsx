import Link from "next/link";
import type { PostMeta } from "@/lib/blog-taxonomy";
import { SriLankaImage } from "@/components/SriLankaImage";
import { getBlogImage } from "@/lib/images";

export function formatPostDate(d: string) {
  return new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Grid card: image, category, title, excerpt, author byline. */
export function BlogPostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative h-52 w-full overflow-hidden rounded-[18px]">
        <SriLankaImage
          image={getBlogImage(post.slug)}
          fill
          rounded="none"
          className="rounded-none transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs text-gray-500">
          {post.category} · {post.readingTime}
        </p>

        <h3 className="mt-2 text-lg leading-snug transition-colors group-hover:text-gray-500">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-7 w-7 shrink-0 place-items-center rounded-[9px] bg-gray-100 text-xs text-ink"
          >
            {post.author.charAt(0)}
          </span>
          <p className="min-w-0 truncate text-xs text-gray-500">
            {post.author} · {formatPostDate(post.date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
