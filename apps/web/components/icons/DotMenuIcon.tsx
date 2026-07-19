/** 3×3 dot grid — app launcher / workspace menu affordance. */
export function DotMenuIcon({ className = "h-4 w-4" }: { className?: string }) {
  const dots = [3.5, 8, 12.5];

  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      {dots.map((y) =>
        dots.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.35} />)
      )}
    </svg>
  );
}
