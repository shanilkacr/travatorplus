/** Web Crypto helpers — work in Node 20+, Cloudflare Workers, and browsers. */

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Bytes(input: string): Promise<Uint8Array> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hash);
}

/** Inclusive min, exclusive max — same contract as node:crypto randomInt. */
export function randomInt(min: number, max: number): number {
  const range = max - min;
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0]! % range);
}
