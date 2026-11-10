# ARCHITECTURE

## 1. Principles

- Static first. Every page is prerendered at build time. No backend, no database.
- Server Components by default. Client Components only for: active-section tracking +
  language switch, mobile menu, reveal-on-scroll.
- Content separate from presentation. Components receive typed content; they never hold copy.
- One set of components for both languages.
- Few dependencies. Each one must justify its bytes.

## 2. Stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Latest stable at scaffold time. |
| Language | TypeScript, `strict: true`, `noUncheckedIndexedAccess: true` | No `any`. |
| Styling | Tailwind CSS v4 | CSS-first config via `@theme` in `globals.css`. |
| Fonts | `next/font/google` | Self-hosted at build, `display: swap`, subsets `latin` + `latin-ext` (ã, õ, ç). |
| Icons | `lucide-react` | Tree-shaken, imported per icon. |
| Motion | CSS + IntersectionObserver | Framer Motion not needed (D16). |
| Lint | ESLint (`eslint-config-next`) + Prettier | |
| Unit tests | Vitest + @testing-library/react + jsdom | |
| E2E | Playwright + @axe-core/playwright | Chromium + mobile (Pixel 7) projects. |
| Package manager | npm | pnpm broken locally. |
| Hosting | Vercel | Git integration, `main` → production. |

## 3. Directory structure

```
gabriel-portfolio/
├─ public/
│  └─ documents/
│     ├─ cv-pt.pdf
│     └─ cv-en.pdf
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx        # root layout: <html lang>, fonts, metadata per locale
│  │  │  ├─ page.tsx          # composes homepage sections
│  │  │  └─ not-found.tsx
│  │  ├─ icon.svg             # GS favicon
│  │  └─ globals.css          # Tailwind + design tokens
│  ├─ proxy.ts                # "/" → /pt or /en by Accept-Language (Next 16 middleware)
│  ├─ components/
│  │  ├─ brand/Monogram.tsx
│  │  ├─ layout/Header.tsx
│  │  ├─ layout/Nav.tsx                (client: active section)
│  │  ├─ layout/LanguageSwitch.tsx     (client: preserves #hash)
│  │  ├─ layout/MobileMenu.tsx         (client)
│  │  ├─ layout/Footer.tsx
│  │  ├─ sections/Hero.tsx
│  │  ├─ sections/About.tsx
│  │  ├─ sections/Experience.tsx
│  │  ├─ sections/Skills.tsx
│  │  ├─ sections/Education.tsx
│  │  ├─ sections/Contact.tsx
│  │  └─ ui/
│  │     ├─ Section.tsx        # numbered section shell (id, index, label, heading)
│  │     ├─ ButtonLink.tsx     # primary / secondary link-buttons
│  │     ├─ TextLink.tsx       # underlined inline/external link
│  │     ├─ ResumeLink.tsx     # locale-aware PDF download
│  │     └─ TechList.tsx       # inline lists with trailing slash separators
│  ├─ content/
│  │  ├─ types.ts              # Content type — the contract both locales satisfy
│  │  ├─ shared.ts             # language-neutral facts: name, links, email, tech names
│  │  ├─ pt.ts
│  │  ├─ en.ts
│  │  └─ index.ts              # getContent(locale)
│  ├─ i18n/
│  │  └─ config.ts             # locales, defaultLocale, isLocale(), alternate paths
│  └─ lib/
│     └─ useActiveSection.ts   # IntersectionObserver hook
├─ tests/
│  ├─ unit/                    # Vitest
│  └─ e2e/                     # Playwright
├─ .github/workflows/ci.yml
├─ PLAN.md · ARCHITECTURE.md · DESIGN.md · CONTENT.md
└─ package.json · tsconfig.json · next.config.ts · eslint.config.mjs
   vitest.config.ts · playwright.config.ts · .nvmrc
```

## 4. Routing and rendering

- `src/app/[locale]/layout.tsx` is the root layout (no `app/layout.tsx`), so `<html lang>` is
  correct per locale (`pt-BR`, `en`).
- `generateStaticParams` returns `[{locale:'pt'},{locale:'en'}]`; `dynamicParams = false`
  so any other segment 404s.
- `page.tsx` exports `revalidate = 86400` so the footer year refreshes without a redeploy.
- `generateMetadata` per locale: title, description, `alternates.languages`
  (`pt-BR` → `/pt`, `en` → `/en`), `openGraph.locale`.
- `proxy.ts` matcher `['/']` only. Reads the **first** language tag of `Accept-Language`:
  `pt*` → `307 /pt`, anything else or missing → `307 /en`. No cookies, no other paths touched.

## 5. Internationalization

- Locales: `pt`, `en`. Locale is a URL segment, never stored client-side.
- `Content` type in `types.ts` forces both files to be structurally identical; a missing
  field is a compile error. A unit test additionally asserts equal list lengths and ids.
- Section ids are language-neutral English slugs shared by both locales:
  `about`, `experience`, `skills`, `education`, `contact`.
- **Language switch:** a plain `<a href="/en#experience">` rendered server-side
  (works with JS disabled). The client part only updates the hash in that `href` as the
  active section changes, so the user lands on the same section in the other language.
