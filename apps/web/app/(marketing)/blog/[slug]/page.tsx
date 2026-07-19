import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostSlugs, getPostMeta } from "@/lib/blog";
import { FadeIn } from "@/components/FadeIn";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { SriLankaImage } from "@/components/SriLankaImage";
import { getBlogImage } from "@/lib/images";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  try {
    const meta = getPostMeta(params.slug);
    return { title: meta.title, description: meta.excerpt };
  } catch {
    return {};
  }
}

function formatDate(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!getPostSlugs().includes(params.slug)) notFound();
  const meta = getPostMeta(params.slug);
  const { default: Post } = await import(`@/content/blog/${params.slug}.mdx`);

  return (
    <article>
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <SriLankaImage
          image={getBlogImage(params.slug)}
          fill
          priority
          rounded="3xl"
          className="rounded-none"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
      </div>

      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-prose">
          <FadeIn>
            <Link
              href="/blog"
              className="text-xs text-gray-500 transition-colors hover:text-ink"
            >
              ← All posts
            </Link>
            <div className="mt-8 flex items-center gap-3 text-xs text-gray-500">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span aria-hidden>·</span>
              <span>{meta.readingTime}</span>
            </div>
            <h1 className="mt-4 text-4xl leading-[1.08] tracking-tightest md:text-5xl">
              {meta.title}
            </h1>
          </FadeIn>
          <FadeIn delay={80} className="mt-10">
            <GlassPanel className="prose prose-sm max-w-none">
              <Post />
            </GlassPanel>
          </FadeIn>
        </div>
      </div>
    </article>
  );
}
