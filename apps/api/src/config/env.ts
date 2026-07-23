import { AsyncLocalStorage } from "node:async_hooks";
import { z } from "zod";
import type { WorkerBindings } from "../types/bindings.js";

/** Validated environment. Fails loudly when parsed if misconfigured. */
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  LLM_PROVIDER: z.enum(["anthropic", "openai", "google", "echo"]).default("anthropic"),
  LLM_MODEL: z.string().default("claude-sonnet-5"),
  TASK_LLM_PROVIDER: z.enum(["anthropic", "openai", "google", "echo"]).default("anthropic"),
  TASK_LLM_MODEL: z.string().default("claude-haiku-4-5-20251001"),

  ANTHROPIC_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),

  EMBEDDINGS_PROVIDER: z.enum(["mock", "voyage", "openai"]).default("mock"),
  EMBEDDINGS_MODEL: z.string().default("voyage-3"),
  VOYAGE_API_KEY: z.string().optional(),
  EMBEDDINGS_DIM: z.coerce.number().int().positive().default(1024),

  DATABASE_URL: z
    .string()
    .default("postgres://travator:travator@localhost:5432/travator"),
  REDIS_URL: z.string().default("redis://localhost:6379"),

  JWT_SECRET: z.string().min(16).default("dev-only-change-me-please-32-chars-min"),
  JWT_ISSUER: z.string().default("travator"),
  OTP_TTL_SECONDS: z.coerce.number().int().positive().default(600),

  API_PORT: z.coerce.number().int().positive().default(8787),
  API_PUBLIC_URL: z.string().default("http://localhost:8787"),
  WEB_ORIGIN: z.string().default("http://localhost:3000"),

  USD_TO_LKR: z.coerce.number().positive().default(305),
});

export type Env = z.infer<typeof EnvSchema>;

const requestEnv = new AsyncLocalStorage<Env>();
let processEnvCache: Env | null = null;

export function parseEnv(source: Record<string, unknown>): Env {
  const parsed = EnvSchema.safeParse(source);
  if (!parsed.success) {
    console.error("✗ Invalid environment:\n", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration");
  }
  return parsed.data;
}

/** Map Cloudflare Worker bindings into the shared env schema. */
export function parseEnvFromBindings(bindings: WorkerBindings): Env {
  return parseEnv({
    NODE_ENV: bindings.NODE_ENV,
    LLM_PROVIDER: bindings.LLM_PROVIDER,
    LLM_MODEL: bindings.LLM_MODEL,
    TASK_LLM_PROVIDER: bindings.TASK_LLM_PROVIDER,
    TASK_LLM_MODEL: bindings.TASK_LLM_MODEL,
    ANTHROPIC_API_KEY: bindings.ANTHROPIC_API_KEY,
    OPENAI_API_KEY: bindings.OPENAI_API_KEY,
    GOOGLE_API_KEY: bindings.GOOGLE_API_KEY,
    EMBEDDINGS_PROVIDER: bindings.EMBEDDINGS_PROVIDER,
    EMBEDDINGS_MODEL: bindings.EMBEDDINGS_MODEL,
    VOYAGE_API_KEY: bindings.VOYAGE_API_KEY,
    EMBEDDINGS_DIM: bindings.EMBEDDINGS_DIM,
    DATABASE_URL: bindings.DATABASE_URL,
    JWT_SECRET: bindings.JWT_SECRET,
    JWT_ISSUER: bindings.JWT_ISSUER,
    OTP_TTL_SECONDS: bindings.OTP_TTL_SECONDS,
    WEB_ORIGIN: bindings.WEB_ORIGIN,
    API_PUBLIC_URL: bindings.API_PUBLIC_URL,
    USD_TO_LKR: bindings.USD_TO_LKR,
  });
}

/** Load and cache env from process.env (Node scripts + local dev server). */
export function loadEnvFromProcess(): Env {
  processEnvCache = parseEnv(process.env as Record<string, unknown>);
  return processEnvCache;
}

/** Current env — request-scoped on Workers, process cache on Node. */
export function env(): Env {
  return requestEnv.getStore() ?? processEnvCache ?? loadEnvFromProcess();
}

export function runWithEnv<T>(config: Env, fn: () => T): T {
  return requestEnv.run(config, fn);
}
