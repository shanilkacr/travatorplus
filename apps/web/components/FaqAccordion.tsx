import { Plus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

/** Native details/summary accordion — no client JS. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-gray-100 rounded-[24px] bg-white px-6 shadow-glass md:px-8">
      {items.map((item, i) => (
        <details key={item.q} className="faq-item" {...(i === 0 ? { open: true } : {})}>
          <summary>
            {item.q}
            <Plus className="faq-icon h-4 w-4 text-gray-500" aria-hidden />
          </summary>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-gray-500">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
