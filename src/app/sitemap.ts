import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { featuredProjects, siteUrl } from "@/content/data";

const languages = (path: string) =>
  Object.fromEntries(
    routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
  );

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    { path: "", priority: 1 },
    ...featuredProjects.map((p) => ({
      path: `/projects/${p.slug}`,
      priority: 0.7,
    })),
  ];

  return paths.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languages(path) },
    })),
  );
}
