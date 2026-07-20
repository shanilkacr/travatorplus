import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Map,
  CalendarCheck,
  Clock,
  ShieldCheck,
  Sun,
  Users,
  BadgeDollarSign,
  Star,
  Check,
} from "lucide-react";
import { HeroPrompt } from "@/components/HeroPrompt";
import { FadeIn } from "@/components/FadeIn";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { SamplePlansMarquee } from "@/components/SamplePlansMarquee";
import { SriLankaImage } from "@/components/SriLankaImage";
import { SAMPLE_PLANS } from "@/lib/sample-plans";
import { SRI_LANKA_IMAGES } from "@/lib/images";
import { FaqLd } from "@/components/StructuredData";

/* ── Content (all original Travator copy) ─────────────────── */

const STEPS = [
  {
    n: "01",
    Icon: MessageSquare,
    title: "Tell us your trip",
    body: "Dates, vibe, budget, who's coming. Plain language — no forms, no twenty open tabs.",
  },
  {
    n: "02",
    Icon: Map,
    title: "Watch the plan take shape",
    body: "A day-by-day itinerary grounded in real driving times, with stays and drivers you can swap inline.",
  },
  {
    n: "03",
    Icon: CalendarCheck,
    title: "Confirm and go",
    body: "Hold rooms and a driver, see one clear quote, confirm. A human is one message away, always.",
  },
];

const FEATURES = [
  {
    title: "Itineraries that respect the road",
    body: "Colombo to Kandy is 3.5 hours; Kandy to Ella is four more. Every day is built on real distances — no impossible drives, no wasted mornings.",
    image: SRI_LANKA_IMAGES.ellaTrain,
  },
  {
    title: "Real inventory, honest prices",
    body: "Every rate comes from live availability — never invented, never padded. What you see in the quote is what you pay.",
    image: SRI_LANKA_IMAGES.kandy,
  },
  {
    title: "A vetted driver network",
    body: "Sri Lanka is best seen with a private driver-guide. Ours are rated after every trip — the same people who meet you at arrivals.",
    image: SRI_LANKA_IMAGES.teaPicker,
  },
  {
    title: "Humans on call, always",
    body: "The AI plans; our ops team delivers. Any conversation can be taken over by a real person — mid-trip, midnight, whenever.",
    image: SRI_LANKA_IMAGES.southCoast,
  },
];

const STAYS = [
  {
    name: "Water Garden Sigiriya",
    region: "Sigiriya",
    rating: 4.7,
    price: 180,
    tags: ["Villas", "Quiet", "Pool"],
    image: SRI_LANKA_IMAGES.hero,
  },
  {
    name: "98 Acres Resort & Spa",
    region: "Ella",
    rating: 4.6,
    price: 155,
    tags: ["Tea estate", "Views", "Hiking"],
    image: SRI_LANKA_IMAGES.ellaTrain,
  },
  {
    name: "The Kandy House",
    region: "Kandy",
    rating: 4.7,
    price: 190,
    tags: ["Heritage", "Colonial", "Serene"],
    image: SRI_LANKA_IMAGES.kandy,
  },
  {
    name: "Cape Weligama",
    region: "South Coast",
    rating: 4.7,
    price: 320,
    tags: ["Clifftop", "Ocean", "Whales"],
    image: SRI_LANKA_IMAGES.southCoast,
  },
  {
    name: "Fort Bazaar",
    region: "Galle Fort",
    rating: 4.6,
    price: 165,
    tags: ["Boutique", "Courtyard", "Foodie"],
    image: SRI_LANKA_IMAGES.galle,
  },
  {
    name: "Mirissa Beach Villa",
    region: "Mirissa",
    rating: 4.1,
    price: 60,
    tags: ["Beachfront", "Surf", "Relaxed"],
    image: SRI_LANKA_IMAGES.stiltFishermen,
  },
];

