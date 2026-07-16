import Link from "next/link";
import { MessageSquare, Map, Calendar } from "lucide-react";
import { HeroPrompt } from "@/components/HeroPrompt";
import { FadeIn } from "@/components/FadeIn";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { GlassSection } from "@/components/glass/GlassSection";
import { SriLankaImage } from "@/components/SriLankaImage";
import { PhotoGrid } from "@/components/PhotoGrid";
import { SRI_LANKA_IMAGES, HOME_GRID_IMAGES } from "@/lib/images";

const HOW = [
  {
    n: "01",
    title: "Tell it your trip",
    body: "Dates, vibe, budget, who's coming. Plain language — no forms, no endless tabs.",
    Icon: MessageSquare,
  },
  {
    n: "02",
    title: "Watch a plan take shape",
    body: "A day-by-day itinerary grounded in real driving times, with stays and drivers you can swap inline.",
    Icon: Map,
  },
  {
    n: "03",
    title: "Confirm and go",
    body: "Hold rooms and a driver, see one clear quote, confirm. A human is one message away, always.",
    Icon: Calendar,
  },
];

const SAMPLE_DAYS = [
  { day: "Day 1", region: "Colombo → Sigiriya", note: "Land, drive north, sunset at the hotel pool" },
  { day: "Day 2", region: "Sigiriya", note: "Dawn climb, Dambulla caves, elephant safari at Kaudulla" },
  { day: "Day 3", region: "Sigiriya → Kandy", note: "Spice garden en route, Temple of the Tooth puja" },
  { day: "Day 4", region: "Kandy → Ella", note: "Hill-country train, tea estate, Nine Arch Bridge" },
  { day: "Day 5", region: "Ella → Mirissa", note: "Descend to the coast, quiet swimming bay" },
];

const GRID_CARDS = [
  { ...HOME_GRID_IMAGES[0], className: "md:col-span-2 md:row-span-2" },
  { ...HOME_GRID_IMAGES[1], className: "md:col-span-1" },
  { ...HOME_GRID_IMAGES[2], className: "md:col-span-1" },
  { ...HOME_GRID_IMAGES[3], className: "md:col-span-1 md:row-span-1" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SriLankaImage
            image={SRI_LANKA_IMAGES.hero}
            fill
            priority
            rounded="3xl"
            className="rounded-none"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white/90" />
        </div>

        <div className="container-editorial relative z-10 pt-24 pb-24 md:pt-36 md:pb-32">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-6">Destination management · Sri Lanka</p>
              <h1 className="text-4xl leading-[1.02] tracking-tightest md:text-6xl">
                Plan your Sri Lanka trip
                <br />
                with AI
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base text-gray-500 md:text-lg">
                Describe the trip you want. Travator builds the itinerary, finds the
                stays, and books the driver — in one conversation.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100} className="mt-12">
            <GlassPanel className="mx-auto max-w-2xl bg-white/60">
              <HeroPrompt />
            </GlassPanel>
          </FadeIn>
        </div>
      </section>

      <GlassSection>
        <div className="container-editorial">
          <FadeIn>
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="max-w-2xl text-2xl md:text-3xl">
              A concierge that plans out loud, not a booking form.
            </h2>
          </FadeIn>
          <FadeIn delay={80} className="mt-16">
            <BentoGrid>
              {HOW.map((step, i) => (
                <BentoCard
                  key={step.n}
                  name={step.title}
                  description={step.body}
                  step={step.n}
                  Icon={step.Icon}
                  className={i === 0 ? "md:col-span-2" : "md:col-span-1"}
                />
              ))}
            </BentoGrid>
          </FadeIn>
        </div>
      </GlassSection>

      <GlassSection muted>
        <div className="container-editorial">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn>
              <p className="eyebrow mb-3">A sample plan</p>
              <h2 className="text-2xl md:text-3xl">
                Eight days, coast to hill country and back.
              </h2>
              <p className="mt-4 max-w-md text-sm text-gray-500">
                Every day is grounded in real geography — Colombo to Kandy is 3.5
                hours, Kandy to Ella another four. No impossible drives, no wasted
                mornings.
              </p>
              <Link href="/chat" className="btn mt-8 inline-flex">
                Build your own →
              </Link>
            </FadeIn>
            <FadeIn delay={80}>
              <GlassPanel className="space-y-0 p-0">
                <ol>
                  {SAMPLE_DAYS.map((d, i) => (
                    <li
                      key={d.day}
                      className={`flex gap-5 p-5 ${i > 0 ? "mt-1 rounded-3xl bg-white/30 shadow-soft" : ""}`}
                    >
                      <span className="w-16 shrink-0 text-xs uppercase tracking-widest text-gray-500">
                        {d.day}
                      </span>
                      <div>
                        <p className="text-sm text-ink">{d.region}</p>
                        <p className="mt-1 text-sm text-gray-500">{d.note}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </GlassPanel>
            </FadeIn>
          </div>
          <FadeIn delay={120} className="mt-16">
            <PhotoGrid cards={GRID_CARDS} />
          </FadeIn>
        </div>
      </GlassSection>

      <GlassSection>
        <div className="container-editorial">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <p className="eyebrow mb-3">The driver network</p>
              <h2 className="text-2xl md:text-3xl">
                Real drivers who know the roads.
              </h2>
              <p className="mt-4 max-w-md text-sm text-gray-500">
                Sri Lanka is best seen with a private driver-guide. Ours are
                vetted, English-speaking, and rated after every trip — the same
                people who'll meet you at arrivals.
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["40+", "vetted drivers"],
                  ["4.8", "avg. rating"],
                  ["24/7", "human support"],
                ].map(([stat, label]) => (
                  <GlassPanel key={label} className="p-6 text-center">
                    <dt className="font-headline text-3xl">{stat}</dt>
                    <dd className="mt-2 text-xs uppercase tracking-widest text-gray-500">
                      {label}
                    </dd>
                  </GlassPanel>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </GlassSection>

      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0">
          <SriLankaImage
            image={SRI_LANKA_IMAGES.southCoast}
            fill
            rounded="3xl"
            className="rounded-none"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container-editorial relative z-10 text-center">
          <FadeIn>
            <GlassPanel className="mx-auto max-w-2xl bg-white/20 text-white backdrop-blur-md">
              <h2 className="mx-auto max-w-xl text-3xl md:text-4xl">
                Your Sri Lanka trip is one message away.
              </h2>
              <Link href="/chat" className="btn-primary mt-10 inline-flex">
                Start planning
              </Link>
            </GlassPanel>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
