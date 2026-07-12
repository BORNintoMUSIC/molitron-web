import Link from "next/link";

type LogoProps = {
  href?: string;
  onClick?: () => void;
  /** Use light wordmark for dark brand bands (footer). */
  onDark?: boolean;
  className?: string;
  showTagline?: boolean;
};

function Mark({ onDark = false }: { onDark?: boolean }) {
  const tile = onDark ? "#2F6B5A" : "#1B3D34";
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9"
      style={{ backgroundColor: tile }}
      aria-hidden
    >
      <span className="text-[1.05rem] font-bold leading-none text-white sm:text-[1.15rem]">M</span>
    </span>
  );
}

export function Logo({
  href = "/",
  onClick,
  onDark = false,
  className = "",
  showTagline = false,
}: LogoProps) {
  const word = onDark ? "text-on-brand" : "text-[#1B3D34]";
  const tag = onDark ? "text-on-brand-muted" : "text-muted";

  const inner = (
    <>
      <span className="flex items-center gap-2.5 sm:gap-3">
        <Mark onDark={onDark} />
        <span
          className={`text-[1.05rem] font-bold uppercase tracking-[0.08em] sm:text-[1.2rem] ${word}`}
        >
          Molitron
        </span>
      </span>
      {showTagline ? (
        <span
          className={`mt-0.5 hidden pl-[2.9rem] text-[11px] font-medium uppercase tracking-wider sm:block sm:pl-[3.15rem] ${tag}`}
        >
          Pollution control · Odor abatement
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <span className={`inline-flex flex-col ${className}`}>{inner}</span>;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex min-w-0 flex-col py-1 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Molitron home"
    >
      {inner}
    </Link>
  );
}
