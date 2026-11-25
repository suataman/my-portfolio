"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { applyStoredTheme, toggleTheme } from "@/lib/theme";

const sections = ["about", "projects", "experience", "contact"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "en" ? "tr" : "en";

  useEffect(applyStoredTheme, [locale]);

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t("toggleTheme")}
      className="grid size-9 place-items-center rounded-md text-muted hover:text-fg hover:bg-surface transition-colors"
    >
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );

  const langLink = (
    <Link
      href={pathname}
      locale={otherLocale}
      className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted hover:text-fg hover:bg-surface transition-colors"
      lang={otherLocale}
    >
      {t("language")}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="heading text-[1.05rem] text-fg"
          onClick={() => setOpen(false)}
        >
          Umut Şuataman
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <Link
              key={s}
              href={`/#${s}`}
              className="rounded-md px-3 py-1.5 text-sm text-muted hover:text-fg transition-colors"
            >
              {t(s)}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-line" aria-hidden="true" />
          {langLink}
          {themeButton}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {themeButton}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t("menu")}
            className="grid size-9 place-items-center rounded-md text-fg hover:bg-surface"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col px-5 py-3">
              {sections.map((s) => (
                <Link
                  key={s}
                  href={`/#${s}`}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-lg text-fg"
                >
                  {t(s)}
                </Link>
              ))}
              <div className="mt-2 border-t border-line pt-3">{langLink}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
