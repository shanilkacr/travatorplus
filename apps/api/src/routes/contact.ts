import { Hono } from "hono";
import { ContactRequestBody } from "@travator/shared";
import { db, schema } from "../db/client.js";

/** POST /v1/contact — Book-a-call fallback form. */
export const contactRoutes = new Hono();

contactRoutes.post("/", async (c) => {
  const body = ContactRequestBody.safeParse(await c.req.json());
  if (!body.success) return c.json({ error: "invalid_body", issues: body.error.issues }, 400);

  await db.insert(schema.contactRequests).values({
    name: body.data.name,
    email: body.data.email,
    message: body.data.message,
    preferredTime: body.data.preferredTime ?? null,
  });

  return c.json({ ok: true });
});
