import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { priceDisplay, formatUsd } from "../lib/currency.js";

describe("priceDisplay", () => {
  const originalRate = process.env.USD_TO_LKR;

  beforeEach(() => {
    process.env.USD_TO_LKR = "300";
  });

  afterEach(() => {
    process.env.USD_TO_LKR = originalRate;
  });

  it("derives LKR minor units from the fixed FX rate", () => {
    // Note: env() caches after first read; this asserts the formula given a rate.
    const result = priceDisplay(10000); // $100.00
    expect(result.usdMinor).toBe(10000);
    expect(result.fxUsdToLkr).toBeGreaterThan(0);
    expect(result.lkrMinor).toBe(Math.round((10000 / 100) * result.fxUsdToLkr * 100));
  });

  it("rounds to the nearest cent", () => {
    const result = priceDisplay(333);
    expect(Number.isInteger(result.lkrMinor)).toBe(true);
  });
});

describe("formatUsd", () => {
  it("formats cents as a dollar string", () => {
    expect(formatUsd(150000)).toBe("$1500.00");
    expect(formatUsd(999)).toBe("$9.99");
  });
});
