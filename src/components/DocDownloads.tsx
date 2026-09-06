import type { ProductDocument } from "@/lib/products";
const kindLabel = {
  brochure: "Product brochure",
  specs: "Planning guide",
  manual: "Technical manual",
};
export function DocDownloads({
  documents,
  productName,
}: {
  documents: ProductDocument[];
  productName: string;
}) {
  return (
    <div className="document-list">
      {documents.map((doc) => (
        <a
          key={doc.href}
          href={doc.href}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="document-row"
          aria-label={
            "Download " +
            (doc.title.startsWith(productName)
              ? doc.title
              : productName + " " + doc.title) +
            " PDF"
          }
        >
          <span className="document-icon" aria-hidden="true">
            PDF
          </span>
          <div>
            <p className="eyebrow">{kindLabel[doc.kind]}</p>
            <h3>{doc.title}</h3>
            <p className="document-description">{doc.description}</p>
          </div>
          <span className="document-action">
            Download <span aria-hidden="true">↓</span>
          </span>
        </a>
      ))}
    </div>
  );
}
