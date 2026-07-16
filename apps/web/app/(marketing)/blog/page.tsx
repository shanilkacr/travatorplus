import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Reveal } from "@/components/Reveal";

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
  return (
    <>
      <section className="container-editorial pt-24 pb-12 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-6">Blog</p>
          <h1 className="max-w-3xl text-4xl leading-[1.05] tracking-tightest md:text-5xl">
            Field notes for planning Sri Lanka.
          </h1>
        </Reveal>
      </section>

      <section className="container-editorial pb-24">
        <ul className="border-t border-gray-300">
          {posts.map((post, i) => (
            <li key={post.slug} className="border-b border-gray-300">
              <Reveal delay={i * 40}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 gap-4 py-10 md:grid-cols-12"
                >
                  <div className="text-xs uppercase tracking-widest text-gray-500 md:col-span-3">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <div className="mt-1">{post.readingTime}</div>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl transition-opacity group-hover:opacity-70">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-block text-sm text-ink underline decoration-gray-300 underline-offset-4 group-hover:decoration-ink">
                      Read →
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
