import { SITE, absoluteUrl, OG_IMAGE } from "@/lib/site";
import type { PostMeta } from "@/lib/blog-taxonomy";

/**
 * JSON-LD emitters.
 *
 * Structured data is how search engines and — increasingly — assistants
 * establish what an organisation is and does. Everything here is factual and
 * mirrors what's visible on the page; nothing is asserted that a reader
 * couldn't verify.
 */

function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is built from our own constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Who we are. Emitted once, site-wide. */
export function OrganizationLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "TravelAgency"],
        "@id": absoluteUrl("/#organization"),
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: absoluteUrl("/brand/travator-logo.png"),
        image: OG_IMAGE,
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        areaServed: [
          { "@type": "Country", name: "Sri Lanka" },
          ...SITE.markets.map((m) => ({ "@type": "Country", name: m })),
        ],
        knowsLanguage: ["en", "si", "ta"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE.phone,
            contactType: "customer service",
            areaServed: "LK",
            availableLanguage: ["English", "Sinhala", "Tamil"],
          },
        ],
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sri Lanka trip planning and booking",
            description: SITE.shortDescription,
            serviceType: "Destination management",
            areaServed: { "@type": "Country", name: "Sri Lanka" },
          },
        },
      }}
    />
  );
}

/** Site-level search action, so results can surface an internal search box. */
export function WebSiteLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: SITE.url,
        name: SITE.name,
        description: SITE.shortDescription,
        publisher: { "@id": absoluteUrl("/#organization") },
        inLanguage: "en",
      }}
    />
  );
}

export function ArticleLd({ post }: { post: PostMeta }) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        articleSection: post.category,
        author: { "@type": "Person", name: post.author },
        publisher: { "@id": absoluteUrl("/#organization") },
        mainEntityOfPage: url,
        url,
        image: OG_IMAGE,
        inLanguage: "en",
        about: {
          "@type": "Place",
          name: "Sri Lanka",
        },
      }}
    />
  );
}

export function BreadcrumbLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function FaqLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}
