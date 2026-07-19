import type { Metadata } from "next";
import { CalEmbed } from "@/components/CalEmbed";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { GlassPanel } from "@/components/glass/GlassPanel";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Talk to Shanilka, founder of Travator. Book a call or send us what you're planning and we'll be in touch.",
};

export default function BookACallPage() {
  return (
    <>
      <section className="container-editorial pt-24 pb-12 md:pt-32">
        <FadeIn>
          <p className="eyebrow mb-6">Book a call</p>
          <h1 className="max-w-3xl text-4xl leading-[1.05] tracking-tightest md:text-5xl">
            Rather talk it through? Let's find a time.
          </h1>
          <p className="mt-6 max-w-xl text-base text-gray-500 md:text-lg">
            Prefer a human first? Book a call with the founder, or send a note
            and we'll reach out. Or just{" "}
            <a href="/chat" className="text-ink underline decoration-gray-300 underline-offset-4 hover:decoration-ink">
              start in the chat
            </a>{" "}
            — it's the fastest way.
          </p>
        </FadeIn>
      </section>

      <section className="container-editorial pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <FadeIn>
            <GlassPanel>
              <p className="eyebrow mb-6">Pick a slot</p>
              <CalEmbed />
            </GlassPanel>
          </FadeIn>
          <FadeIn delay={80}>
            <GlassPanel>
              <p className="eyebrow mb-6">Or send a note</p>
              <ContactForm />
            </GlassPanel>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
