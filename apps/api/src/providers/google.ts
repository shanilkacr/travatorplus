import type { LLMProvider, LLMStreamRequest, LLMEvent } from "@travator/shared";

/**
 * Google (Gemini) adapter — STUB. The shape is proven by the Anthropic and
 * OpenAI implementations; this exists so provider selection has a third target.
 *
 * TODO: implement using @google/generative-ai — translate CanonicalMessage[] to
 * `contents`, CanonicalToolDef[] to `functionDeclarations`, stream
 * generateContentStream, and map parts back to LLMEvents (text + functionCall).
 */
export class GoogleProvider implements LLMProvider {
  id = "google";
  capabilities = { toolUse: true, streaming: true };

  // eslint-disable-next-line require-yield
  async *stream(_req: LLMStreamRequest): AsyncIterable<LLMEvent> {
    throw new Error(
      "GoogleProvider is a stub — set LLM_PROVIDER=anthropic|openai, or implement google.ts"
    );
  }
}
