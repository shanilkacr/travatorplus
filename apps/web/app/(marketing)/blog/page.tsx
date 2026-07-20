import type { Metadata } from "next";
import { getFeaturedAndRest } from "@/lib/blog";
import { FadeIn } from "@/components/FadeIn";
import { BlogFeatured } from "@/components/blog/BlogFeatured";
import { BlogExplorer } from "@/components/blog/BlogExplorer";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog",
  description:
    "Notes on planning a Sri Lanka trip — seasons, coasts, driving times, and the small things that make a trip.",
};

export default function BlogIndexPage() {
  const { featured, rest } = getFeaturedAndRest();

  return (
    <>
      {/* Featured lead */}
      {featured && (
        <section className="container-blog pt-10 md:pt-12">
          <FadeIn>
            <BlogFeatured post={featured} />
          </FadeIn>
        </section>
      )}

      {/* Search, filters, and the grid */}
      <section className="container-blog pb-28 pt-14 md:pt-20">
        <FadeIn delay={80}>
          <BlogExplorer posts={rest} />
        </FadeIn>
      </section>
    </>
  );
}
