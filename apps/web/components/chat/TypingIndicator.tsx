/** Three-dot typing indicator shown while a reply is being composed. */
export function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="Travator is typing"
      className="inline-flex items-center gap-1 rounded-[14px] bg-gray-50 px-3 py-2.5"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="h-1.5 w-1.5 animate-typing rounded-[3px] bg-gray-500"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}
