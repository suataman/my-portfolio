import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { featuredProjects, pick } from "@/content/data";
import { repoUrl } from "@/lib/github";
import { GithubIcon } from "@/components/icons";
import { Pipeline } from "@/components/Pipeline";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featuredProjects.map((p) => ({ locale, slug: p.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = featuredProjects.find((x) => x.slug === slug);
  if (!p) return {};
  const path = `/projects/${slug}`;
  return {
    title: pick(p.title, locale),
    description: pick(p.summary, locale),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, tr: `/tr${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      title: pick(p.title, locale),
      description: pick(p.summary, locale),
      url: `/${locale}${path}`,
      type: "article",
      images: [p.image?.src ?? "/images/profile.png"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const index = featuredProjects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = featuredProjects[index];
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const t = await getTranslations("project");

  return (
    <article className="mx-auto max-w-4xl px-5 pt-10 pb-24 sm:px-8 md:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("back")}
      </Link>

      <header className="mt-8">
        <p className="text-muted">{pick(p.context, locale)}</p>
        <h1 className="display mt-3 text-[clamp(2.2rem,6vw,4rem)] text-fg">
          {pick(p.title, locale)}
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-muted">
          {pick(p.summary, locale)}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {p.repo && (
            <a
              href={repoUrl(p.repo)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink"
            >
              <GithubIcon className="size-4" />
              {t("viewCode")}
            </a>
          )}
          {p.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-fg hover:border-fg/40"
            >
              {l.label}
            </a>
          ))}
        </div>
      </header>

      {p.image && (
        <figure className="mt-12 overflow-hidden rounded-2xl border border-line">
          <Image
            src={p.image.src}
            alt={pick(p.image.alt, locale)}
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 896px) 56rem, 100vw"
            priority
            className="h-auto w-full"
          />
        </figure>
      )}

      <div className="mt-14 space-y-14">
        <section>
          <h2 className="heading text-2xl text-fg">{t("overview")}</h2>
          <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-muted">
            {pick(p.overview, locale)}
          </p>
        </section>

        <section>
          <h2 className="heading text-2xl text-fg">{t("pipeline")}</h2>
          <div className="mt-5">
            <Pipeline steps={p.pipeline.map((s) => pick(s, locale))} />
          </div>
        </section>

        <section>
          <h2 className="heading text-2xl text-fg">{t("highlights")}</h2>
          <ul className="mt-5 space-y-3">
            {p.highlights.map((h) => (
              <li key={h.en} className="flex gap-3 leading-relaxed text-fg">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {pick(h, locale)}
              </li>
            ))}
          </ul>
        </section>

        {p.metrics && (
          <section>
            <h2 className="heading text-2xl text-fg">{t("results")}</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
              <table className="w-full text-left">
                <caption className="px-5 pt-4 text-left text-sm text-muted">
                  {pick(p.metrics.caption, locale)}
                </caption>
                <thead>
                  <tr className="border-b border-line">
                    {p.metrics.columns.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={`px-5 py-3 text-sm font-semibold text-muted ${i > 0 ? "text-right" : ""}`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.metrics.rows.map((row, r) => (
                    <tr key={r} className="border-b border-line last:border-0">
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`px-5 py-3 tabular-nums ${
                            i > 0 ? "text-right" : ""
                          } ${r === 0 ? "font-semibold text-accent" : "text-fg"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section>
          <h2 className="heading text-2xl text-fg">{t("stack")}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <li key={tag} className="rounded-md border border-line px-3 py-1.5 text-fg">
                {tag}
              </li>
            ))}
          </ul>
          {p.note && <p className="mt-6 text-sm text-muted">{pick(p.note, locale)}</p>}
        </section>
      </div>

      <nav className="mt-20 border-t border-line pt-8">
        <p className="text-sm text-muted">{t("next")}</p>
        <Link
          href={`/projects/${next.slug}`}
          className="heading mt-2 inline-block text-2xl text-fg hover:text-accent"
        >
          {pick(next.title, locale)}
        </Link>
      </nav>
    </article>
  );
}
