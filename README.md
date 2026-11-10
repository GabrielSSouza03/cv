# Gabriel Simões — Portfolio

Personal portfolio of Gabriel Simões, Backend Software Engineer. Static, bilingual (`/pt`, `/en`) site built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Quality checks

```bash
npm run typecheck  # route types + tsc
npm run lint       # ESLint
npm test           # Vitest unit tests
npm run e2e        # Playwright (builds and serves the app on :3200)
npm run check      # typecheck + lint + unit + build
```

Run the e2e suite against a deployed URL with `BASE_URL=https://example.vercel.app npm run e2e`.

## Editing content

All copy lives in `src/content/pt.ts` and `src/content/en.ts`, typed by `src/content/types.ts`. Language-neutral facts (name, email, links, technology names) live in `src/content/shared.ts`. Resumes are static files in `public/documents/`.

Planning and decisions: `PLAN.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CONTENT.md`.