- Technology and product names live in `shared.ts`, never translated.
- Dates stored as `{ year, month }` and formatted with `Intl.DateTimeFormat(locale)`, so
  "Sep 2024" / "set. 2024" come from one value. "Present" / "Atual" comes from content.

## 6. Content model (sketch)

```ts
type Locale = 'pt' | 'en';
type YearMonth = { year: number; month: number };

interface Role {
  id: string;
  title: string;
  start: YearMonth;
  end: YearMonth | null;          // null = current
  summary?: string;
  highlights: string[];
  stack: TechId[];
}

interface Organization {
  id: string;
  name: string;
  location: string;
  roles: Role[];                   // newest first; renders as a title progression
}

interface Content {
  meta: { title: string; description: string };
  nav: Record<SectionId, string>;
  hero: { eyebrow: string; title: string; headline: string; intro: string;
          availability: string; ctaContact: string; ctaResume: string };
  about: { heading: string; paragraphs: string[]; focus: string[] };
  experience: { heading: string; present: string; organizations: Organization[] };
  skills: { heading: string; intro: string; groups: { id: string; label: string;
            note: string; items: TechId[] }[] };
  education: { heading: string; items: { institution: string; degree: string;
               completed: YearMonth }[] };
  contact: { heading: string; lead: string; emailLabel: string; links: ... };
  footer: { rights: string };
  resume: { href: `/documents/cv-${Locale}.pdf`; fileName: string; label: string };
}
```

## 7. Client JavaScript budget

Only three small islands: `Nav`/`LanguageSwitch` (shared `useActiveSection`), `MobileMenu`,
`Reveal`. Target: < 10 kB gzipped first-party client JS beyond the Next.js runtime.
Smooth scrolling via CSS `scroll-behavior: smooth` (disabled under reduced motion) plus
`scroll-margin-top` on sections to clear the sticky header.

## 8. Future: projects / case studies

- Add `projects?: Project[]` to `Content` and a `Projects` section between Experience and Skills.
- Case studies at `src/app/[locale]/projects/[slug]/page.tsx` with `generateStaticParams`
  from content. If long-form writing grows, switch that subtree to MDX — not needed now.
- Nav is generated from a section list, so adding a section is a content + component change only.

## 9. Testing

| Layer | Tool | Covers |
| --- | --- | --- |
| Types | `tsc --noEmit` | Content contract, strictness. |
| Lint | ESLint | Next rules, hooks, a11y (`jsx-a11y` via next config). |
| Unit | Vitest | pt/en parity; `getContent`; locale helpers; date formatting; `Section`, `ResumeLink`, `LanguageSwitch` href output. |
| E2E | Playwright | `/pt` and `/en` render h1 + all sections; nav links scroll to targets; language switch keeps `#hash`; `/` redirect with `Accept-Language: pt-BR` and `en-US`; CV links → 200 `application/pdf`; email/LinkedIn/GitHub `href`s exact; no horizontal overflow at 320 px; mobile menu keyboard flow; axe has zero serious/critical violations. |
| Prod smoke | Playwright with `BASE_URL` | Same e2e subset run against the Vercel URL. |

Scripts: `dev`, `build`, `start`, `typecheck`, `lint`, `test`, `e2e`, `check` (all of them).

## 10. CI/CD

- `.github/workflows/ci.yml` on push/PR: `npm ci`, typecheck, lint, unit, build, Playwright.
- Vercel Git integration builds previews for PRs and production for `main`.
- No environment variables required. No secrets in the repository.
- `.nvmrc` = `20`; `engines.node` = `>=20.9`.

## 11. Architecture decisions

| ADR | Decision | Why |
| --- | --- | --- |
| A1 | Hand-rolled i18n (typed files) instead of `next-intl` | Two locales, one page, static copy; a library adds weight and indirection. |
| A2 | `[locale]` as root layout | Correct `<html lang>` without client hacks. |
| A3 | `proxy.ts` only on `/` | Language detection needs request headers; scope kept minimal. |
| A4 | No Framer Motion | Brief needs fades/slides only; CSS does it with zero JS. |
| A5 | Language switch as real `<a>` progressively enhanced | Works without JS, crawlable, accessible. |
| A6 | npm | pnpm is broken in this environment. |
| A7 | `cacheComponents` / `partialPrefetching` disabled (create-next-app 16.4 enables them) | Two fully static pages gain nothing from PPR; disabling keeps the documented `generateStaticParams` + `dynamicParams = false` + `revalidate` model. |
| A8 | Header CV button visible at every width | Resume access in one tap on mobile; it also lives in the menu sheet. |
| A9 | Entrance motion via CSS scroll-driven animations (`animation-timeline: view()`), no `Reveal` component | Zero JavaScript; unsupported browsers and reduced-motion users simply see the content. |
| A10 | Language switch resolves the current section at click time (last section whose top passed the upper third of the viewport) | More reliable than observer state during font or layout shifts; one fewer observer on the client. |
| A11 | Playwright starts its own fresh production server (`exec next start`, no reuse) | Prevents stale builds and orphaned servers sharing `.next`. |