const WHY = [
  {
    Icon: BadgeDollarSign,
    title: "No invented prices",
    body: "Every number comes from real inventory — the AI can't make rates up.",
  },
  {
    Icon: Clock,
    title: "Real driving times",
    body: "Plans are built on how long roads actually take, not map optimism.",
  },
  {
    Icon: MessageSquare,
    title: "One conversation",
    body: "Itinerary, hotels, driver, and booking — all in a single chat thread.",
  },
  {
    Icon: Sun,
    title: "Season-smart",
    body: "We steer you to the coast that's actually swimmable for your dates.",
  },
  {
    Icon: Users,
    title: "Humans on standby",
    body: "Ops agents can take over any chat — before you book or mid-trip.",
  },
  {
    Icon: ShieldCheck,
    title: "Book when ready",
    body: "Nothing is charged until you explicitly confirm a clear, final quote.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "It planned our whole two weeks in one evening — and when our flight was delayed, a real person rerouted the driver before we even landed.",
    name: "Hannah & Tom",
    detail: "UK · 14 days, island loop",
  },
  {
    quote:
      "I typed 'quiet beaches, no crowds, September' and it sent us east instead of south. Locals-only bays. It knew the monsoon better than our guidebook.",
    name: "Priya S.",
    detail: "Singapore · 9 days, east coast",
  },
  {
    quote:
      "The driver it matched us with felt like family by day three. The plan was good; Nuwan made it unforgettable.",
    name: "Marco & Elena",
    detail: "Italy · honeymoon, south coast",
  },
  {
    quote:
      "No forms, no back-and-forth emails with an agency. I changed hotels twice in chat and the quote just updated. That's how booking should work.",
    name: "David K.",
    detail: "Australia · 7 days, first visit",
  },
];

const FAQS = [
  {
    q: "How does Travator actually work?",
    a: "You describe your trip in plain language. The AI builds a day-by-day itinerary grounded in real driving times and seasons, shows you real hotels and drivers with live prices, and holds everything while you decide. Nothing is booked until you explicitly confirm the final quote.",
  },
  {
    q: "Are the prices real?",
    a: "Yes — every rate comes from our inventory database, never from the AI's imagination. The quote you confirm is the price you pay, shown in both USD and LKR.",
  },
  {
    q: "Can I talk to a real person?",
    a: "Any time. Type that you'd like to speak to someone and a human ops agent takes over the same conversation — no new ticket, no starting over. We're also on call throughout your trip.",
  },
  {
    q: "When is the best time to visit Sri Lanka?",
    a: "Somewhere on the island is always in season. December to April favors the south and west coasts plus the hill country; May to September is the east coast's turn. Tell us your dates and we'll route you to the right side.",
  },
  {
    q: "Do I need a driver?",
    a: "Most travelers hire a private driver-guide — roads are winding, signage is sparse, and a good driver doubles as a local fixer. Ours are vetted, English-speaking, and rated after every trip. Day rates include the vehicle and fuel.",
  },
  {
    q: "What does planning cost?",
    a: "Planning is free — chat as long as you like, revise as much as you want. You only pay when you confirm a booking.",
  },
  {
    q: "Can I change my plan after booking?",
    a: "Yes. Message the same conversation and we'll rework the itinerary. Cancellation terms for each hotel are shown clearly before you confirm.",
  },
];

