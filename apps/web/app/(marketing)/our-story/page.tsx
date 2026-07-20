import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassSection } from "@/components/glass/GlassSection";
import { PhotoGrid } from "@/components/PhotoGrid";
import { TezzeractWordmark } from "@/components/TezzeractWordmark";
import { SRI_LANKA_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  alternates: { canonical: "/our-story" },
  title: "Our Story",
  description:
    "Travator is destination management for inbound Sri Lanka — AI planning backed by people who know the island.",
};

const VALUES = [
  {
    title: "Ground truth over guesswork",
    body: "Every itinerary is built on real driving times, seasons, and opening hours. If a drive doesn't fit a day, we don't pretend it does.",
  },
  {
    title: "People behind the machine",
    body: "The AI plans; our ops team and drivers deliver. A human can step into any conversation, any time.",
  },
  {
    title: "One island, done well",
    body: "We only do Sri Lanka. Depth beats breadth — we'd rather know every coast and pass than skim a hundred countries.",
  },
  {
    title: "Honest pricing",
    body: "Prices come from real inventory, shown in full before you confirm. No invented rates, no surprises at the counter.",
  },
];

const SUSTAINABILITY = [
  {
    title: "Spread the load",
    body: "We route travellers to less-visited regions and shoulder seasons — easing pressure on overcrowded sites and giving quieter corners a fair share of tourism.",
  },
  {
    title: "Spend that stays local",
    body: "Our stays and driver-guides are locally owned wherever possible, so the money from your trip lands in Sri Lankan hands, not distant intermediaries.",
  },
  {
    title: "Conservation-first choices",
    body: "Wildlife viewing, heritage visits, and park access are planned with respectful timing and distance — the island's ecosystems come before a good photo.",
  },
  {
    title: "Built for the long run",
    body: "Every itinerary we shape asks what Sri Lanka needs to thrive for the next generation. Sustainable tourism isn't a tagline for us — it's the only way we operate.",
  },
];

const STORY_GRID = [
  { ...SRI_LANKA_IMAGES.teaPicker, className: "md:col-span-2" },
  { ...SRI_LANKA_IMAGES.wildlife, className: "md:col-span-1" },
];

const FOUNDER_QUOTE =
  "As a Sri Lanka–based company, we believe a locally led platform gives travellers the best experience. Most tools guide you tourist-to-tourist. Travator is a hospitable tool from locals to travellers — an AI-fronted knowledge base fully curated by people who understand the beauty of this country. Because when it comes to travelling Sri Lanka, we should know best.";

export default function OurStoryPage() {
  return (
    <>
      <section className="container-editorial pt-24 pb-12 md:pt-32">
        <FadeIn>
          <p className="eyebrow mb-6">Our Story</p>
          <h1 className="max-w-4xl text-4xl leading-[1.05] tracking-tightest md:text-5xl">
            Destination management for inbound Sri Lanka — planned by AI, run by
            people who live here.
          </h1>
        </FadeIn>
      </section>

      <section className="container-editorial pb-8">
        <FadeIn delay={60}>
          <PhotoGrid cards={STORY_GRID} />
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            <p className="eyebrow">Mission</p>
          </FadeIn>
          <div className="space-y-6 text-base text-gray-500 md:col-span-8 md:text-lg">
            <FadeIn delay={80}>
              <p>
                Travator exists to make a Sri Lanka trip feel effortless to plan and
                impossible to get wrong. Inbound travelers used to stitch together a
                dozen browser tabs, a WhatsApp driver, and a hotel booking site that
                knew nothing about the road between them. We put all of it in one
                conversation.
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <p>
                <span className="text-ink">The founding idea was simple.</span> The
                hard part of a Sri Lanka trip was never the booking — it was the
                knowing. Which coast swims in which month. How long the drive from
                Kandy to Ella really takes. Where to be at dawn. That knowledge lived
                in the heads of local guides. We taught it to a system that plans out
                loud, then handed the last mile back to those same guides.
              </p>
            </FadeIn>
            <FadeIn delay={160}>
              <p>
                Travator is a product of{" "}
                <TezzeractWordmark className="h-[0.77em]" /> (Pvt) Ltd — a Sri
                Lanka–based tech company with a product-first, solution-oriented
                vision. We built it for travellers, not tourists: technology that
                makes your trip easier, backed by local knowledge no generic
                platform can match.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <GlassSection muted>
        <div className="container-editorial">
          <FadeIn>
            <figure className="mx-auto max-w-3xl">
              <blockquote className="text-xl leading-relaxed text-ink md:text-2xl">
                &ldquo;{FOUNDER_QUOTE}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src="/images/founder-shanilka.png"
                    alt="Shanilka Rajapaksha"
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="text-sm text-ink">Shanilka Rajapaksha</p>
                  <p className="text-xs text-gray-500">Founder of Travator</p>
                </div>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </GlassSection>

      <GlassSection>
        <div className="container-editorial">
          <FadeIn>
            <p className="eyebrow mb-10">What we value</p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 60}>
                <GlassPanel className="h-full p-8">
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">{v.body}</p>
                </GlassPanel>
              </FadeIn>
            ))}
          </div>
        </div>
      </GlassSection>

      <GlassSection muted>
        <div className="container-editorial">
          <FadeIn>
            <p className="eyebrow mb-4">Sustainability</p>
            <h2 className="max-w-2xl text-3xl md:text-4xl">
              A sustainability-led movement
            </h2>
            <p className="mt-5 max-w-2xl text-base text-gray-500 md:text-lg">
              We are fully focused on building a sustainable tourism brand — saving
              Sri Lanka for the next generation. Here is how every trip we plan
              moves the industry in that direction.
            </p>
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {SUSTAINABILITY.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <GlassPanel className="h-full p-8">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">{item.body}</p>
                </GlassPanel>
              </FadeIn>
            ))}
          </div>
        </div>
      </GlassSection>

      <section className="container-editorial pb-24 pt-8">
        <FadeIn>
          <div className="rounded-[32px] bg-ink px-8 py-14 text-center md:px-16 md:py-20">
            <p className="eyebrow !text-white/50">Founder access</p>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl text-white md:text-4xl">
              Talk to the founder directly
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/70 md:text-base">
              Questions about the product, a partnership, or a trip you are
              planning? Book a slot with Shanilka — no gatekeepers.
            </p>
            <Link href="/book-a-call" className="btn-inverse mt-8">
              Book a call
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
