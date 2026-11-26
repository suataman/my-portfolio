import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { certificates, education, experience, pick } from "@/content/data";
import { Section } from "./Section";

export async function Experience() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <Section id="experience" title={t("title")}>
      <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
        <ol className="relative border-l border-line">
          {experience.map((e) => (
            <li key={e.org} className="relative pb-10 pl-7 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-2 size-2.5 rounded-full border-2 border-accent bg-bg"
              />
              <p className="text-sm text-muted">
                {e.period}, {pick(e.kind, locale)}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-fg">
                {pick(e.role, locale)}
                <span className="font-normal text-muted">, {e.org}</span>
              </h3>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">
                {pick(e.description, locale)}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {e.tags.map((tag) => (
                  <li key={tag} className="rounded-md bg-surface px-2 py-1 text-xs text-fg">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="space-y-10">
          <div>
            <h3 className="border-b border-line pb-3 font-semibold text-fg">{t("education")}</h3>
            <p className="mt-4 text-fg">{pick(education.degree, locale)}</p>
            <p className="text-muted">
              {pick(education.school, locale)}, {education.period}
            </p>
          </div>
          {certificates.length > 0 && (
            <div>
              <h3 className="border-b border-line pb-3 font-semibold text-fg">
                {t("certificates", { count: certificates.length })}
              </h3>
              <ul className="mt-4 space-y-4">
                {certificates.map((c) => {
                  const title = pick(c.title, locale);
                  return (
                    <li key={c.id} className="flex gap-4">
                      {c.image && (
                        <a
                          href={c.image.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-28 shrink-0 self-start overflow-hidden rounded-lg border border-line transition-colors hover:border-accent"
                        >
                          <Image
                            src={c.image.src}
                            alt={title}
                            width={c.image.width}
                            height={c.image.height}
                            sizes="7rem"
                            className="h-auto w-full"
                          />
                          <span className="sr-only">{t("viewCertificate")}</span>
                        </a>
                      )}
                      <div className="min-w-0">
                        <p className="text-fg">{title}</p>
                        <p className="text-sm text-muted">
                          {c.issuer}
                          {c.date && `, ${c.date}`}
                        </p>
                        {c.url && (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-sm text-accent underline-offset-4 hover:underline"
                          >
                            {t("verifyCertificate")}
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
