import Link from "next/link";
import { HeroPrompt } from "@/components/HeroPrompt";
import { Reveal } from "@/components/Reveal";

const HOW = [
  {
    n: "01",
    title: "Tell it your trip",
    body: "Dates, vibe, budget, who's coming. Plain language — no forms, no endless tabs.",
  },
  {
    n: "02",
    title: "Watch a plan take shape",
    body: "A day-by-day itinerary grounded in real driving times, with stays and drivers you can swap inline.",
  },
  {
    n: "03",
    title: "Confirm and go",
    body: "Hold rooms and a driver, see one clear quote, confirm. A human is one message away, always.",
  },
];

const SAMPLE_DAYS = [
  { day: "Day 1", region: "Colombo → Sigiriya", note: "Land, drive north, sunset at the hotel pool" },
  { day: "Day 2", region: "Sigiriya", note: "Dawn climb, Dambulla caves, elephant safari at Kaudulla" },
  { day: "Day 3", region: "Sigiriya → Kandy", note: "Spice garden en route, Temple of the Tooth puja" },
  { day: "Day 4", region: "Kandy → Ella", note: "Hill-country train, tea estate, Nine Arch Bridge" },
  { day: "Day 5", region: "Ella → Mirissa", note: "Descend to the coast, quiet swimming bay" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — the product entry point */}
      <section className="container-editorial pt-20 pb-24 md:pt-32 md:pb-32">
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
        <div className="mt-12">
          <HeroPrompt />
        </div>
      </section>

      {/* How it works */}
      <section className="hairline">
        <div className="container-editorial py-24">
          <Reveal>
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="max-w-2xl text-2xl md:text-3xl">
              A concierge that plans out loud, not a booking form.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-px border border-gray-300 bg-gray-300 md:grid-cols-3">
            {HOW.map((step, i) => (
              <Reveal key={step.n} delay={i * 80} className="bg-white">
                <div className="h-full p-8">
                  <span className="font-headline text-2xl text-gray-300">
                    {step.n}
                  </span>
                  <h3 className="mt-6 text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sample itinerary teaser */}
      <section className="hairline bg-gray-50">
        <div className="container-editorial py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-3">A sample plan</p>
              <h2 className="text-2xl md:text-3xl">
                Eight days, coast to hill country and back.
              </h2>
              <p className="mt-4 max-w-md text-sm text-gray-500">
                Every day is grounded in real geography — Colombo to Kandy is 3.5
                hours, Kandy to Ella another four. No impossible drives, no wasted
                mornings.
              </p>
              <Link href="/chat" className="btn mt-8">
                Build your own →
              </Link>
            </Reveal>
            <Reveal delay={80}>
              <ol className="divide-y divide-gray-300 border border-gray-300 bg-white">
                {SAMPLE_DAYS.map((d) => (
                  <li key={d.day} className="flex gap-5 p-5">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Driver-network trust */}
      <section className="hairline">
        <div className="container-editorial py-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <Reveal>
              <p className="eyebrow mb-3">The driver network</p>
              <h2 className="text-2xl md:text-3xl">
                Real drivers who know the roads.
              </h2>
              <p className="mt-4 max-w-md text-sm text-gray-500">
                Sri Lanka is best seen with a private driver-guide. Ours are
                vetted, English-speaking, and rated after every trip — the same
                people who'll meet you at arrivals.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <dl className="grid grid-cols-3 gap-px border border-gray-300 bg-gray-300 text-center">
                {[
                  ["40+", "vetted drivers"],
                  ["4.8", "avg. rating"],
                  ["24/7", "human support"],
                ].map(([stat, label]) => (
                  <div key={label} className="bg-white p-8">
                    <dt className="font-headline text-3xl">{stat}</dt>
                    <dd className="mt-2 text-xs uppercase tracking-widest text-gray-500">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inverted CTA block */}
      <section className="bg-ink text-white">
        <div className="container-editorial py-28 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">
              Your Sri Lanka trip is one message away.
            </h2>
            <Link
              href="/chat"
              className="mt-10 inline-flex items-center justify-center border border-white bg-white px-6 py-3 text-sm tracking-wide text-ink transition-opacity hover:opacity-90"
            >
              Start planning
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
