import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env.js";

/** JWT payload shape — Supabase-auth-compatible-ish (sub = user id). */
export interface JwtClaims {
  sub: string; // user id
  email: string;
}

function secret(): Uint8Array {
  return new TextEncoder().encode(env().JWT_SECRET);
}

export async function signJwt(claims: JwtClaims): Promise<string> {
  return new SignJWT({ email: claims.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuer(env().JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
}

export async function verifyJwt(token: string): Promise<JwtClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secret(), {
      issuer: env().JWT_ISSUER,
    });
    if (!payload.sub || typeof payload.email !== "string") return null;
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
