import type { MDXComponents } from "mdx/types";
import { headingText, slugifyHeading } from "@/lib/slugify";

/** Anchor id derived from the heading's own text, matching getPostHeadings. */
function headingId(children: React.ReactNode) {
  return slugifyHeading(headingText(children));
}

/**
 * Monochrome MDX styling for blog posts. App Router picks this up automatically
 * for all imported .mdx content.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-12 text-3xl md:text-4xl" {...props} />,
    // scroll-mt clears the sticky header when jumping from the contents list.
    h2: ({ children, ...props }) => (
      <h2
        id={headingId(children)}
        className="mt-12 scroll-mt-28 text-2xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={headingId(children)}
        className="mt-8 scroll-mt-28 text-xl"
        {...props}
      >
        {children}
      </h3>
    ),
    p: (props) => (
      <p className="mt-5 text-base leading-relaxed text-gray-500" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-500" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-gray-500" {...props} />
    ),
    li: (props) => <li className="text-base leading-relaxed" {...props} />,
    a: (props) => (
      <a
        className="text-ink underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-ink"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-6 rounded-4xl bg-gray-50/80 py-4 pl-5 pr-4 text-ink shadow-soft"
        {...props}
      />
    ),
    hr: () => <hr className="my-12" />,
    strong: (props) => <strong className="text-ink" {...props} />,
    code: (props) => (
      <code className="bg-gray-100 px-1.5 py-0.5 text-sm text-ink" {...props} />
    ),
    ...components,
  };
}
