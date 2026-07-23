/** Normalized API origin — strips trailing slash so paths don't become `//v1/...`. */
export function getApiBase(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";
  return raw.replace(/\/+$/, "");
}
