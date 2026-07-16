import Anthropic from "@anthropic-ai/sdk";
import type {
  LLMProvider,
  LLMStreamRequest,
  LLMEvent,
  CanonicalMessage,
  ContentBlock,
} from "@travator/shared";
import { env } from "../config/env.js";

/**
 * Anthropic adapter — native tool use + streaming. Translates our canonical
 * message/tool format to the Messages API and back into LLMEvents.
 */
export class AnthropicProvider implements LLMProvider {
  id = "anthropic";
  capabilities = { toolUse: true, streaming: true };
  private client: Anthropic;

  constructor() {
    const apiKey = env().ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY required for anthropic provider");
    this.client = new Anthropic({ apiKey });
  }

  async *stream(req: LLMStreamRequest): AsyncIterable<LLMEvent> {
    const { system, messages } = toAnthropic(req.messages);
    const stream = this.client.messages.stream({
      model: req.model,
      max_tokens: req.maxTokens,
      system: req.system + (system ? `\n\n${system}` : ""),
      messages,
      tools: req.tools.map((t) => ({
        name: t.name,
        description: t.description,
        input_schema: t.parameters as Anthropic.Tool.InputSchema,
      })),
    });

    // Track in-progress tool_use blocks by index to assemble their JSON args.
    const toolBlocks = new Map<number, { id: string; name: string; json: string }>();

    for await (const ev of stream) {
      if (ev.type === "content_block_start" && ev.content_block.type === "tool_use") {
        toolBlocks.set(ev.index, {
          id: ev.content_block.id,
          name: ev.content_block.name,
          json: "",
        });
      } else if (ev.type === "content_block_delta") {
        if (ev.delta.type === "text_delta") {
          yield { type: "text_delta", text: ev.delta.text };
        } else if (ev.delta.type === "input_json_delta") {
          const b = toolBlocks.get(ev.index);
          if (b) b.json += ev.delta.partial_json;
        }
      } else if (ev.type === "content_block_stop") {
        const b = toolBlocks.get(ev.index);
        if (b) {
          let args: Record<string, unknown> = {};
          try {
            args = b.json ? JSON.parse(b.json) : {};
          } catch {
            args = {};
          }
          yield { type: "tool_call", id: b.id, name: b.name, args };
          toolBlocks.delete(ev.index);
        }
      }
    }

    const final = await stream.finalMessage();
    yield {
      type: "end",
      usage: {
        inputTokens: final.usage.input_tokens,
        outputTokens: final.usage.output_tokens,
      },
    };
  }
}

/** Canonical -> Anthropic messages. System blocks are hoisted out. */
function toAnthropic(messages: CanonicalMessage[]): {
  system: string;
  messages: Anthropic.MessageParam[];
} {
  const systemParts: string[] = [];
  const out: Anthropic.MessageParam[] = [];

  for (const msg of messages) {
    if (msg.role === "system") {
      for (const b of msg.content) if (b.type === "text") systemParts.push(b.text);
      continue;
    }
    if (msg.role === "tool") {
      // Tool results become a user message with tool_result blocks.
      out.push({
        role: "user",
        content: msg.content
          .filter((b): b is Extract<ContentBlock, { type: "tool_result" }> => b.type === "tool_result")
          .map((b) => ({
            type: "tool_result" as const,
            tool_use_id: b.callId,
            content: JSON.stringify(b.result),
            is_error: b.isError,
          })),
      });
      continue;
    }
    const role = msg.role === "assistant" ? "assistant" : "user";
    const content: Anthropic.ContentBlockParam[] = [];
    for (const b of msg.content) {
      if (b.type === "text") content.push({ type: "text", text: b.text });
      else if (b.type === "tool_call")
        content.push({ type: "tool_use", id: b.id, name: b.name, input: b.args });
    }
    if (content.length) out.push({ role, content });
  }

  return { system: systemParts.join("\n\n"), messages: out };
}
