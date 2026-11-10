"use client";

import { useMemo } from "react";
import type { SectionId } from "@/content";
import { useActiveSection } from "@/lib/useActiveSection";

type NavProps = {
  label: string;
  items: { id: SectionId; label: string }[];
  className?: string;
};

export function Nav({ label, items, className }: NavProps) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const active = useActiveSection(ids);

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-7">
        {items.map(({ id, label: itemLabel }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className="group relative inline-flex min-h-11 items-center text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink aria-[current]:text-ink"
              >
                <span
                  aria-hidden
                  className="absolute -left-3 size-1.5 scale-0 bg-accent transition-transform duration-300 group-aria-[current]:scale-100"
                />
                {itemLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
