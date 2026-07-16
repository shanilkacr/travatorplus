import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassSection } from "@/components/glass/GlassSection";
import { SriLankaImage } from "@/components/SriLankaImage";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SRI_LANKA_IMAGES, TEAM_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
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

const TEAM = ["Founder & guide", "Head of ops", "Lead driver-guide", "Engineering"];

const STORY_GRID = [
  { ...SRI_LANKA_IMAGES.teaPicker, className: "md:col-span-2" },
  { ...SRI_LANKA_IMAGES.wildlife, className: "md:col-span-1" },
];

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
                We're building the product in the open — real founding photography
                and team stories land here as we grow.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <GlassSection muted>
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

      <GlassSection>
        <div className="container-editorial">
          <FadeIn>
            <p className="eyebrow mb-10">The team</p>
          </FadeIn>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {TEAM.map((role, i) => (
              <FadeIn key={role} delay={i * 60}>
                <div>
                  <div className="relative aspect-square w-full overflow-hidden rounded-4xl shadow-glass">
                    <SriLankaImage
                      image={TEAM_IMAGES[i] ?? SRI_LANKA_IMAGES.colombo}
                      fill
                      rounded="3xl"
                      sizes="(max-width:768px) 50vw, 25vw"
                    />
                  </div>
                  <p className="mt-3 text-sm text-ink">Name Surname</p>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    {role}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </GlassSection>
    </>
  );
}
