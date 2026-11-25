import { getLocale, getTranslations } from "next-intl/server";
import { pick, skillGroups } from "@/content/data";
import { Section } from "./Section";

export async function Skills() {
  const t = await getTranslations("skills");
  const locale = await getLocale();

  return (
    <Section id="skills" title={t("title")}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <div key={g.title.en} className={i === skillGroups.length - 1 ? "opacity-80" : ""}>
            <h3 className="border-b border-line pb-3 font-semibold text-fg">
              {pick(g.title, locale)}
            </h3>
            <ul className="mt-4 space-y-2">
              {g.items.map((item) => (
                <li key={item} className="text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
