"use client";

import { Menu, X } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { Monogram } from "@/components/brand/Monogram";
import type { SectionId } from "@/content";

type MobileMenuProps = {
  navLabel: string;
  openLabel: string;
  closeLabel: string;
  items: { id: SectionId; label: string }[];
  footer: ReactNode;
  className?: string;
};

export function MobileMenu({ navLabel, openLabel, closeLabel, items, footer, className }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => dialogRef.current?.close();

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        className="inline-flex size-11 items-center justify-center text-ink"
      >
        <Menu aria-hidden className="size-6" strokeWidth={1.5} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={navLabel}
        onClose={() => setOpen(false)}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink backdrop:bg-ink/20"
      >
        <div className="container-page flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-rule">
            <Monogram className="h-6 w-auto" />
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="inline-flex size-11 items-center justify-center"
            >
              <X aria-hidden className="size-6" strokeWidth={1.5} />
            </button>
          </div>
          <nav aria-label={navLabel} className="flex-1 py-10">
            <ol className="space-y-2">
              {items.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={close}
                    className="flex min-h-14 items-baseline gap-4 font-serif text-[2.5rem] leading-tight transition-colors hover:text-accent-ink"
                  >
                    <span className="meta text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="border-t border-rule py-6">{footer}</div>
        </div>
      </dialog>
    </div>
  );
}
