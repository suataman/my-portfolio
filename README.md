# Umut Şuataman: Portfolio

Personal portfolio site, bilingual (English / Turkish), built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **next-intl**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en
npm run build    # production build
npm run lint
```

## Where things live

| What | Where |
|---|---|
| Projects, experience, skills (EN + TR) | `src/content/data.ts` |
| UI text (EN / TR) | `messages/en.json`, `messages/tr.json` |
| Page sections | `src/components/sections/` |
| Project detail page | `src/app/[locale]/projects/[slug]/page.tsx` |
| Colours & fonts | `src/app/globals.css`, `src/app/[locale]/layout.tsx` |
| CVs, photos, certificate | `public/` |

To add a project, append an entry to `featuredProjects` (or `otherProjects`) in `src/content/data.ts`. GitHub star counts are fetched automatically.
