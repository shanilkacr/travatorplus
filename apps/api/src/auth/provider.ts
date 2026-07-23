import { and, eq, gt, isNull, desc } from "drizzle-orm";
import type { DB } from "../db/client.js";
import { users, otpCodes } from "../db/schema.js";
import { env } from "../config/env.js";
import { signJwt } from "./jwt.js";
import { randomInt, sha256Hex } from "../lib/crypto.js";

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

async function hashCode(email: string, code: string): Promise<string> {
  return sha256Hex(`${email}:${code}`);
}

class DevOtpAuthProvider implements AuthProvider {
  id = "dev-otp";

  constructor(private db: DB) {}

  async requestOtp(email: string): Promise<{ devCode?: string }> {
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const expiresAt = new Date(Date.now() + env().OTP_TTL_SECONDS * 1000);
    await this.db.insert(otpCodes).values({
      email,
      codeHash: await hashCode(email, code),
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
    const [row] = await this.db
      .select()
      .from(otpCodes)
      .where(
        and(
          eq(otpCodes.email, email),
          eq(otpCodes.codeHash, await hashCode(email, code)),
          isNull(otpCodes.consumedAt),
          gt(otpCodes.expiresAt, new Date())
        )
      )
      .orderBy(desc(otpCodes.createdAt))
      .limit(1);

    if (!row) return null;
    await this.db
      .update(otpCodes)
      .set({ consumedAt: new Date() })
      .where(eq(otpCodes.id, row.id));

    // Upsert user by email.
    const existing = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    let user: AuthUser;
    if (existing[0]) {
      user = { id: existing[0].id, email: existing[0].email };
    } else {
      const [created] = await this.db
        .insert(users)
        .values({ email })
        .returning({ id: users.id, email: users.email });
      user = { id: created!.id, email: created!.email };
    }

    const token = await signJwt({ sub: user.id, email: user.email });
    return { token, user };
  }
}

export function getAuthProvider(db: DB): AuthProvider {
  return new DevOtpAuthProvider(db);
}
