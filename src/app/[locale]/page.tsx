import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Web } from "@/components/sections/Web";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
