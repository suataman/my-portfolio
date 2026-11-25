import { getTranslations } from "next-intl/server";
import { profile } from "@/content/data";
import { GithubIcon, LinkedinIcon, MediumIcon } from "./icons";

export async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t("built")}.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export function SocialLinks({ size = "size-5" }: { size?: string }) {
  const items = [
    { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.links.medium, label: "Medium", Icon: MediumIcon },
  ];
  return (
    <ul className="flex items-center gap-1">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-md text-muted hover:text-accent transition-colors"
          >
            <Icon className={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
