# PLAN — Gabriel Simões Portfolio

Status: **Phases 1–4 complete. Phase 5 (deployment) in progress.**

## 1. Product

A bilingual (`/pt`, `/en`), single-page, static portfolio for Gabriel Simões, positioned as a
**Backend Software Engineer**. Its single job: let a recruiter understand, in under a minute,
who Gabriel is, what he builds, where he has worked, and how to contact him or download his CV.

Success criteria:

- A recruiter can identify name, positioning, current role, and stack from the first viewport.
- Every fact on the page traces back to a verified source (see `CONTENT.md`).
- Contact (email, LinkedIn, GitHub) and CV download are reachable in one click from any section.
- Lighthouse-level quality: fast, accessible, no layout shift, minimal client JavaScript.

## 2. Scope

In scope (v1):

- Homepage sections: Header, Hero, About, Experience, Skills, Education, Contact, Footer.
- Portuguese and English routes with equivalent content and section-preserving language switch.
- Root `/` redirects by browser language (`pt*` → `/pt`, otherwise `/en`).
- Static PDF resume download per locale.
- `GS` monogram (SVG) used in header, footer, and favicon.
- Automated tests, CI on GitHub Actions, deploy on Vercel (default `*.vercel.app` domain).

Out of scope (v1):

- Projects / case studies (architecture leaves room — see `ARCHITECTURE.md` §8).
- Contact form, backend, database, CMS, auth, analytics.
- Dark mode (light only, by decision).
- Certifications, CNPq research, pre-2024 non-engineering experience.
- Advanced SEO (basic metadata, `lang`, `hreflang` alternates only).
- Phone number on the website.

## 3. Environment findings (Phase 1 inspection)

| Item | Finding |
| --- | --- |
| Project | No existing portfolio. Created `~/dev/gabriel-portfolio`, `git init -b main`, no commits. |
| Node | `v20.20.0` (nvm). Next.js 16 requires `>=20.9` — OK. |
| npm | `10.8.2` — **will be used**. |
| pnpm | Broken via corepack (pnpm 11 fails on Node 20). Not used. |
| git | `2.43.0` |
| `gh` CLI | Not installed. |
| `vercel` CLI | Not installed. Not required (Vercel dashboard GitHub import works). |
| Resume PT | `~/Downloads/Gabriel Simões - CV.pdf` (Portuguese). |
| Resume EN | `~/Downloads/Gabriel Simões - Resume.pdf` (English). |
| LinkedIn export | `~/Downloads/Profile (1).pdf` (latest, used as source of truth for roles/dates). |

Resume PDF issues (**deploy blocker**): both contain stray text "Aprovado para próxima fase";
EN has typo "Analist" and role titles conflicting with LinkedIn; both show the phone number.
Decision: current PDFs used for local development only; corrected PDFs required before deploy.

## 4. Decisions log (from discovery interview)

| # | Decision |
| --- | --- |
| D1 | Project at `~/dev/gabriel-portfolio`. |
| D2 | Role history follows LinkedIn: QA Intern → Dev Intern → Analyst II → Specialist. |
| D3 | Internship split into QA (Sep 2024 – Dec 2025) and Development (Jan – Jul 2026). |
| D4 | Education: INATEL, Computer Engineering, completed **July 2026**. |
| D5 | CNPq research omitted in v1. |
| D6 | Public email: `gabriel.simoes@gec.inatel.br`. |
| D7 | Corrected PDFs supplied before deploy. |
| D8 | Verified extra skills: Odoo ERP, React Native, Swagger, Jira, Microservices. **Not verified / excluded:** Redis, Docker Compose, MariaDB. |
| D9 | CV bullets for current role → Specialist; LinkedIn line → Analyst II. |
| D10 | "Backend Software Engineer" is positioning; experience shows real titles. |
| D11 | `/` → Accept-Language detection. |
| D12 | Light theme only. |
| D13 | Show "Santa Rita do Sapucaí, MG · Open to remote work". |
| D14 | Certifications omitted in v1. |
| D15 | PT headline: "Transformando problemas complexos em software escalável." |
| D16 | No Framer Motion: CSS transitions + one small IntersectionObserver hook cover the brief. |
| D17 | No photo in v1 (typographic identity carries the design). |

## 5. Implementation phases

### Phase 2 — Foundation and visual structure
1. Scaffold Next.js (App Router, TS strict, Tailwind v4, ESLint) with `npm`.
2. Design tokens in `globals.css` (`@theme`), fonts via `next/font`.
3. `[locale]` routing, `proxy.ts` root redirect, typed content files.
4. `Monogram` SVG + favicon.
5. Layout shell: Header (nav, language switch, CV), section scaffold, Footer.
6. Hero implemented for real.
7. **Checkpoint:** screenshots at 375 / 768 / 1280 / 1920 px for approval.

### Phase 3 — Sections (one at a time, validate after each)
About → Experience → Skills → Education → Contact → Footer polish → motion pass.
Per section: typecheck, lint, unit tests, e2e for that section, responsive screenshots,
keyboard + axe check, short report.

### Phase 4 — QA
`npm run typecheck && npm run lint && npm test && npm run build && npm run e2e`,
axe across both locales, reduced-motion check, overflow check at 320 px,
link verification, content accuracy pass against `CONTENT.md`.

### Phase 5 — Deployment
1. Install corrected PDFs.
2. Create GitHub repo (user's account), push `main`.
3. GitHub Actions CI (typecheck, lint, unit, build, e2e).
4. Import repo in Vercel, production branch `main`.
5. Verify live URL: both locales render, `/` redirect, PDFs download (HTTP 200,
   `application/pdf`), Playwright smoke suite against production URL.

## 6. Testing strategy (summary — details in `ARCHITECTURE.md` §9)

- **Vitest + Testing Library:** content parity (pt/en same shape and ids), locale helpers,
  link builders, components that render content.
- **Playwright:** both homepages render, nav anchors scroll to sections, language switch
  preserves section hash, `/` redirect by `Accept-Language`, CV links return PDFs,
  external links have correct `href`, no horizontal overflow on mobile, axe scan.

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| Inaccurate content (titles/dates disagree across sources) | `CONTENT.md` is the single verified source; open items listed; nothing ships unconfirmed. |
| Published PDFs contain stray text / phone | Deploy gate on corrected PDFs. |
| Institutional email stops working if employment changes | Email lives in one content constant; trivial swap. |
| Orange accent fails text contrast on white | Two accent tokens: decorative orange, darker text orange (≥ 4.5:1). |
| LinkedIn URL contains `õ` | Use percent-encoded URL, verified by e2e/manual check. |
| `gh`/`vercel` CLIs missing | Web-based flow, or user installs `gh`; no secrets in repo. |
| Copyright year staleness on static build | Page uses `revalidate = 86400`. |
