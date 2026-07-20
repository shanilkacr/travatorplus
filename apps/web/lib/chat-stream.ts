import { decodeSSE, type StreamEvent } from "@travator/shared";

export interface StreamHandlers {
  onToken: (text: string) => void;
  onMessageEnd: (messageId: string) => void;
  onHandoff: (mode: "ai" | "human") => void;
  onError: (code: string, message: string) => void;
}

/**
 * POSTs a user message to `/v1/conversations/:id/messages` and consumes the
 * StreamEvent v1 SSE response, dispatching each frame to the matching handler.
 *
 * `component`/`tool_status` frames are parsed but currently dropped — no
 * renderer is wired for them yet (the agent loop doesn't emit them either).
 */
export async function streamAssistantReply(
  apiBase: string,
  conversationId: string,
  text: string,
  handlers: StreamHandlers,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(`${apiBase}/v1/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text }),
    signal,
  });

  if (!res.ok || !res.body) {
    throw new Error(`stream request failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let boundary: number;
    while ((boundary = buffer.indexOf("\n\n")) !== -1) {
      const frame = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      dispatchFrame(frame, handlers);
    }
  }

  // Flush any trailing frame the stream closed without a final blank line.
  if (buffer.trim()) dispatchFrame(buffer, handlers);
}

function dispatchFrame(frame: string, handlers: StreamHandlers) {
  const line = frame.split("\n").find((l) => l.startsWith("data:"));
  if (!line) return;
  const payload = line.slice(5).trim();
  if (!payload) return;

  let event: StreamEvent;
  try {
    event = decodeSSE(payload);
  } catch {
    return; // Skip a malformed frame rather than aborting the whole turn.
  }

  switch (event.type) {
    case "token":
      handlers.onToken(event.text);
      break;
    case "message_end":
      handlers.onMessageEnd(event.messageId);
      break;
    case "handoff":
      handlers.onHandoff(event.mode);
      break;
    case "error":
      handlers.onError(event.code, event.message);
      break;
    case "component":
    case "tool_status":
      break;
  }
}
