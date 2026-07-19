import type { Metadata } from "next";
import { ChatWorkspace } from "@/components/chat/ChatWorkspace";

export const metadata: Metadata = {
  title: "Planner",
  description:
    "Plan and book your Sri Lanka trip in conversation, with a live itinerary and running cost beside you.",
};

export default function ChatPage({
  searchParams,
}: {
  searchParams: { prompt?: string };
}) {
  return <ChatWorkspace initialPrompt={searchParams.prompt ?? ""} />;
}
