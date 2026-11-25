"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-semibold text-fg hover:border-fg/40 transition-colors"
    >
      {done ? (
        <Check className="size-4 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
