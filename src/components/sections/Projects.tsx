import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { featuredProjects, otherProjects, pick, profile } from "@/content/data";
import { getRepoStars, repoUrl } from "@/lib/github";
import { GithubIcon } from "../icons";
import { Pipeline } from "../Pipeline";
import { Section } from "./Section";

export async function Projects() {
  const t = await getTranslations("projects");
  const locale = await getLocale();
  const stars = await getRepoStars();

  return (
    <Section id="projects" title={t("title")}>
      <div className="space-y-6">
        {featuredProjects.map((p, i) => {
          const star = p.repo ? stars[p.repo] : undefined;
          const lead = i === 0;
          return (
            <article
              key={p.slug}
              className={`group relative grid overflow-hidden rounded-3xl border border-line bg-surface ${
                lead ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1fr_1.1fr]"
              }`}
            >
              <div className="flex flex-col p-7 sm:p-9">
                <p className="text-sm text-muted">{pick(p.context, locale)}</p>
                <h3 className="heading mt-2 text-2xl text-fg sm:text-[1.75rem]">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {pick(p.title, locale)}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-muted">
                  {pick(p.summary, locale)}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <li key={tag} className="rounded-md bg-bg px-2 py-1 text-xs text-fg">
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="relative z-10 mt-auto flex items-center gap-4 pt-7 text-sm">
                  <span className="font-semibold text-accent group-hover:underline underline-offset-4">
                    {t("details")}
                  </span>
                  {p.repo && (
                    <a
                      href={repoUrl(p.repo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted hover:text-fg"
                    >
                      <GithubIcon className="size-4" />
                      {t("code")}
                      {star ? (
                        <span className="inline-flex items-center gap-0.5" aria-label={`${star} ${t("stars")}`}>
                          <Star className="size-3.5" aria-hidden="true" />
                          {star}
                        </span>
                      ) : null}
                    </a>
                  )}
                </div>
              </div>

              <div className="relative flex min-h-56 items-center border-t border-line bg-bg/60 md:border-t-0 md:border-l">
                {p.image ? (
                  <Image
                    src={p.image.src}
                    alt={pick(p.image.alt, locale)}
                    width={p.image.width}
                    height={p.image.height}
                    sizes="(min-width: 768px) 32rem, 100vw"
                    className="h-full w-full object-cover"
                  />
                ) : p.metrics ? (
                  <div className="w-full p-7 sm:p-9">
                    <p className="heading text-5xl text-accent">0.899</p>
                    <p className="mt-1 text-muted">ROC-AUC, Logistic Regression</p>
                    <div className="mt-6">
                      <Pipeline steps={p.pipeline.map((s) => pick(s, locale))} compact />
                    </div>
                  </div>
                ) : (
                  <div className="w-full p-7 sm:p-9">
                    <Pipeline steps={p.pipeline.map((s) => pick(s, locale))} compact />
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="heading text-xl text-fg">{t("otherTitle")}</h3>
          <a
            href={`${profile.links.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-fg underline underline-offset-4 decoration-line"
          >
            {t("allRepos")}
          </a>
        </div>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {otherProjects.map((o) => (
            <li key={o.repo}>
              <a
                href={repoUrl(o.repo)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6 hover:bg-surface/60 transition-colors sm:px-2"
              >
                <span className="font-semibold text-fg sm:w-64">{o.title}</span>
                <span className="flex-1 text-muted">{pick(o.description, locale)}</span>
                <span className="text-sm text-muted">{o.language}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
