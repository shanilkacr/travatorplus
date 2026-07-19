import { Fragment, type ReactNode } from "react";

/** Inline emphasis — **bold** and *italic*. */
function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function renderBlock(block: string, key: number) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("### ")) {
    return <h3 key={key}>{formatInline(trimmed.slice(4))}</h3>;
  }

  if (trimmed.startsWith("## ")) {
    return <h2 key={key}>{formatInline(trimmed.slice(3))}</h2>;
  }

  const lines = trimmed.split("\n");
  if (lines.every((line) => /^[-*]\s/.test(line))) {
    return (
      <ul key={key}>
        {lines.map((line, i) => (
          <li key={i}>{formatInline(line.replace(/^[-*]\s/, ""))}</li>
        ))}
      </ul>
    );
  }

  if (lines.every((line) => /^\d+\.\s/.test(line))) {
    return (
      <ol key={key}>
        {lines.map((line, i) => (
          <li key={i}>{formatInline(line.replace(/^\d+\.\s/, ""))}</li>
        ))}
      </ol>
    );
  }

  return <p key={key}>{formatInline(trimmed.replace(/\n/g, " "))}</p>;
}

/** LLM reply — lightweight markdown rendered as editorial prose, no bubble. */
export function AssistantMessage({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="assistant-prose">
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}
