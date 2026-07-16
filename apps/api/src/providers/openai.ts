import OpenAI from "openai";
import type {
  LLMProvider,
  LLMStreamRequest,
  LLMEvent,
  CanonicalMessage,
} from "@travator/shared";
import { env } from "../config/env.js";

/**
 * OpenAI adapter — function calling + streaming (Chat Completions). Translates
 * canonical messages/tools to OpenAI's format and back into LLMEvents.
 */
export class OpenAIProvider implements LLMProvider {
  id = "openai";
  capabilities = { toolUse: true, streaming: true };
  private client: OpenAI;

  constructor() {
    const apiKey = env().OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY required for openai provider");
    this.client = new OpenAI({ apiKey });
  }

  async *stream(req: LLMStreamRequest): AsyncIterable<LLMEvent> {
    const messages = toOpenAI(req.system, req.messages);
    const stream = await this.client.chat.completions.create({
      model: req.model,
      max_tokens: req.maxTokens,
      stream: true,
      stream_options: { include_usage: true },
      messages,
      tools: req.tools.map((t) => ({
        type: "function" as const,
        function: {
          name: t.name,
          description: t.description,
          parameters: t.parameters as Record<string, unknown>,
        },
      })),
    });

    // Assemble streamed tool calls by index.
    const calls = new Map<number, { id: string; name: string; args: string }>();
    let usage = { inputTokens: 0, outputTokens: 0 };

    for await (const chunk of stream) {
      const choice = chunk.choices[0];
      if (choice?.delta?.content) {
        yield { type: "text_delta", text: choice.delta.content };
      }
      for (const tc of choice?.delta?.tool_calls ?? []) {
        const idx = tc.index;
        const cur = calls.get(idx) ?? { id: "", name: "", args: "" };
        if (tc.id) cur.id = tc.id;
        if (tc.function?.name) cur.name = tc.function.name;
        if (tc.function?.arguments) cur.args += tc.function.arguments;
        calls.set(idx, cur);
      }
      if (chunk.usage) {
        usage = {
          inputTokens: chunk.usage.prompt_tokens,
          outputTokens: chunk.usage.completion_tokens,
        };
      }
      if (choice?.finish_reason === "tool_calls") {
        for (const [, c] of [...calls.entries()].sort((a, b) => a[0] - b[0])) {
          let args: Record<string, unknown> = {};
          try {
            args = c.args ? JSON.parse(c.args) : {};
          } catch {
            args = {};
          }
          yield { type: "tool_call", id: c.id, name: c.name, args };
        }
        calls.clear();
      }
    }

    yield { type: "end", usage };
  }
}

/** Canonical -> OpenAI chat messages. */
function toOpenAI(
  system: string,
  messages: CanonicalMessage[]
): OpenAI.Chat.ChatCompletionMessageParam[] {
  const out: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: system },
  ];

  for (const msg of messages) {
    if (msg.role === "system") {
      for (const b of msg.content)
        if (b.type === "text") out.push({ role: "system", content: b.text });
      continue;
    }
    if (msg.role === "tool") {
      for (const b of msg.content) {
        if (b.type === "tool_result") {
          out.push({
            role: "tool",
            tool_call_id: b.callId,
            content: JSON.stringify(b.result),
          });
        }
      }
      continue;
    }
    if (msg.role === "assistant") {
      const text = msg.content
        .filter((b) => b.type === "text")
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("");
      const toolCalls = msg.content
        .filter((b) => b.type === "tool_call")
        .map((b) =>
          b.type === "tool_call"
            ? {
                id: b.id,
                type: "function" as const,
                function: { name: b.name, arguments: JSON.stringify(b.args) },
              }
            : null
        )
        .filter((x): x is NonNullable<typeof x> => x !== null);
      out.push({
        role: "assistant",
        content: text || null,
        ...(toolCalls.length ? { tool_calls: toolCalls } : {}),
      });
      continue;
    }
    // user
    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");
    out.push({ role: "user", content: text });
  }

  return out;
}
