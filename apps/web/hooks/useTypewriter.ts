"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** Ms per character while typing forward. */
  typeMs?: number;
  /** Ms per character while deleting. */
  deleteMs?: number;
  /** Ms to hold a fully typed phrase before deleting it. */
  holdMs?: number;
  /** Pause typing entirely (e.g. the field is no longer empty). */
  paused?: boolean;
}

/**
 * Cycles through phrases with a type → hold → delete loop.
 * Returns the currently visible substring.
 */
export function useTypewriter(phrases: string[], options: Options = {}) {
  const { typeMs = 45, deleteMs = 22, holdMs = 1800, paused = false } = options;
  const [text, setText] = useState("");
  const phraseRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    if (paused || phrases.length === 0) return;

    const phrase = phrases[phraseRef.current % phrases.length] ?? "";
    const deleting = deletingRef.current;

    // Fully typed — hold, then start deleting.
    if (!deleting && text === phrase) {
      const t = setTimeout(() => {
        deletingRef.current = true;
        setText(phrase.slice(0, phrase.length - 1));
      }, holdMs);
      return () => clearTimeout(t);
    }

    // Fully deleted — advance to the next phrase.
    if (deleting && text === "") {
      deletingRef.current = false;
      phraseRef.current += 1;
      const next = phrases[phraseRef.current % phrases.length] ?? "";
      const t = setTimeout(() => setText(next.slice(0, 1)), typeMs);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () =>
        setText((cur) =>
          deleting ? cur.slice(0, cur.length - 1) : phrase.slice(0, cur.length + 1)
        ),
      deleting ? deleteMs : typeMs
    );
    return () => clearTimeout(t);
  }, [text, paused, phrases, typeMs, deleteMs, holdMs]);

  // Reset to a clean slate whenever typing is suspended.
  useEffect(() => {
    if (paused) {
      setText("");
      deletingRef.current = false;
    }
  }, [paused]);

  return text;
}
