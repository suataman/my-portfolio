import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center">
      <div className="relative w-48">
        <Image
          src="/images/avatar-cartoon.png"
          alt=""
          width={549}
          height={623}
          className="opacity-60 grayscale"
        />
        <span className="absolute -top-2 left-0 rounded-sm bg-muted px-2 py-1 font-mono text-xs text-bg">
          page 0.00
        </span>
      </div>
      <h1 className="heading mt-10 text-3xl text-fg">{t("title")}</h1>
      <p className="mt-3 text-muted">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink"
      >
        {t("home")}
      </Link>
    </section>
  );
}
