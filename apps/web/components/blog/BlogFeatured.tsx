import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostMeta } from "@/lib/blog-taxonomy";
import { SriLankaImage } from "@/components/SriLankaImage";
import { getBlogImage } from "@/lib/images";

/** Lead card: full-bleed photo, scrim, and the post's headline over it. */
export function BlogFeatured({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-[24px] shadow-glass"
    >
      <div className="relative h-[380px] w-full md:h-[460px]">
        <SriLankaImage
          image={getBlogImage(post.slug)}
          fill
          rounded="none"
          className="rounded-none transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width:1024px) 100vw, 1008px"
          priority
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.10)_38%,rgba(0,0,0,0.62)_100%)]"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
        <div className="max-w-2xl">
          <p className="text-sm text-white/80">Featured</p>
          <h2 className="mt-3 text-2xl leading-[1.15] text-white md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/80 md:text-base">
            {post.excerpt}
          </p>
        </div>

        <span
          aria-hidden
          className="hidden h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-white/30 md:grid"
        >
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
