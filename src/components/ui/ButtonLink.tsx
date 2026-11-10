import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "text";

const base =
  "inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-ink px-5 text-paper hover:bg-accent-ink",
  secondary: "border border-ink px-4 text-ink hover:bg-ink hover:text-paper",
  text: "text-ink underline decoration-rule decoration-1 underline-offset-[6px] hover:text-accent-ink hover:decoration-accent",
};

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <a className={[base, variants[variant], className].filter(Boolean).join(" ")} {...props} />;
}
