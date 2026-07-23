import { Hono } from "hono";
import { ContactRequestBody } from "@travator/shared";
import { schema } from "../db/client.js";
import { getContextDb } from "../middleware/request-context.js";
import type { AppVars } from "../middleware/request-context.js";

/** POST /v1/contact — Book-a-call fallback form. */
export const contactRoutes = new Hono<{ Variables: AppVars }>();

contactRoutes.post("/", async (c) => {
  const body = ContactRequestBody.safeParse(await c.req.json());
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  const db = getContextDb(c);
  await db.insert(schema.contactRequests).values({
    name: body.data.name,
    email: body.data.email,
    message: body.data.message,
    preferredTime: body.data.preferredTime ?? null,
  });

  return c.json({ ok: true });
});
