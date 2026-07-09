import type { ProductDocument } from "@/lib/products";

const kindLabel: Record<ProductDocument["kind"], string> = {
  brochure: "Brochure",
  specs: "Specs",
  manual: "Manual",
};

export function DocDownloads({
  documents,
  productName,
}: {
  documents: ProductDocument[];
  productName: string;
}) {
  if (!documents.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {documents.map((doc) => (
        <a
          key={doc.href}
          href={doc.href}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="group surface-card flex min-h-[7.5rem] flex-col justify-between gap-4 p-5 transition-colors hover:border-accent"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {kindLabel[doc.kind]}
            </p>
            <h3 className="mt-2 text-base font-semibold text-primary transition-colors group-hover:text-accent">
              {doc.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{doc.description}</p>
          </div>
          <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent">
            Download PDF
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ↓
            </span>
          </span>
          <span className="sr-only">
            {productName} — {doc.title}
          </span>
        </a>
      ))}
    </div>
  );
}
