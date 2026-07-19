import { z } from "zod";

/** Validated environment. Fails loudly at startup if misconfigured. */
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

let cached: Env | null = null;
export function env(): Env {
  if (cached) return cached;
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("✗ Invalid environment:\n", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration");
  }
  cached = parsed.data;
  return cached;
}
