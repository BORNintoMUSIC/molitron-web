export function SectionNav({
  items,
  label = "On this page",
}: {
  items: { href: string; label: string }[];
  label?: string;
}) {
  return (
    <nav className="section-nav" aria-label={label}>
      <div className="safe-inline mx-auto max-w-7xl">
        <span>{label}</span>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
