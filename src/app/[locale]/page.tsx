import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Web } from "@/components/sections/Web";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { profile, siteUrl } from "@/content/data";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "meta" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        alternateName: "Umut Suataman",
        url: siteUrl,
        image: `${siteUrl}/images/profile.png`,
        jobTitle: "Machine Learning & Computer Vision Engineer",
        description: t("description"),
        email: `mailto:${profile.email}`,
        sameAs: Object.values(profile.links),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: profile.name,
        url: siteUrl,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Web />
      <Experience />
      <Contact />
    </>
  );
}
