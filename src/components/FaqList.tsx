import { faqs } from "@/lib/content";

export function FaqList({
  items = faqs,
}: {
  items?: readonly { question: string; answer: string }[];
}) {
  return (
    <div className="surface-card surface-card-static divide-y divide-border overflow-hidden">
      {items.map((item) => (
        <details
          key={item.question}
          className="group px-4 py-3 transition-colors open:bg-accent-soft/40 sm:px-5 sm:py-4"
        >
          <summary className="cursor-pointer list-none text-sm font-semibold text-primary marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
            <span className="flex min-h-11 items-start justify-between gap-3 py-1 sm:gap-4">
              <span className="min-w-0 break-words transition-colors group-open:text-accent">
                {item.question}
              </span>
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-white text-lg leading-none text-accent shadow-sm transition-transform duration-300 group-open:rotate-45 group-open:border-accent/40 group-open:bg-accent-soft"
                aria-hidden
              >
                +
              </span>
            </span>
          </summary>
          <p className="mt-1 pb-2 pr-10 text-sm leading-relaxed text-slate-700 sm:mt-2">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
