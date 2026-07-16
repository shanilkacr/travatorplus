import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { FadeIn } from "@/components/FadeIn";
import { BlogCardList } from "@/components/BlogCardList";
import { SriLankaImage } from "@/components/SriLankaImage";
import { getBlogImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on planning a Sri Lanka trip — seasons, coasts, driving times, and the small things that make a trip.",
};

function formatDate(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const items = posts.map((post) => ({
    title: post.title,
    description: `${formatDate(post.date)} · ${post.readingTime} — ${post.excerpt}`,
    link: `/blog/${post.slug}`,
    image: (
      <div className="relative h-48 w-full">
        <SriLankaImage
          image={getBlogImage(post.slug)}
          fill
          rounded="3xl"
          className="rounded-b-none rounded-t-4xl"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>
    ),
  }));

  return (
    <>
      <section className="container-editorial pt-24 pb-12 md:pt-32">
        <FadeIn>
          <p className="eyebrow mb-6">Blog</p>
          <h1 className="max-w-3xl text-4xl leading-[1.05] tracking-tightest md:text-5xl">
            Field notes for planning Sri Lanka.
          </h1>
        </FadeIn>
      </section>

      <section className="container-editorial pb-24">
        <FadeIn delay={80}>
          <BlogCardList items={items} />
        </FadeIn>
      </section>
    </>
  );
}
