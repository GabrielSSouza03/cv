import type { ReactNode } from "react";

type InlineListProps = {
  items: readonly ReactNode[];
  className?: string;
  separatorClassName?: string;
};

/** Inline list with a trailing slash separator, so wrapped lines never start with one. */
export function InlineList({ items, className, separatorClassName = "text-accent" }: InlineListProps) {
  return (
    <ul className={["flex flex-wrap gap-y-1", className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <li key={i} className="mr-2">
          {item}
          {i < items.length - 1 ? (
            <span aria-hidden className={`ml-2 ${separatorClassName}`}>
              /
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function TechList({ items, className }: { items: readonly string[]; className?: string }) {
  return <InlineList items={items} className={["meta", className].filter(Boolean).join(" ")} />;
}
