import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getPostSlugs,
  getPostMeta,
  getPostHeadings,
  getRecommended,
} from "@/lib/blog";
import { FadeIn } from "@/components/FadeIn";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { BlogPostCard, formatPostDate } from "@/components/blog/BlogPostCard";
import { BookingCta } from "@/components/BookingCta";
import { SriLankaImage } from "@/components/SriLankaImage";
import { ArticleLd, BreadcrumbLd } from "@/components/StructuredData";
import { getBlogImage } from "@/lib/images";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";

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
    const path = `/blog/${meta.slug}`;
    return {
      title: meta.title,
      description: meta.excerpt,
      alternates: { canonical: path },
      openGraph: {
        type: "article",
        title: meta.title,
        description: meta.excerpt,
        url: absoluteUrl(path),
        publishedTime: meta.date,
        authors: [meta.author],
        section: meta.category,
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: meta.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: meta.title,
        description: meta.excerpt,
        images: [OG_IMAGE],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  if (!getPostSlugs().includes(params.slug)) notFound();

  const meta = getPostMeta(params.slug);
  const headings = getPostHeadings(params.slug);
  const recommended = getRecommended(params.slug);
  const { default: Post } = await import(`@/content/blog/${params.slug}.mdx`);

  return (
    <div className="container-blog pb-28 pt-10 md:pt-14">
      <ArticleLd post={meta} />
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: meta.title, path: `/blog/${meta.slug}` },
        ]}
      />
      {/*
        Three tracks on desktop: contents rail, the article, and the booking
        panel. Both rails are sticky; only the article scrolls past them.
      */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[minmax(0,180px)_minmax(0,1fr)_minmax(0,260px)]">
        {/* Contents rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All posts
          </Link>
          <div className="hidden lg:block">
            <ArticleToc entries={headings} />
          </div>
        </div>

        {/* Article */}
        <article className="min-w-0">
          <FadeIn>
            <h1 className="text-4xl leading-[1.08] tracking-tightest md:text-5xl">
              {meta.title}
            </h1>

            {/* Feature image sits between the title and the description. */}
            <div className="relative mt-9 h-64 w-full overflow-hidden rounded-[18px] md:h-96">
              <SriLankaImage
                image={getBlogImage(params.slug)}
                fill
                priority
                rounded="none"
                className="rounded-none"
                sizes="(max-width:1024px) 100vw, 80vw"
              />
            </div>

            <p className="mt-9 text-lg leading-relaxed text-gray-500">
              {meta.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-gray-100 pt-6 text-sm text-gray-500">
              <span
                aria-hidden
                className="grid h-7 w-7 shrink-0 place-items-center rounded-[9px] bg-gray-100 text-xs text-ink"
              >
                {meta.author.charAt(0)}
              </span>
              <span className="text-ink">{meta.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
              <span aria-hidden>·</span>
              <span>{meta.readingTime}</span>
              <span aria-hidden>·</span>
              <span>{meta.category}</span>
            </div>
          </FadeIn>

          <FadeIn delay={80} className="mt-4">
            <Post />
          </FadeIn>

          {/* Booking panel drops inline below the article on narrow screens. */}
          <div className="mt-14 xl:hidden">
            <BookingCta />
          </div>
        </article>

        {/* Booking rail */}
        <div className="hidden xl:sticky xl:top-28 xl:block xl:self-start">
          <BookingCta />
        </div>
      </div>

      {/* Recommended */}
      {recommended.length > 0 && (
        <section
          aria-labelledby="recommended-heading"
          className="mt-24 border-t border-gray-100 pt-14"
        >
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <h2 id="recommended-heading" className="text-xl">
              Recommended reading
            </h2>
            <Link
              href="/blog"
              className="text-sm text-gray-500 transition-colors hover:text-ink"
            >
              All posts
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {recommended.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
