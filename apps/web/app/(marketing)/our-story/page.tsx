import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

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

export default function OurStoryPage() {
  return (
    <>
      <section className="container-editorial pt-24 pb-16 md:pt-32">
        <Reveal>
          <p className="eyebrow mb-6">Our Story</p>
          <h1 className="max-w-4xl text-4xl leading-[1.05] tracking-tightest md:text-5xl">
            Destination management for inbound Sri Lanka — planned by AI, run by
            people who live here.
          </h1>
        </Reveal>
      </section>

      <section className="container-editorial pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Mission</p>
          </Reveal>
          <div className="space-y-6 text-base text-gray-500 md:col-span-8 md:text-lg">
            <p>
              Travator exists to make a Sri Lanka trip feel effortless to plan and
              impossible to get wrong. Inbound travelers used to stitch together a
              dozen browser tabs, a WhatsApp driver, and a hotel booking site that
              knew nothing about the road between them. We put all of it in one
              conversation.
            </p>
            <p>
              <span className="text-ink">The founding idea was simple.</span> The
              hard part of a Sri Lanka trip was never the booking — it was the
              knowing. Which coast swims in which month. How long the drive from
              Kandy to Ella really takes. Where to be at dawn. That knowledge lived
              in the heads of local guides. We taught it to a system that plans out
              loud, then handed the last mile back to those same guides.
            </p>
            <p>
              This page is placeholder copy for the MVP — the real founding story,
              team, and photography drop in here.
            </p>
          </div>
        </div>
      </section>

      <section className="hairline mt-16">
        <div className="container-editorial py-20">
          <Reveal>
            <p className="eyebrow mb-10">What we value</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-px border border-gray-300 bg-gray-300 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="bg-white">
                <div className="h-full p-8">
                  <h3 className="text-xl">{v.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline">
        <div className="container-editorial py-20">
          <Reveal>
            <p className="eyebrow mb-10">The team</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {TEAM.map((role, i) => (
              <Reveal key={role} delay={i * 60}>
                <div>
                  <div className="aspect-square w-full border border-gray-300 bg-gray-100" />
                  <p className="mt-3 text-sm text-ink">Name Surname</p>
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    {role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
