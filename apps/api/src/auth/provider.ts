import { createHash, randomInt } from "node:crypto";
import { and, eq, gt, isNull, desc } from "drizzle-orm";
import { db } from "../db/client.js";
import { users, otpCodes } from "../db/schema.js";
import { env } from "../config/env.js";
import { signJwt } from "./jwt.js";

/**
 * AuthProvider abstraction. The dev implementation is passwordless email + OTP;
 * a real Supabase/JWT provider can drop in behind the same interface without
 * touching routes.
 */
export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthProvider {
  id: string;
  /** Begin sign-in: issue an OTP for the email. Returns the code in dev only. */
  requestOtp(email: string): Promise<{ devCode?: string }>;
  /** Complete sign-in: verify code, upsert user, return a JWT. */
  verifyOtp(email: string, code: string): Promise<{ token: string; user: AuthUser } | null>;
}

function hashCode(email: string, code: string): string {
  return createHash("sha256").update(`${email}:${code}`).digest("hex");
}

class DevOtpAuthProvider implements AuthProvider {
  id = "dev-otp";

  async requestOtp(email: string): Promise<{ devCode?: string }> {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const expiresAt = new Date(Date.now() + env().OTP_TTL_SECONDS * 1000);
    await db.insert(otpCodes).values({
      email,
      codeHash: hashCode(email, code),
      expiresAt,
    });
    // Dev: OTP is logged to the api console (never emailed here).
    console.log(`\n📧 [dev-otp] code for ${email}: ${code}\n`);
    return { devCode: env().NODE_ENV === "development" ? code : undefined };
  }

  async verifyOtp(
    email: string,
    code: string
  ): Promise<{ token: string; user: AuthUser } | null> {
    const [row] = await db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.codeHash, hashCode(email, code)),
          isNull(otpCodes.consumedAt),
          gt(otpCodes.expiresAt, new Date())
        )
      )
      .orderBy(desc(otpCodes.createdAt))
      .limit(1);

    if (!row) return null;
    await db
      .update(otpCodes)
      .set({ consumedAt: new Date() })
      .where(eq(otpCodes.id, row.id));

    // Upsert user by email.
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    let user: AuthUser;
    if (existing[0]) {
      user = { id: existing[0].id, email: existing[0].email };
    } else {
      const [created] = await db
        .insert(users)
        .values({ email })
        .returning({ id: users.id, email: users.email });
      user = { id: created!.id, email: created!.email };
    }

    const token = await signJwt({ sub: user.id, email: user.email });
    return { token, user };
  }
}

let cached: AuthProvider | null = null;
export function getAuthProvider(): AuthProvider {
  if (!cached) cached = new DevOtpAuthProvider();
  return cached;
}
