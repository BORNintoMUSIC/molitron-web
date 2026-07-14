import Image from "next/image";
import { getCustomerLogo } from "@/lib/customer-logos";

type CustomerLogoGridProps = {
  references: readonly string[];
  layout?: "featured" | "catalog";
};

const presentationClassNames = {
  standard: "max-h-16 max-w-[9rem]",
  wide: "max-h-12 max-w-full",
  tall: "max-h-[4.5rem] max-w-[6.5rem]",
} as const;

export function CustomerLogoGrid({
  references,
  layout = "catalog",
}: CustomerLogoGridProps) {
  const availableReferences = references.flatMap((reference) => {
    const logo = getCustomerLogo(reference);

    return logo ? [{ reference, logo }] : [];
  });

  return (
    <ul
      className={
        layout === "featured"
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          : "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5"
      }
    >
      {availableReferences.map(({ reference, logo }) => (
        <li
          key={reference}
          className="flex min-h-24 items-center justify-center rounded-lg border border-border bg-white px-4 py-3 text-center text-sm font-semibold text-primary"
        >
          <figure className="flex h-full w-full items-center justify-center">
            <Image
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              sizes="(max-width: 639px) 38vw, (max-width: 1279px) 28vw, 180px"
              className={`h-auto w-auto object-contain ${presentationClassNames[logo.presentation]}`}
            />
            <figcaption className="sr-only">{reference}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
