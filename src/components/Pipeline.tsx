/** A project's processing steps drawn as a left-to-right flow (wraps on mobile). */
export function Pipeline({ steps, compact = false }: { steps: string[]; compact?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          <span
            className={`flex items-center gap-2 rounded-lg border border-line bg-bg ${
              compact ? "px-2.5 py-1.5 text-sm" : "px-3.5 py-2.5"
            } text-fg`}
          >
            <span className="font-mono text-xs text-accent">{i + 1}</span>
            {step}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="mx-1.5 h-px w-5 bg-accent/60" />
          )}
        </li>
      ))}
    </ol>
  );
}
