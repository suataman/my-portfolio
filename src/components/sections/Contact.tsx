import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { profile } from "@/content/data";
import { CopyEmail } from "../CopyEmail";
import { SocialLinks } from "../Footer";

export async function Contact() {
  const t = await getTranslations("contact");
  const hero = await getTranslations("hero");

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <h2 className="display max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)] text-fg">
          {t("title")}
        </h2>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-muted">{t("text")}</p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-10 inline-flex items-center gap-3 break-all text-[clamp(1.2rem,3vw,1.9rem)] font-semibold text-accent underline decoration-accent/40 underline-offset-8 hover:decoration-accent"
        >
          <Mail className="size-6 shrink-0" aria-hidden="true" />
          {profile.email}
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmail email={profile.email} copy={t("copy")} copied={t("copied")} />
          <a
            href={profile.cv.ml}
            download
            className="rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-ink"
          >
            {hero("cta")}
          </a>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
