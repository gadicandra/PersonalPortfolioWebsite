/** Shared overlay for the page transition (see lib/curtain). Hidden until used. */
export function BarCurtain() {
  return (
    <div data-curtain aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden">
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} data-curtain-bar className="-mx-px h-full flex-1 bg-dark" />
      ))}
    </div>
  );
}
