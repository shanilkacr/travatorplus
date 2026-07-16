import type { Context, Next } from "hono";
import { verifyJwt, type JwtClaims } from "./jwt.js";

/**
 * Optional-auth middleware. Anonymous users can start chatting; identity is
 * required only for actions gated by the SignupCard flow. Populates
 * c.get("user") when a valid bearer token is present.
 */
export type AuthVars = { user: JwtClaims | null };

export async function withOptionalAuth(c: Context, next: Next) {
  const header = c.req.header("Authorization");
  let user: JwtClaims | null = null;
  if (header?.startsWith("Bearer ")) {
    user = await verifyJwt(header.slice("Bearer ".length));
  }
  c.set("user", user);
  await next();
}

/** Require auth: 401 if no valid user. */
export async function requireAuth(c: Context, next: Next) {
  const user = c.get("user") as JwtClaims | null;
  if (!user) return c.json({ error: "unauthorized" }, 401);
  await next();
}
