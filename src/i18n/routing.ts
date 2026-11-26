import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  // Always open in English; visitors switch language via the navbar toggle.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
