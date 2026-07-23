import { Hono } from "hono";
import { RequestOtpBody, VerifyOtpBody } from "@travator/shared";
import { getAuthProvider } from "../auth/provider.js";
import { getContextDb } from "../middleware/request-context.js";
import type { AppVars } from "../middleware/request-context.js";

/** Dev email + OTP auth. POST /v1/auth/otp/request, POST /v1/auth/otp/verify. */
export const authRoutes = new Hono<{ Variables: AppVars }>();

authRoutes.post("/otp/request", async (c) => {
  const body = RequestOtpBody.safeParse(await c.req.json());
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  const { devCode } = await getAuthProvider(getContextDb(c)).requestOtp(body.data.email);
  return c.json({ ok: true, devCode });
});

authRoutes.post("/otp/verify", async (c) => {
  const body = VerifyOtpBody.safeParse(await c.req.json());
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  const result = await getAuthProvider(getContextDb(c)).verifyOtp(
    body.data.email,
    body.data.code
  );
  if (!result) return c.json({ error: "invalid_or_expired_code" }, 401);

  return c.json(result);
});
