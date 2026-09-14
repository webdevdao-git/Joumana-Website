# Joumana Saad — project detail

Current state of the build, verified against the running site, not written from
memory.

---

## 1. What this is

A five page marketing site for Joumana Saad, an American freelance journalist,
editor, content specialist and bilingual master of ceremonies based in Dubai.

It replaces a 2019 WordPress site built on the Avada theme, which was a single
page with anchors plus a blog with one post.

Every page is prerendered to static HTML at build time. There is no backend, no
database and no CMS.

---

## 2. Stack

| | Version | Why |
|---|---|---|
| Next.js | 16.3.4 | App Router, static export of all routes, image optimisation |
| React | 19.2.8 | |
| TypeScript | 5.x | |
| Tailwind CSS | 4.x | Design tokens live in CSS, not a JS config |
| motion | 13.2.0 | Scroll reveals, the pinned reel, accordion height |
| lenis | 1.3.26 | Inertial scrolling |
| ESLint | 9 | `eslint-config-next`, passes with `--max-warnings 0` |

Build tooling used during development but not shipped:

- **ffmpeg** — all video encoding
- **potrace** — tracing the logo from raster to vector
- **Pillow (Python)** — reframing the hero photography
- **Playwright** — screenshotting and measuring every change

---

## 3. File map

4,072 lines of source across 33 files.

```
src/lib/content.ts             583   every word on the site
src/app/globals.css            429   the entire design system
src/components/reveal.tsx      185   motion primitives
src/components/site-header.tsx 177   split nav, mobile overlay
src/app/work/page.tsx          174
src/app/about/page.tsx         167
src/components/contact-form.tsx 156
src/components/logo.tsx        155   traced vector paths
src/app/page.tsx               154   home, wires the sections together
src/components/flow-field.tsx  144   the animated canvas
src/components/schema.tsx      142   JSON-LD
src/components/interview-reel.tsx 133
src/app/contact/page.tsx       126
src/app/services/page.tsx      125
src/components/hero.tsx        123
src/app/layout.tsx             120
src/components/video-reel.tsx  111
src/components/ui.tsx          107   PageHero, SectionHead, TextLink
src/components/service-list.tsx 107   hover reveal list (not currently on home)
src/components/site-footer.tsx  89
src/components/on-air.tsx        77
src/components/process-accordion.tsx 65
src/components/stage-index.tsx   53
src/components/practice-grid.tsx 53
src/components/case-study.tsx    49
src/components/smooth-scroll.tsx 48
src/components/outlet-band.tsx   45
src/app/template.tsx             37   route transition
src/components/arrow-cta.tsx     33
src/app/not-found.tsx            29
src/components/intro-curtain.tsx 26
src/app/sitemap.ts               21
src/components/name-mark.tsx     19
src/app/robots.ts                10
```

---

## 4. Content system

All copy is in one file, `src/lib/content.ts`, as 22 typed exports:

```
site          nav            heroSlides     heroCopy
outlets       featuredOutlets stats         homeStatement
introCopy     services       process        interviews
experience    clips          broadcast      caseStudy
reels         reelCopy       hosting        aboutCopy
contactCopy   faqs
```

**To change any text on the site, edit that file.** Nothing else needs touching.

The copy was rewritten in 2026 from a CV last updated in 2019.

---

## 5. Brand

### Colours

Brand kit 04 from the sheet the client supplied. Four values:

```css
--brand:  #11120D   /* near black with an olive cast — the canvas */
--olive:  #565448   /* warm mid tone — meta text */
--sand:   #D8D0BD   /* light neutral — kickers, inverted panels */
--paper:  #FFFAF4   /* off white — type */
```

Everything else is derived with `color-mix`, so there is no fifth value:

```css
--ink-soft: color-mix(in srgb, var(--paper) 62%, var(--brand));
--line:     color-mix(in srgb, var(--sand) 22%, var(--brand));
--raise:    color-mix(in srgb, var(--olive) 28%, var(--brand));
```

The site runs dark. Two sections invert to sand for contrast.

### Type

**Archivo**, self hosted through `next/font`, weights 400 to 700. Headings are
800 weight, uppercase, with leading tighter than the font size. Body is 500.

Cormorant is also loaded, used only for the logo lineage.

