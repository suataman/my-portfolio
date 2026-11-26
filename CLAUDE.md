@AGENTS.md

# my_portfolio — project memory

Bilingual (EN/TR) personal portfolio. **Read this file instead of re-scanning the codebase.** Open specific files only when a task needs them.

## Stack
- Next.js 16.4.6 (App Router, `src/`), React 19.3, TypeScript strict, alias `@/*` → `src/*`
- next-intl 4 · Tailwind v4 (CSS-first, **no tailwind.config**) · framer-motion · lucide-react
- No test framework. Commands: `npm run dev` · `npm run build` · `npm run lint`

## Map
| Path | Purpose |
|---|---|
| `src/app/[locale]/layout.tsx` | Root `<html>`, fonts, theme script, Providers, Navbar/Footer, metadata (no `app/layout.tsx` outside `[locale]`) |
| `src/app/[locale]/page.tsx` | Home: Hero → About → Projects → Skills → Web → Experience → Contact |
| `src/app/[locale]/projects/[slug]/page.tsx` | Project detail, static from `featuredProjects`, `dynamicParams = false` |
| `src/app/[locale]/[...rest]/page.tsx`, `not-found.tsx` | Catch-all → localized 404 |
| `src/components/sections/*` | One component per home section + shared `Section` wrapper |
| `src/components/*` | Navbar, Footer, CopyEmail, Pipeline, Viewfinder, icons, Providers (MotionConfig `reducedMotion="user"`) |
| `src/content/data.ts` | **All portfolio content**: `profile`, `featuredProjects`, `otherProjects`, `experience`, `skillGroups`, `education`, `certificates` |
| `src/lib/github.ts` | `getRepoStars()` (GitHub API, 1h revalidate, `{}` on failure), `repoUrl()` |
| `src/lib/theme.ts` | Pre-paint theme script, `toggleTheme`, `applyStoredTheme` |
| `src/i18n/{routing,request,navigation}.ts` | next-intl setup |
| `src/app/robots.ts`, `src/app/sitemap.ts` | SEO: robots.txt + sitemap (home + featured projects × locales, hreflang). Proxy matcher skips dotted paths |
| `src/proxy.ts` | Middleware (Next 16 name — **not** `middleware.ts`) |
| `messages/{en,tr}.json` | UI strings (namespaces: meta, nav, hero, about, …) |
| `public/` | `cv/` (2 PDFs: ML, Web), `images/` (profile, avatar, `projects/`), `certificates/` |

## i18n rules
- Locales `en` (default) and `tr`; `/` → `/en`. `localeDetection: false` (always English first; no Accept-Language redirect).
- Theme init script is a plain `<script dangerouslySetInnerHTML>` in `<head>` of the layout (not `next/script` — that triggers a React 19 "script tag" console error).
- **UI strings** → `messages/en.json` + `messages/tr.json` (always both).
- **Content strings** → `data.ts` as `L = { en, tr }`, read via `pick(value, locale)`.
- Links/navigation: import from `@/i18n/navigation`, never `next/link`.
- Pages call `setRequestLocale(locale)`; layout uses `generateStaticParams` + `hasLocale`.

## How to
- **Add a project**: append to `featuredProjects` (also creates a detail page) or `otherProjects` in `src/content/data.ts`. Required: `slug, title, summary, context, tags, overview, highlights, pipeline`. Optional: `repo, image{src,alt,width,height}, metrics, links, note`. Images → `public/images/projects/`.
- **Add a certificate**: image → `public/certificates/`, append to `certificates` in `data.ts` (newest first). Fields: `id, title{en,tr}, issuer`, optional `date, image{src,width,height}, url` (verification link). Rendered as a list in `sections/Experience.tsx`; heading pluralizes automatically.
- **New section**: component in `src/components/sections/`, wrap in `Section`, add to `[locale]/page.tsx`, strings in both message files.

## Styling
- "Phosphor" green HUD theme. Colors = CSS vars in `src/app/globals.css` (`:root` light, `.dark`), mapped in `@theme inline` to tokens `bg, surface, line, fg, muted, accent, accent-ink, hud`. Use tokens, not raw colors.
- Dark mode: `.dark` class on `<html>`, default dark, persisted in `localStorage.theme`. `@custom-variant dark`.
- Fonts: Archivo (`--font-sans`), JetBrains Mono (`--font-mono`) via `next/font`.

## Deployment
- Live at **https://umutsuataman.dev** (Vercel project `my-portfolio`, Hobby). Every push to `main` auto-deploys.
- Domain registered at **Cloudflare Registrar** (auto-renew on). DNS at Cloudflare: `@` and `www` CNAME → Vercel target, proxy **off** (DNS only — orange cloud breaks Vercel SSL).
- Email anti-spoofing (domain sends no mail): TXT `@` = `v=spf1 -all`, TXT `_dmarc` = `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s`. If email is ever set up on this domain, update both first.
- `www.umutsuataman.dev` → 308 redirect to apex (set in Vercel → Settings → Domains).
- Domain lives in one constant: `siteUrl` in `src/content/data.ts` (metadataBase, sitemap, robots, JSON-LD). Change only that if the domain changes.

## SEO
- Layout metadata: canonical `/<locale>`, hreflang en/tr/x-default, OG + twitter card, keywords incl. "Suataman" (no Ş).
- Project pages set their own canonical/hreflang/OG (child `alternates` replaces layout's, not merged).
- Home page renders JSON-LD `@graph` (Person + WebSite, `sameAs` = `profile.links`) via native `<script type="application/ld+json">`.
- Search Console: domain property `sc-domain:umutsuataman.dev` verified (TXT `google-site-verification=…` at Cloudflare — keep it). Sitemap submitted 2026-11-26; indexing requested for `/en` and `/tr`. One sitemap covers both locales.
- Site linked from GitHub profile + LinkedIn Website field; launch post shared on LinkedIn (2026-11-26).

## Workflow notes
- `git push origin main` from Claude is blocked by the auto-mode classifier → commit locally, then ask the user to run `! git push origin main`.
- Dev server check: if you start `npm run dev` yourself, kill the whole node tree afterwards (TaskStop alone left an orphan on :3000 once).
- User writes Turkish; reply in Turkish.
- Claude in Chrome works with the user's Search Console + LinkedIn sessions. Public posts: draft → user approves text → user (or Claude, on explicit yes) clicks publish. In LinkedIn composer don't press Escape (opens "save draft?" dialog).

## Status / open items
- `CLAUDE.md` stays in the repo (user decided 2026-11-26); commit its updates normally.
- `Co-Authored-By: Claude` trailer stays on commits, past and future (user decided 2026-11-26). No history rewrite.
- Only `uav-detection-tracking` has an image; other 3 featured projects have none.
- No Turkish CV (both PDFs English).

_Last session: 2026-11-26 — SEO (robots, sitemap, canonical/hreflang, JSON-LD), Search Console verified + sitemap submitted, LinkedIn launch post; settled CLAUDE.md-in-repo and Co-Authored-By decisions._

## Session rule
When structure, conventions or the open items above change, **update this file in the same task** so the next session can start without scanning.
