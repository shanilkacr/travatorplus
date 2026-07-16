import type { LLMProvider } from "@travator/shared";
import { env } from "../config/env.js";
import { AnthropicProvider } from "./anthropic.js";
import { OpenAIProvider } from "./openai.js";
import { GoogleProvider } from "./google.js";
import { EchoProvider } from "./echo.js";

/**
 * Provider registry + selection. Providers are constructed lazily and cached.
 * Capability guards run at construction so a missing key/capability fails at
 * startup or first selection — never mid-conversation.
 */
export type ProviderId = "anthropic" | "openai" | "google" | "echo";

const cache = new Map<string, LLMProvider>();

function construct(id: ProviderId): LLMProvider {
  switch (id) {
    case "anthropic":
      return new AnthropicProvider();
    case "openai":
      return new OpenAIProvider();
    case "google":
      return new GoogleProvider();
    case "echo":
      return new EchoProvider();
    default:
      throw new Error(`Unknown LLM provider: ${id}`);
  }
}

export function getProvider(id: string): LLMProvider {
  const cached = cache.get(id);
  if (cached) return cached;
  const provider = construct(id as ProviderId);
  cache.set(id, provider);
  return provider;
}

export interface ResolvedModel {
  provider: LLMProvider;
  model: string;
}

/** Resolve the effective provider+model, honoring per-conversation overrides. */
export function resolveModel(overrides?: {
  provider?: string | null;
  model?: string | null;
}): ResolvedModel {
  const providerId = overrides?.provider || env().LLM_PROVIDER;
  const model = overrides?.model || env().LLM_MODEL;
  return { provider: getProvider(providerId), model };
}

/** Resolve the cheaper task model (extraction/parsing). */
export function resolveTaskModel(): ResolvedModel {
  return {
    provider: getProvider(env().TASK_LLM_PROVIDER),
    model: env().TASK_LLM_MODEL,
  };
}

/**
 * Startup capability check: ensure the configured default provider constructs
 * and advertises streaming. Fails loudly rather than mid-turn.
 */
export function assertProvidersHealthy(): void {
  const { provider } = resolveModel();
  if (!provider.capabilities.streaming) {
    throw new Error(`Provider ${provider.id} lacks required capability: streaming`);
  }
  console.log(
    `✓ LLM provider ready: ${provider.id} (model ${env().LLM_MODEL}, toolUse=${provider.capabilities.toolUse})`
  );
}
