import { cn } from "@/lib/utils";
import { SriLankaImage } from "@/components/SriLankaImage";
import type { SriLankaImageMeta } from "@/lib/images";

type Card = SriLankaImageMeta & { className?: string };

export function PhotoGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 py-4 md:auto-rows-[14rem] md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className={cn(
            card.className,
            "relative overflow-hidden rounded-4xl shadow-glass"
          )}
        >
          <SriLankaImage
            image={card}
            fill
            rounded="3xl"
            sizes="(max-width:768px) 100vw, 33vw"
            className="rounded-4xl"
          />
          <div className="absolute inset-0 rounded-4xl bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {card.region && (
              <p className="text-xs text-white/80">
                {card.region}
              </p>
            )}
            <p className="mt-1 text-sm font-light text-white">{card.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
