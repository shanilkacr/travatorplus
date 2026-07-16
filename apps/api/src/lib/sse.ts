import type { StreamEvent } from "@travator/shared";
import { encodeSSE } from "@travator/shared";

/**
 * Thin wrapper over Hono's streaming API for our SSE protocol. Each writer
 * serializes a validated StreamEvent to one `data:` frame.
 */
export interface SSEWriter {
  send(event: StreamEvent): Promise<void>;
}

export function makeSSEWriter(stream: {
  write: (chunk: string) => Promise<void>;
}): SSEWriter {
  return {
    async send(event: StreamEvent) {
      await stream.write(encodeSSE(event));
    },
  };
}

export const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
} as const;