Nothing on the site has a border radius.

### Logo

`src/components/logo.tsx`. A JS monogram with the name beneath it.

The brand sheet arrived as a flattened raster inside a PDF with no vector in it.
The four pages were extracted at their native 4960×7362, the monogram and the
name were isolated, and both were traced with potrace. The result is real vector
paths, no font or image dependency.

Declared once as `<symbol>` elements by `LogoSprite` in the root layout, pulled
in with `<use>` elsewhere. Paints with `currentColor`.

Two variants: `mark` (monogram only, used in the header, because at header
height the name underneath would be about four pixels tall) and `lockup` (the
full thing, used in the footer).

---

## 6. The home page, section by section

Each section runs on a different mechanic. That was deliberate, to stop the page
reading as one long column of text.

| # | Section | Mechanic |
|---|---|---|
| 1 | Hero | Split. Copy left, vertical video panel right, playing muted and looping. Parallax on scroll. |
| 2 | Published and broadcast with | Bordered four column grid of outlet names |
| 3 | Statement + figures | One sentence, three figures that count up, animated canvas behind |
| 4 | Watch her present | Six vertical clips, click to play with sound, one at a time |
| 5 | The practice | Sand panel, bordered four card grid |
| 6 | How it runs | Accordion, one row open at a time, animated height |
| 7 | On the record | Pinned portrait, interview names pass through as you scroll |
| 8 | Selected engagement | Three columns and a full width monochrome frame |
| 9 | On air | Her radio clips, drawn waveform, play affordance |
| 10 | Selected work | Horizontal rail you push sideways |
| 11 | On stage | Numbered index, monochrome photography |
| 12 | Begin a conversation | Full block, giant arrow, inverts on hover |
| 13 | Name mark | The name set across the full page width |

---

## 7. Motion

- **Lenis smooth scrolling.** Touch pointers and reduced motion get native
  scrolling. Rendered as a sibling, not a wrapper, so the tree is not remounted
  when the media query resolves.
- **Intro curtain** on the first visit of a session. Server rendered, animated
  in CSS, so it paints on the first frame and clears itself even without JS.
- **Route transitions** via `src/app/template.tsx`, suppressed on first paint so
  the hero is never hidden while the page is being measured.
- **Flow field** — an animated canvas of drifting lines. Capped at 30fps, pauses
  when it scrolls off screen, never starts under reduced motion.
- **ImageReveal** — the frame opens from the bottom while the picture settles
  back from an overscale.
- Parallax, count ups, the pinned reel, the accordion.

Every one of these has a reduced motion path. Turn the setting on and the site
goes completely still without losing content.

### Two traps that already cost time here

1. **`ImageReveal` must observe an unclipped wrapper.** Watching the clipped
   element does not work: while the clip is closed its visible box has no area,
   so the browser never reports it on screen and the frame stays shut forever.
   This showed up as photographs that revealed on desktop and stayed blank on a
   phone.

2. **`last:` variants match `:last-child`.** If each `<a>` is the only child of
   its `<li>`, every one counts as last and all the separators switch off. The
   variant belongs on the `<li>`.

---

## 8. Media pipeline

### Video

Six clips supplied, all 1080×1920 vertical with audio, 26 to 64 seconds,
550 MB raw. The design was built around the vertical shape rather than cropping
them into a widescreen frame they never were.

Encoded with ffmpeg to 720×1280, CRF 30, AAC 96k, faststart. 15 files on disk
totalling 26 MB, each with a poster frame.

The hero loop is separate: 900×1600, CRF 22, no audio track at all, cut from the
highest bitrate source (20 Mbps). Served as WebM with an MP4 fallback.

Reels use `preload="none"`, so nothing downloads until you press play.

### Photography

Only three usable portraits survived from the old site, all centred studio shots
on a cold grey backdrop, plus four event photographs that are 460 pixels wide.

`scripts/prepare-hero-images.py` reframes the portraits: it scales the subject,
slides her right so copy has room on the left, and rebuilds the studio backdrop
either side from a sliver of empty backdrop in the same frame. Run it from the
repo root after new photography arrives and edit the `JOBS` table at the top.

Event photography runs monochrome, which pulls four pictures shot years apart on
different cameras into one set.

