import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/data";
import { Viewfinder } from "../Viewfinder";

export async function Hero() {
  const t = await getTranslations("hero");
  const focus = t("focus").split(" · ");

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-20 md:pb-28">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-fg">
          <span className="pulse-dot size-2 rounded-full bg-accent" aria-hidden="true" />
          {t("badge")}
        </p>

        <p className="mt-8 text-lg text-muted">
          {profile.name}, {t("role")}
        </p>
        <h1 className="display mt-3 text-[clamp(2.6rem,7vw,5.2rem)] text-fg">
          {t("headline")}
        </h1>

        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
          {t("intro")}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {focus.map((f) => (
            <li
              key={f}
              className="rounded-md border border-line px-2.5 py-1 text-sm text-fg"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={profile.cv.ml}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink transition-transform active:scale-[0.97]"
          >
            <Download className="size-4" aria-hidden="true" />
            {t("cta")}
          </a>
          <Link
            href="/#projects"
            className="rounded-lg border border-line px-5 py-3 font-semibold text-fg hover:border-fg/40 transition-colors"
          >
            {t("projects")}
          </Link>
          <a
            href={profile.cv.web}
            download
            className="px-2 py-3 text-sm text-muted underline decoration-line underline-offset-4 hover:text-fg"
          >
            {t("ctaWeb")}
          </a>
        </div>
      </div>

      <Viewfinder label="engineer" status="tracking: locked" />
    </section>
  );
}
