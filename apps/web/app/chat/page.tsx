import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { FadeIn } from "@/components/FadeIn";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { SriLankaImage } from "@/components/SriLankaImage";
import { SRI_LANKA_IMAGES } from "@/lib/images";

export default function ChatPage({
  searchParams,
}: {
  searchParams: { prompt?: string };
}) {
  const prompt = searchParams.prompt ?? "";

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute inset-0">
        <SriLankaImage
          image={SRI_LANKA_IMAGES.lagoon}
          fill
          rounded="3xl"
          className="rounded-none opacity-30"
          sizes="100vw"
        />
        <div aria-hidden className="dot-pattern absolute inset-0 opacity-50" />
      </div>

      <header className="glass-nav relative z-20 flex h-16 items-center justify-between px-6">
        <Wordmark />
        <Link href="/" className="text-sm text-gray-500 hover:text-ink">
          ← Back to site
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-32">
        <FadeIn className="w-full max-w-xl text-center">
          <p className="eyebrow">Chat</p>
          <h1 className="mt-4 text-3xl">The planner is being wired up.</h1>
          <p className="mt-4 text-sm text-gray-500">
            The conversational booking experience lands in milestone 4. The hero
            hand-off already works — your message came through:
          </p>
          {prompt ? (
            <GlassPanel className="mt-6 text-left">
              <p className="eyebrow mb-2">Your trip</p>
              <p className="text-base text-ink">{prompt}</p>
            </GlassPanel>
          ) : (
            <p className="mt-6 text-sm text-gray-500">
              (No message passed — start from the{" "}
              <Link href="/" className="text-ink underline decoration-gray-300 underline-offset-4 hover:decoration-ink">
                home page
              </Link>
              .)
            </p>
          )}
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Back to planning
          </Link>
        </FadeIn>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 md:p-6">
        <GlassPanel className="mx-auto flex max-w-2xl items-end gap-3 rounded-[1.25rem] bg-white/70 p-5">
          <textarea
            disabled
            rows={2}
            placeholder="Reply to your planner… (coming soon)"
            className="input flex-1 resize-none opacity-60"
          />
          <button type="button" disabled className="btn shrink-0 opacity-50">
            Send
          </button>
        </GlassPanel>
      </div>
    </div>
  );
}