---

## 9. SEO

Verified against the running build:

| Page | H1 | JSON-LD blocks | Description |
|---|---|---|---|
| `/` | 1 | 2 | 214 chars |
| `/about` | 1 | 4 | 211 chars |
| `/services` | 1 | 4 | 194 chars |
| `/work` | 1 | 4 | 214 chars |
| `/contact` | 1 | 6 | 173 chars |

- Unique title, description and canonical per page
- `Person`, `WebSite`, `ProfessionalService` sitewide; `BreadcrumbList` on inner
  pages; `FAQPage` on contact
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and
  `robots.ts`
- Open Graph and Twitter cards
- Images served as AVIF and WebP through `next/image`

**Before launch:** set the real domain in `site.url` in `src/lib/content.ts`.
Canonicals, sitemap and schema all read from that one value.

---

## 10. Performance

Measured on the production build:

```
LCP                  116 ms
Initial page weight  4.38 MB
  video/webm         2,889 KB   the hero loop
  javascript           692 KB
  image/jpeg           483 KB
  RSC payload          156 KB
  html                 145 KB
  fonts                 69 KB
```

**The hero video is the page weight.** It was 443 KB until the sharpness
complaint, and going from 640px/CRF 33 to 900px/CRF 22 to fix that took it to
2.9 MB. That is a real tradeoff, not an oversight.

If the weight matters more than the sharpness, three options:

1. CRF 26 instead of 22 — roughly halves it, still far sharper than the original
2. Shorten the loop from 14 seconds to 8
3. Show the poster frame first and swap in the video after the page settles

---

## 11. What needs confirming before launch

- **Reel titles.** Taken from the file names supplied: Reality Check, Asset or
  Burden, The Summer Nightmare, Arabic segment, On set, On location. Nobody has
  checked these are what she calls them.
- **Nineteen years.** Counted from the Forbes role starting 2007.
- **Current roles.** Arabian Radio Network, Dubai Chamber and the freelance
  contributor entries are all marked current, carried over from the old site.
- **Commercial terms.** Two revision rounds included, replies within one working
  day, fixed project fees, day rates for hosting, rate card on request. These
  read well and are normal for the market, but they were written here, not taken
  from the CV.
- **FAQ answers** on travel, Arabic hosting and ghost writing follow the same
  logic.
- **Email.** Still the gmail address from the old site.
- **The case study third column.** The comp this was modelled on has an OUTCOME
  column. Ours says "On air" instead, because her CV lists responsibilities, not
  results. If she has real figures, that column can become a proper outcome.

---

## 12. Contact form

`src/components/contact-form.tsx` composes a formatted email and hands it to the
visitor's mail client. That is a placeholder the client has not decided on yet.

To move it to a real endpoint, replace the body of `handleSubmit` with a POST to
Formspree, Getform or a Next.js route handler. The field names are already
shaped for that.

---

## 13. What was tried and rejected

Worth knowing so nobody walks back into it:

1. **Editorial serif.** Instrument Serif display type, warm off white
   background, mono labels, grain texture. Read as generic and over designed.
2. **Clean light sans.** White background, Archivo, navy accent, modest 46px
   headings, bordered cards. Too plain.
3. **Monochrome brand kit 01**, then **oxblood kit 02**. Landed on kit 04.
4. **Long form copy on the home page.** Nine paragraphs. Too much text and every
   section looked identical. The biography moved to `/about` and the home page
   now carries one sentence.
5. **Hover reveal service list.** Still in the repo at
   `src/components/service-list.tsx`, replaced on the home page by the bordered
   practice grid. Can be brought back.

---

## 14. Deferred

Things declined during the build, and why:

- **Stock imagery or other people's photos** presented as her work
- **Publication logo files** (Forbes, BBC and so on) — outlet names she has
  genuinely worked for are set in type instead, which is a statement of fact
- **Fabricated testimonials** — she is a journalist, her value is that she is
  trusted
- **Pixel for pixel copies** of the reference sites and design comps supplied.
  The structural language was taken; the authored specifics were not.

---

## 15. Run and deploy

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm start
```

Push to a Git host and import into Vercel. No environment variables needed.
Point the domain at Vercel and set `site.url` to match.
