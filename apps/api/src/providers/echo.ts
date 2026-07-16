import type {
  LLMProvider,
  LLMStreamRequest,
  LLMEvent,
} from "@travator/shared";

/**
 * Echo provider — deterministic, no API key. Streams a canned reply that echoes
 * the latest user text token-by-token. Used for local testing of the SSE path
 * and the chat UI without calling a real model. Selected via LLM_PROVIDER=echo.
 */
export class EchoProvider implements LLMProvider {
  id = "echo";
  capabilities = { toolUse: false, streaming: true };

  async *stream(req: LLMStreamRequest): AsyncIterable<LLMEvent> {
    const lastUser = [...req.messages]
      .reverse()
      .find((m) => m.role === "user");
    const userText =
      lastUser?.content
        .map((b) => (b.type === "text" ? b.text : ""))
        .join(" ")
        .trim() ?? "";

    const reply = `You said: "${userText}". (echo mode — set LLM_PROVIDER=anthropic and add an API key for the real concierge.)`;

    for (const word of reply.split(/(\s+)/)) {
      yield { type: "text_delta", text: word };
      await sleep(8);
    }
    yield {
      type: "end",
      usage: { inputTokens: userText.length, outputTokens: reply.length },
    };
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
