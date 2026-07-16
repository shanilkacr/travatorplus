import { z } from "zod";

/**
 * HTTP request/response DTOs for the api surface consumed by web + ops.
 */

// Auth (dev email + OTP)
export const RequestOtpBody = z.object({ email: z.string().email() });
export const VerifyOtpBody = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});
export const AuthTokenResponse = z.object({
  token: z.string(),
  user: z.object({ id: z.string().uuid(), email: z.string().email() }),
});

// Conversations
export const CreateConversationBody = z.object({
  title: z.string().optional(),
  firstMessage: z.string().optional(),
});
export const PostMessageBody = z.object({
  text: z.string().min(1),
  /** Optional per-conversation model override. */
  model: z.string().optional(),
  provider: z.string().optional(),
});

// Contact form (book-a-call fallback)
export const ContactRequestBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  preferredTime: z.string().optional(),
});

// Ops: send-as-human
export const SendAsHumanBody = z.object({ text: z.string().min(1) });
export const SetModeBody = z.object({ mode: z.enum(["ai", "human"]) });

export type RequestOtpBody = z.infer<typeof RequestOtpBody>;
export type VerifyOtpBody = z.infer<typeof VerifyOtpBody>;
export type AuthTokenResponse = z.infer<typeof AuthTokenResponse>;
export type CreateConversationBody = z.infer<typeof CreateConversationBody>;
export type PostMessageBody = z.infer<typeof PostMessageBody>;
export type ContactRequestBody = z.infer<typeof ContactRequestBody>;
export type SendAsHumanBody = z.infer<typeof SendAsHumanBody>;
export type SetModeBody = z.infer<typeof SetModeBody>;
