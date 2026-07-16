import { createHash } from "node:crypto";
import { env } from "../config/env.js";

/**
 * EmbeddingProvider abstraction. `mock` produces deterministic, normalized
 * vectors from a hash so local dev needs no network and seeds are reproducible.
 * Real adapters (Voyage/OpenAI) read keys from env.
 */
export interface EmbeddingProvider {
  id: string;
  dim: number;
  embed(texts: string[]): Promise<number[][]>;
}

const DIM = () => env().EMBEDDINGS_DIM;

/** Deterministic hash-based embeddings. Same text -> same unit vector. */
class MockEmbeddingProvider implements EmbeddingProvider {
  id = "mock";
  get dim() {
    return DIM();
  }
  async embed(texts: string[]): Promise<number[][]> {
    return texts.map((t) => hashVector(t, this.dim));
  }
}

function hashVector(text: string, dim: number): number[] {
  const vec = new Array<number>(dim).fill(0);
  // Expand a token stream into the vector via salted hashes for coverage.
  const tokens = text.toLowerCase().split(/\W+/).filter(Boolean);
  const source = tokens.length ? tokens : [text];
  for (const tok of source) {
    for (let salt = 0; salt < 4; salt++) {
      const h = createHash("sha256").update(`${salt}:${tok}`).digest();
      for (let i = 0; i + 4 <= h.length; i += 4) {
        const idx = h.readUInt32BE(i) % dim;
        const sign = (h[i]! & 1) === 1 ? 1 : -1;
        const magnitude = 1 + (h[(i + 1) % h.length]! % 5);
        vec[idx]! += sign * magnitude;
      }
    }
  }
  return normalize(vec);
}

function normalize(v: number[]): number[] {
  let norm = 0;
  for (const x of v) norm += x * x;
  norm = Math.sqrt(norm) || 1;
  return v.map((x) => x / norm);
}

class VoyageEmbeddingProvider implements EmbeddingProvider {
  id = "voyage";
  get dim() {
    return DIM();
  }
  async embed(texts: string[]): Promise<number[][]> {
    const key = env().VOYAGE_API_KEY;
    if (!key) throw new Error("VOYAGE_API_KEY required for voyage embeddings");
    const res = await fetch("https://api.voyageai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: texts, model: env().EMBEDDINGS_MODEL }),
    });
    if (!res.ok) throw new Error(`Voyage embeddings failed: ${res.status}`);
    const json = (await res.json()) as { data: { embedding: number[] }[] };
    return json.data.map((d) => normalize(d.embedding));
  }
}

class OpenAIEmbeddingProvider implements EmbeddingProvider {
  id = "openai";
  get dim() {
    return DIM();
  }
  async embed(texts: string[]): Promise<number[][]> {
    const key = env().OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY required for openai embeddings");
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: texts,
        model: env().EMBEDDINGS_MODEL,
        dimensions: this.dim,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI embeddings failed: ${res.status}`);
    const json = (await res.json()) as { data: { embedding: number[] }[] };
    return json.data.map((d) => normalize(d.embedding));
  }
}

let cached: EmbeddingProvider | null = null;
export function getEmbeddingProvider(): EmbeddingProvider {
  if (cached) return cached;
  switch (env().EMBEDDINGS_PROVIDER) {
    case "voyage":
      cached = new VoyageEmbeddingProvider();
      break;
    case "openai":
      cached = new OpenAIEmbeddingProvider();
      break;
    default:
      cached = new MockEmbeddingProvider();
  }
  return cached;
}
