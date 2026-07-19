import Image from "next/image";
import Link from "next/link";

/** Brand logo from /Logo — links to home. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Travator home"
    >
      <Image
        src="/brand/travator-logo.png"
        alt="Travator"
        width={1329}
        height={643}
        priority
        className="h-[19px] w-auto md:h-[21.5px]"
        sizes="(max-width: 768px) 81px, 95px"
      />
    </Link>
  );
}
