import Link from "next/link";

/** Text wordmark — no logo image, monochrome. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-headline text-lg tracking-tightest text-ink ${className}`}
      aria-label="Travator home"
    >
      travator
      <span aria-hidden className="align-super text-[0.6em] text-gray-500">
        {" "}
        SL
      </span>
    </Link>
  );
}
