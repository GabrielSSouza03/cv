# DESIGN

## 1. Concept — "Engineering journal"

The site reads like one issue of a well-set technical publication: a masthead, numbered
sections, a left rail of mono metadata, generous margins, hairline rules, and one confident
serif headline. Orange behaves like an editor's red pen — it marks, it never decorates.

Three voices, one per typeface:

- **Serif** — the editorial voice. Headline, section titles, the contact call.
- **Sans** — the reading voice. Body copy, navigation, buttons.
- **Mono** — the engineering voice. Dates, section numbers, labels, stack lists, locale codes.

## 2. Typography

| Role | Font | Use |
| --- | --- | --- |
| Display serif | **Instrument Serif** (400, 400 italic) | Hero headline, section headings, contact. |
| Sans | **Geist** (variable) | Body, nav, buttons. |
| Mono | **Geist Mono** (variable) | Metadata, dates, labels. |

All via `next/font/google` (self-hosted, no layout shift, `latin` + `latin-ext`).
Instrument Serif is a single display weight — it is used only at large sizes, where it shines.

Fluid type scale (`clamp`, 320 → 1440 px):

| Token | Size | Font |
| --- | --- | --- |
| `display` | 3rem → 7.5rem, leading 0.95, tracking -0.02em | Serif |
| `h2` | 2.25rem → 4rem, leading 1.0 | Serif |
| `h3` | 1.25rem → 1.5rem | Sans 500 |
| `body-lg` | 1.125rem → 1.375rem, leading 1.5 | Sans 400 |
| `body` | 1rem → 1.0625rem, leading 1.6 | Sans 400 |
| `meta` | 0.75rem → 0.8125rem, uppercase, tracking 0.08em | Mono |

Reading measure capped at ~68ch.

## 3. Color

| Token | Value | Use | Contrast on white |
| --- | --- | --- | --- |
| `paper` | `#FFFFFF` | Background | — |
| `paper-2` | `#F6F5F1` | Rare tinted bands (contact) | — |
| `ink` | `#0B0B0B` | Text, rules, primary button | 19.6:1 |
| `ink-muted` | `#55534E` | Secondary text, meta | 7.5:1 |
| `rule` | `#E4E2DC` | Hairlines, borders | decorative |
| `accent` | `#F25A0D` | Dots, markers, underlines, focus ring, large serif glyphs | 3.3:1 (non-text / large only) |
| `accent-ink` | `#C2410C` | Orange **text** at body sizes, link hover | 5.2:1 |

Rules: orange never fills large areas; never more than one orange element per viewport
"cluster"; no gradients, glows, or shadows (one exception: none).

## 4. Grid and spacing

- 12-column grid, max width 1320 px, gutters 24 px (mobile 20 px side padding).
- Desktop section layout: **rail** (cols 1–3: section number + mono label, sticky) and
  **body** (cols 4–12). Mobile: rail collapses into a single mono line above the heading.
- Spacing scale on 4 px base; section padding `clamp(5rem, 10vw, 9rem)` vertical.
- Every section opens with a full-width 1 px `ink` rule — the page's rhythm.

## 5. Monogram

- Typographic `GS` built as SVG paths (no font dependency at runtime): a high-contrast serif
  **G** (from the editorial voice) locked tightly to a geometric sans **S**, followed by an
  orange square full-stop — `GS.` — the only colored element.
- Variants: `full` (header, footer, 24–48 px tall), `mark` (favicon 16/32 px: G + S only,
  dot enlarged for legibility), `outline` frame optional for the OG image later.
- Ink-on-paper only. Rendered as inline SVG with `role="img"` and `aria-label="Gabriel Simões"`.
- Phase 2 delivers 2–3 monogram sketches for you to pick from before finalizing.

## 6. Section design

**Header (masthead).** Sticky, white, 1 px bottom rule appears after scroll.
Left: monogram. Center/left: nav (sans, 15 px) with an orange dot marking the active section.
Right: language switch `PT / EN` (mono, current locale in ink, other muted) and an outlined
"CV ↓" link. Mobile: monogram + `PT/EN` + menu button → full-screen sheet with large serif nav
links and the CV action.

