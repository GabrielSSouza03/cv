type MonogramProps = {
  className?: string;
  /** Accessible name. Omit when the surrounding element already labels the mark. */
  title?: string;
};

export function Monogram({ className, title }: MonogramProps) {
  return (
    <svg
      viewBox="2 12 46 24"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="butt">
        <path d="M21.66 17.57A10 10 0 1 0 24 24H15" />
        <path d="M37.54 15.46A5 5 0 1 0 34 24A5 5 0 1 1 30.46 32.54" />
      </g>
      <rect x="42" y="30.5" width="3.5" height="3.5" fill="var(--color-accent, #f25a0d)" />
    </svg>
  );
}
