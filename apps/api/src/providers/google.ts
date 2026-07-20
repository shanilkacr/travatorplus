import { GoogleGenAI, type Content, type Part, type FunctionDeclaration } from "@google/genai";
import type {
  LLMProvider,
  LLMStreamRequest,
  LLMEvent,
  CanonicalMessage,
  ContentBlock,
} from "@travator/shared";
import { env } from "../config/env.js";

/**
 * Google (Gemini) adapter — native tool use + streaming, mirroring the
 * Anthropic/OpenAI adapters. Translates our canonical message/tool format to
 * the Gemini `contents`/`functionDeclarations` shape and back into LLMEvents.
 */
export class GoogleProvider implements LLMProvider {
  id = "google";
  capabilities = { toolUse: true, streaming: true };
  private client: GoogleGenAI;

  constructor() {
    const apiKey = env().GOOGLE_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_API_KEY required for google provider");
    this.client = new GoogleGenAI({ apiKey });
  }

  async *stream(req: LLMStreamRequest): AsyncIterable<LLMEvent> {
    const contents = toGemini(req.messages);
    const functionDeclarations = req.tools.map(toFunctionDeclaration);

    const stream = await this.client.models.generateContentStream({
      model: req.model,
      contents,
      config: {
        systemInstruction: req.system,
        maxOutputTokens: req.maxTokens,
        ...(functionDeclarations.length ? { tools: [{ functionDeclarations }] } : {}),
      },
    });

    let inputTokens = 0;
    let outputTokens = 0;
    // Gemini doesn't stream a call id — synthesize one so downstream code
    // (which keys tool results off it) has something stable per call.
    let callIndex = 0;

    for await (const chunk of stream) {
      const candidate = chunk.candidates?.[0];
      for (const part of candidate?.content?.parts ?? []) {
        if (part.text) {
          yield { type: "text_delta", text: part.text };
        } else if (part.functionCall) {
          yield {
            type: "tool_call",
            id: `${part.functionCall.name}_${callIndex++}`,
            name: part.functionCall.name ?? "unknown_tool",
            args: (part.functionCall.args as Record<string, unknown>) ?? {},
          };
        }
      }
      if (chunk.usageMetadata) {
        inputTokens = chunk.usageMetadata.promptTokenCount ?? inputTokens;
        outputTokens = chunk.usageMetadata.candidatesTokenCount ?? outputTokens;
      }
    }

    yield { type: "end", usage: { inputTokens, outputTokens } };
  }
}

/** JSON Schema (from zod-to-json-schema) -> Gemini's function declaration shape. */
function toFunctionDeclaration(t: {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}): FunctionDeclaration {
  return {
    name: t.name,
    description: t.description,
    // Gemini accepts a JSON-Schema-like object directly; our parameters are
    // already JSON Schema (draft-7) via zodToJsonSchema.
    parameters: t.parameters as FunctionDeclaration["parameters"],
  };
}

/**
 * Canonical -> Gemini `contents`. System messages are hoisted out (Gemini
 * takes system instructions via `config.systemInstruction`, not as a turn),
 * tool results become `functionResponse` parts on a "user" turn (Gemini has
 * no separate tool role), and assistant tool_call blocks round-trip back as
 * `functionCall` parts so multi-turn tool loops stay coherent.
 */
function toGemini(messages: CanonicalMessage[]): Content[] {
  const out: Content[] = [];

  for (const msg of messages) {
    if (msg.role === "system") continue; // handled via systemInstruction

    if (msg.role === "tool") {
      const parts: Part[] = msg.content
        .filter((b): b is Extract<ContentBlock, { type: "tool_result" }> => b.type === "tool_result")
        .map((b) => ({
          functionResponse: {
            name: b.callId,
            response: { result: b.result },
          },
        }));
      if (parts.length) out.push({ role: "user", parts });
      continue;
    }

    const role = msg.role === "assistant" ? "model" : "user";
    const parts: Part[] = [];
    for (const b of msg.content) {
      if (b.type === "text") parts.push({ text: b.text });
      else if (b.type === "tool_call")
        parts.push({ functionCall: { name: b.name, args: b.args } });
    }
    if (parts.length) out.push({ role, parts });
  }

  return out;
}
