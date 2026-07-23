/**
 * Cloudflare Worker bindings + secrets. Set via wrangler.toml [vars] and
 * `wrangler secret put`. DATABASE_URL is required; HYPERDRIVE is optional
 * (recommended in production for connection pooling to Supabase/Neon).
 */
export interface HyperdriveBinding {
  connectionString: string;
}

export interface WorkerBindings {
  /** Direct Postgres URL (Supabase pooler recommended). Required if HYPERDRIVE unset. */
  DATABASE_URL: string;
  /** Optional Cloudflare Hyperdrive binding — takes precedence over DATABASE_URL. */
  HYPERDRIVE?: HyperdriveBinding;

  NODE_ENV?: string;

  LLM_PROVIDER?: string;
  LLM_MODEL?: string;
  TASK_LLM_PROVIDER?: string;
  TASK_LLM_MODEL?: string;

  ANTHROPIC_API_KEY?: string;
  OPENAI_API_KEY?: string;
  GOOGLE_API_KEY?: string;

  EMBEDDINGS_PROVIDER?: string;
  EMBEDDINGS_MODEL?: string;
  VOYAGE_API_KEY?: string;
  EMBEDDINGS_DIM?: string;

  JWT_SECRET?: string;
  JWT_ISSUER?: string;
  OTP_TTL_SECONDS?: string;

  WEB_ORIGIN?: string;
  API_PUBLIC_URL?: string;

  USD_TO_LKR?: string;
}

export function resolveDatabaseUrl(bindings: WorkerBindings): string {
  return bindings.HYPERDRIVE?.connectionString ?? bindings.DATABASE_URL;
}
