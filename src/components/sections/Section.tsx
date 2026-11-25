/** Shared section shell: heading in a left rail on wide screens, content on the right. */
export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-12 max-w-2xl">
          <h2 className="heading text-[clamp(1.9rem,4vw,2.8rem)] text-fg">{title}</h2>
          {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
