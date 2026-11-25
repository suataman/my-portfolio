import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import { pick, profile } from "@/content/data";
import { Section } from "./Section";

export async function About() {
  const t = await getTranslations("about");
  const locale = await getLocale();

  const stats = [
    { value: "2", label: t("statTeknofest") },
    { value: "2", label: t("statInternships") },
    { value: "0.90", label: t("statAuc") },
  ];

  return (
    <Section id="about" title={t("title")}>
      <div className="grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
        {/* portrait */}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface md:col-span-2 md:row-span-2">
          <Image
            src="/images/profile.png"
            alt={profile.name}
            width={1080}
            height={1350}
            sizes="(min-width: 768px) 22rem, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        {/* bio */}
        <div className="rounded-3xl border border-line bg-surface p-7 md:col-span-4">
          <p className="text-lg leading-relaxed text-fg max-w-[62ch]">{t("bio")}</p>
        </div>

        {/* numbers */}
        <div className="rounded-3xl border border-line bg-surface p-7 md:col-span-2">
          <h3 className="text-sm text-muted">{t("statsTitle")}</h3>
          <dl className="mt-4 space-y-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <dt className="sr-only">{s.label}</dt>
                <dd className="heading w-20 shrink-0 text-3xl text-accent">{s.value}</dd>
                <dd className="text-fg">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* now + location + web */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-line bg-surface p-7 md:col-span-2">
          <div>
            <h3 className="text-sm text-muted">{t("nowTitle")}</h3>
            <p className="mt-2 text-fg">{t("now")}</p>
          </div>
          <div>
            <h3 className="text-sm text-muted">{t("locationTitle")}</h3>
            <p className="mt-2 flex items-center gap-1.5 text-fg">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {pick(profile.location, locale)}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-muted">{t("webTitle")}</h3>
            <p className="mt-2 text-fg">{t("web")}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
