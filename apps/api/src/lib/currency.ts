import type { PriceDisplay } from "@travator/shared";
import { env } from "../config/env.js";

/**
 * Build a PriceDisplay from a USD-cents amount. LKR is display-only, derived
 * from the fixed env FX rate — MVP has no live FX. Both values + the rate travel
 * together for auditability.
 */
export function priceDisplay(usdCents: number): PriceDisplay {
  const fx = env().USD_TO_LKR;
  const usdMinor = Math.round(usdCents);
  // LKR minor units (cents): usd dollars * fx * 100
  const lkrMinor = Math.round((usdMinor / 100) * fx * 100);
  return { usdMinor, lkrMinor, fxUsdToLkr: fx };
}

export function formatUsd(usdCents: number): string {
  return `$${(usdCents / 100).toFixed(2)}`;
}
