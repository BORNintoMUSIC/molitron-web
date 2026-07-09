type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Escape `<` so JSON-LD cannot break out of the script tag (XSS hygiene). */
function safeJsonLd(data: JsonLdProps["data"]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static app data, not user HTML
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