/* ── Page ─────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <FaqLd items={FAQS} />
      {/* Hero — inset card with a 10px margin on all four sides.
          The header block is its 20px top pad plus the 3.5rem nav (note rem is
          14px here, so that's 49px, not 56px). Pulling the section up by
          exactly that puts the card's top edge at 10px and leaves a matching
          10px gap between the card edge and the nav. The card is 100svh − 20px
          tall, so it sits centred with 10px above and below. */}
      <section className="-mt-[calc(20px+3.5rem)] p-[10px]">
        <div className="relative flex min-h-[calc(100svh-20px)] flex-col justify-center overflow-hidden rounded-[24px] md:rounded-[32px]">
          <Image
            src="/images/hero-sunset.jpg"
            alt="Sunset over a rocky Sri Lankan beach with leaning coconut palms"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45"
          />
          {/* Symmetric padding so justify-center leaves the content optically
              centred in the card; the nav floats over the top 76px. */}
          <div className="container-editorial relative z-10 py-20 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-[12px] bg-white/20 px-4 py-2 text-xs text-white backdrop-blur-md">
              <Sun className="h-3.5 w-3.5" aria-hidden />
              AI travel concierge · Sri Lanka
            </span>
            <h1 className="mx-auto mt-6 text-4xl leading-[1.04] tracking-tightest text-white md:text-6xl">
              Your Sri Lanka trip, planned in one conversation
            </h1>
          </FadeIn>
          <FadeIn delay={120} className="mx-auto mt-9 max-w-2xl">
            <HeroPrompt />
          </FadeIn>
          <FadeIn delay={200}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-white" aria-hidden /> 4.8 average
                trip rating
              </span>
              <span className="hidden h-1 w-1 rounded-[12px] bg-white/50 sm:block" aria-hidden />
              <a
                href="tel:+94776576488"
                className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Humans on call 24/7
              </a>
            </div>
          </FadeIn>
          </div>
        </div>
      </section>

      {/* Lead paragraph — display-scale, revealed word by word on scroll.
          Stays a <p> so it reads as the page's lead copy. */}
      <section className="container-wide py-24 md:py-36">
        <ScrollRevealText
          text="Describe the trip you want. Travator builds the itinerary, finds the stays, and books the driver — while you watch it happen."
          className="mx-auto max-w-6xl text-center text-3xl leading-[1.25] tracking-tightest text-ink md:text-5xl"
        />
      </section>

      {/* How it works — full-width split with background image */}
      <section className="px-[10px] py-20 md:py-28">
        <div className="relative overflow-hidden rounded-[32px]">
          <Image
            src="/images/how-it-works-sigiriya.jpg"
            alt="Aerial view of Sigiriya rock fortress rising from surrounding jungle"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.38)_28%,rgba(0,0,0,0.12)_58%,rgba(0,0,0,0.06)_100%)]"
          />
          <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-[30%_40%_30%] md:gap-0 md:p-12 lg:p-16">
            <FadeIn>
              <h2 className="text-3xl text-white md:text-4xl">
                From
                <br />
                &ldquo;we should go&rdquo;
                <br />
                to booked in
                <br />
                three steps
              </h2>
            </FadeIn>
            <div aria-hidden className="hidden md:block" />
            <div className="flex flex-col gap-8 md:gap-10">
              {STEPS.map((s, i) => (
                <FadeIn key={s.n} delay={i * 80}>
                  <div className="flex items-start gap-4 md:gap-5">
                    <span className="font-headline shrink-0 text-2xl text-white/60">
                      {s.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="flex items-center gap-2.5 text-lg text-white md:text-xl">
                        <span>{s.title}</span>
                        <s.Icon className="h-5 w-5 shrink-0 text-white" aria-hidden />
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/80">{s.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample plans rail */}
      <section id="plans" className="bg-gray-50/60 py-20 md:py-28">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">Sample plans</p>
            <h2 className="text-3xl md:text-4xl">
              See what a great week here looks like
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
              Start from a proven shape, then make it yours — every plan is
              editable in chat.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={100}>
          <SamplePlansMarquee plans={SAMPLE_PLANS} />
        </FadeIn>
      </section>

      {/* Core features 2×2 */}
      <section className="bg-gray-50/60 py-20 md:py-28">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">Why it works</p>
            <h2 className="text-3xl md:text-4xl">
              Everything a good trip needs, nothing it doesn't
            </h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 60}>
                <div className="group h-full overflow-hidden rounded-[24px] bg-white shadow-glass">
                  <div className="relative h-52 overflow-hidden">
                    <SriLankaImage
                      image={f.image}
                      fill
                      rounded="none"
                      className="rounded-none transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl">{f.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{f.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stays rail */}
      <section id="stays" className="py-20 md:py-28">
        <div className="container-wide">
          <FadeIn className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">Stays</p>
              <h2 className="max-w-lg text-3xl md:text-4xl">
                Hand-picked stays across the island
              </h2>
            </div>
            <Link href="/chat" className="btn">
              Find my stay
            </Link>
          </FadeIn>
        </div>
        <FadeIn delay={100}>
          <div className="rail mt-12 px-[10px]">
            {STAYS.map((stay) => (
              <Link
                key={stay.name}
                href={`/chat?prompt=${encodeURIComponent(`Tell me about ${stay.name} in ${stay.region}`)}`}
                className="group w-[280px] shrink-0 overflow-hidden rounded-[24px] bg-white shadow-glass transition-shadow hover:shadow-glass-lg md:w-[320px]"
              >
                <div className="relative h-44 overflow-hidden">
                  <SriLankaImage
                    image={stay.image}
                    fill
                    rounded="none"
                    className="rounded-none transition-transform duration-500 group-hover:scale-105"
                    sizes="320px"
                  />
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-[12px] bg-white/85 px-2.5 py-1 text-xs text-ink backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" aria-hidden />
                    {stay.rating.toFixed(1)}
                  </span>
                </div>
                <div className="p-5">
                  <p className="eyebrow !text-[0.65rem]">{stay.region}</p>
                  <h3 className="mt-1 text-lg">{stay.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stay.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-[12px] bg-gray-50 px-2.5 py-1 text-xs text-gray-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-4">
                    <span className="text-base text-ink">
                      ${stay.price}
                      <span className="text-xs text-gray-500"> / night</span>
                    </span>
                    <span className="text-xs text-gray-500 transition-colors group-hover:text-ink">
                      Ask about it →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Why choose us — 6 grid */}
      <section className="container-wide py-20 md:py-28">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">The Travator difference</p>
          <h2 className="text-3xl md:text-4xl">Less stress. Better trip.</h2>
        </FadeIn>
        {/* Six short cards: three roomy columns through desktop, six across
            only once the viewport is genuinely wide enough to carry them. */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6">
          {WHY.map((w, i) => (
            <FadeIn key={w.title} delay={i * 50}>
              <div className="h-full rounded-[24px] bg-white p-7 shadow-soft transition-shadow hover:shadow-glass">
                <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gray-50">
                  <w.Icon className="h-5 w-5 text-ink" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{w.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Split 1 — text left, image right */}
      <section className="container-wide py-10 md:py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Prose keeps its own measure — the section is full bleed, the
              reading column is not. */}
          <FadeIn className="mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
            <p className="eyebrow mb-4">Ground truth</p>
            <h2 className="text-3xl md:text-4xl">
              Plans grounded in real roads, not map optimism
            </h2>
            <ul className="mt-7 space-y-4">
              {[
                "Driving times from people who drive them — Colombo→Kandy is 3.5h, and the plan knows it",
                "Season-aware: south-west coast Dec–Apr, east coast May–Sep",
                "Dawn-first scheduling for Sigiriya climbs and safari mornings",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-gray-500">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[12px] bg-ink">
                    <Check className="h-3 w-3 text-white" aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/chat" className="btn-primary mt-8">
              Start planning
            </Link>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative h-[380px] overflow-hidden rounded-[32px] shadow-glass-lg md:h-[520px]">
              <SriLankaImage
                image={SRI_LANKA_IMAGES.ellaTrain}
                fill
                rounded="none"
                className="rounded-none"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Split 2 — image left, text right */}
      <section className="container-wide py-10 md:py-16">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn className="md:order-1">
            <div className="relative h-[380px] overflow-hidden rounded-[32px] shadow-glass-lg md:h-[520px]">
              <SriLankaImage
                image={SRI_LANKA_IMAGES.wildlife}
                fill
                rounded="none"
                className="rounded-none"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn
            delay={100}
            className="mx-auto w-full max-w-xl md:order-2 lg:mx-0 lg:mr-auto"
          >
            <p className="eyebrow mb-4">People behind the machine</p>
            <h2 className="text-3xl md:text-4xl">
              A real human is one message away
            </h2>
            <ul className="mt-7 space-y-4">
              {[
                "Say 'I want to talk to a person' and an ops agent joins the same chat",
                "Vetted driver-guides who double as local fixers on the ground",
                "On call throughout your trip — delays, changes, emergencies",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-gray-500">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[12px] bg-ink">
                    <Check className="h-3 w-3 text-white" aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/our-story" className="btn mt-8">
              Our story
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50/60 py-20 md:py-28">
        <div className="container-wide">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">Travelers</p>
            <h2 className="text-3xl md:text-4xl">They went. You're next.</h2>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 60}>
                <figure className="h-full rounded-[24px] bg-white p-8 shadow-glass">
                  <div
                    className="flex gap-0.5 text-ink"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-ink">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gray-100 text-sm text-ink">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm text-ink">{t.name}</span>
                      <span className="block text-xs text-gray-500">{t.detail}</span>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-wide py-20 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <FadeIn className="md:col-span-4 xl:col-span-3">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl">Questions, answered</h2>
            <p className="mt-4 text-sm text-gray-500">
              Anything else? Ask in the chat — that's rather the point.
            </p>
            <Link href="/book-a-call" className="btn mt-6">
              Book a call
            </Link>
          </FadeIn>
          <FadeIn delay={100} className="md:col-span-8 xl:col-span-9">
            <FaqAccordion items={FAQS} />
          </FadeIn>
        </div>
      </section>

      {/* CTA banner */}
      <section className="container-wide pb-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[40px] shadow-glass-lg">
            <Image
              src="/images/hero-sunset.jpg"
              alt=""
              aria-hidden
              fill
              className="object-cover object-[50%_65%]"
              sizes="(max-width:1152px) 100vw, 1152px"
            />
            <div aria-hidden className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 px-6 py-20 text-center md:py-28">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-5xl">
                Ready to see the island?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-white/85">
                Your Sri Lanka trip is one message away. Planning is free —
                start the conversation.
              </p>
              <Link href="/chat" className="btn-inverse mt-9">
                Get started
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
