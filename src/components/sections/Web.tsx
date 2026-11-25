import { getTranslations } from "next-intl/server";

export async function Web() {
  const t = await getTranslations("web");
  const examples = t("examples").split(" · ");
  return (
    <section id="web" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1fr_1.4fr] md:py-20">
        <h2 className="heading text-2xl text-fg sm:text-3xl">{t("title")}</h2>
        <div>
          <p className="max-w-[62ch] leading-relaxed text-muted">{t("text")}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {examples.map((e) => (
              <li key={e} className="rounded-md border border-line px-2.5 py-1 text-sm text-fg">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
