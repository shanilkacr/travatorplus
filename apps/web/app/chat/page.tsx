import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

/**
 * /chat — the app shell. Placeholder for now: the full Claude-style chat UI
 * (sidebar, streaming thread, in-chat components, composer) is built in
 * milestone 4 against the reference screenshots. This confirms the hero → chat
 * hand-off (the pre-sent prompt arrives as ?prompt=…).
 */
export default function ChatPage({
  searchParams,
}: {
  searchParams: { prompt?: string };
}) {
  const prompt = searchParams.prompt ?? "";
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b border-gray-300 px-6">
        <Wordmark />
        <Link href="/" className="text-sm text-gray-500 hover:text-ink">
          ← Back to site
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          <p className="eyebrow">Chat</p>
          <h1 className="mt-4 text-3xl">The planner is being wired up.</h1>
          <p className="mt-4 text-sm text-gray-500">
            The conversational booking experience lands in milestone 4. The hero
            hand-off already works — your message came through:
          </p>
          {prompt ? (
            <div className="mt-6 border border-ink p-5 text-left">
              <p className="eyebrow mb-2">Your trip</p>
              <p className="text-base text-ink">{prompt}</p>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">
              (No message passed — start from the{" "}
              <Link href="/" className="underline decoration-ink underline-offset-4">
                home page
              </Link>
              .)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