**Hero.** Top: mono line — `Backend Software Engineer — Santa Rita do Sapucaí, MG · Open to remote work`.
Name in sans 500 at h3 size. Headline in the serif display, spanning ~10 columns, broken by
intent ("Turning complex problems / into scalable software.") with the closing period in orange.
Below, an asymmetric split: short intro paragraph (cols 4–9) and the two actions
(primary: "Get in touch" solid ink → orange on hover; secondary: "Download CV" text link
with arrow). Bottom of hero: a thin mono "spec strip" — `NODE.JS · TYPESCRIPT · NESTJS ·
POSTGRESQL` — the only stack mention above the fold. No badges, no illustration.

**01 About.** Lead paragraph at `body-lg`, two short paragraphs,
then a mono "Focus" list (APIs · Integrations · Business systems · Software quality).

**02 Experience — "ledger timeline".** One block per organization. Desktop: dates in the rail
(mono), roles in the body. A single vertical hairline connects the Inatel roles as a title
progression (Specialist → Analyst II → Dev Intern → QA Intern), each step a small square node;
the current role's node is orange. Each role: title (h3), period + duration (mono),
summary, highlights as hairline-separated lines (not bullets-in-cards), stack as a mono
inline list. Mobile: dates move above titles; line stays at the left edge.

**03 Skills — "index".** No cards, no bars. Each category is a row: mono label in the rail,
technologies set as a large sans inline list separated by thin slashes, and a one-line
note tying it to experience (e.g. Quality → "Two years of web and mobile test automation").

**04 Education.** One entry, typeset like a citation: institution (serif), degree, completion
date (mono).

**05 Contact.** Tinted `paper-2` band. Serif `h2` "Let's build something reliable." Email set
very large as the primary link (underline grows in orange on hover), LinkedIn and GitHub
as secondary mono links with external-arrow icons, CV link repeated.

**Footer.** Monogram, name, title, links, `© {year} Gabriel Simões`. One row on desktop,
stacked on mobile.

## 7. Motion

- Section entrance: opacity 0 → 1 and translateY 12 px → 0, 500 ms, `cubic-bezier(.2,.7,.2,1)`,
  once per element, staggered 60 ms for list items.
- Hero headline: lines rise in sequence on first load (CSS only, no JS).
- Hover: underline width 0 → 100 % in orange (200 ms); buttons invert colors.
- Active nav dot slides between items.
- `prefers-reduced-motion: reduce` → all transitions/animations off, smooth scroll off,
  content fully visible without JS.

## 8. Accessibility

- Skip link "Skip to content" as first focusable element.
- Focus ring: 2 px solid `accent` + 2 px offset, on every interactive element.
- Heading order: one `h1` (headline), `h2` per section, `h3` per role / skill group.
- Landmarks: `header`, `nav` (labeled), `main`, `footer`.
- Language switch: `hreflang` + `lang` on each option, `aria-current` on the active locale.
- External links: visible arrow icon + visually hidden "(opens in new tab)" text.
- Tap targets ≥ 44 × 44 px on mobile.

## 9. Responsive breakpoints

| Range | Layout |
| --- | --- |
| < 640 px | Single column, menu sheet, display type ~3rem, rail inline. |
| 640–1023 px | Single column with wider measure, nav still in sheet, timeline with dates above. |
| ≥ 1024 px | Full rail + body grid, inline nav, sticky rail labels. |
| ≥ 1536 px | Grid capped at 1320 px, larger display size, margins grow. |

Hard rule: no horizontal overflow at 320 px.

## 10. Anti-patterns (explicitly avoided)

Rounded card grids, dashboard tiles, glassmorphism, gradients, glow, tech-logo walls,
skill bars or percentages, emoji, stock or AI illustrations, typewriter effects,
cursor followers, particle backgrounds.
