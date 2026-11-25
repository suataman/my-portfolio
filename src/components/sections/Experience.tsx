import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { certificate, education, experience, pick } from "@/content/data";
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
          <div>
            <h3 className="border-b border-line pb-3 font-semibold text-fg">{t("certificate")}</h3>
            <p className="mt-4 text-fg">{pick(certificate.title, locale)}</p>
            <p className="text-muted">{certificate.issuer}</p>
            <a
              href={certificate.image}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block overflow-hidden rounded-xl border border-line"
            >
              <Image
                src={certificate.image}
                alt={`${t("certificate")}: ${pick(certificate.title, locale)}`}
                width={1600}
                height={1131}
                sizes="(min-width: 1024px) 22rem, 100vw"
                className="h-auto w-full"
              />
              <span className="sr-only">{t("viewCertificate")}</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
