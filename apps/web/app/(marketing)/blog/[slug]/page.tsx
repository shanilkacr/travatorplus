import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostSlugs, getPostMeta } from "@/lib/blog";

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
  // Statically resolvable dynamic import over content/blog/*.mdx.
  const { default: Post } = await import(`@/content/blog/${params.slug}.mdx`);

  return (
    <article className="container-editorial py-20 md:py-28">
      <div className="mx-auto max-w-prose">
        <Link
          href="/blog"
          className="text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-ink"
        >
          ← All posts
        </Link>
        <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          <span aria-hidden>·</span>
          <span>{meta.readingTime}</span>
        </div>
        <h1 className="mt-4 text-4xl leading-[1.08] tracking-tightest md:text-5xl">
          {meta.title}
        </h1>
        <hr className="mt-10" />
        <div className="mt-2">
          <Post />
        </div>
      </div>
    </article>
  );
}
