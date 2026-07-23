import { env } from "../config/env.js";

/** Allow configured origin plus www/apex variants (e.g. travatorplus.com ↔ www.travatorplus.com). */
export function resolveCorsOrigin(requestOrigin: string | undefined): string {
  const configured = env().WEB_ORIGIN;
  if (!requestOrigin) return configured;

  if (requestOrigin === configured) return requestOrigin;

  try {
    const req = new URL(requestOrigin);
    const cfg = new URL(configured);
    const normalizeHost = (host: string) => host.replace(/^www\./, "");
    if (
      req.protocol === cfg.protocol &&
      normalizeHost(req.hostname) === normalizeHost(cfg.hostname)
    ) {
      return requestOrigin;
    }
  } catch {
    // fall through
  }

  return configured;
}
