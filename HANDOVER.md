# Joumana Saad site — handover

Everything below is the current state of the build. Read this before changing
anything, it will save you from redoing decisions that were already made and
rejected.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Next.js 16 (App Router), React 19, TypeScript, Tailwind v4. No backend, no CMS,
no database. All five pages prerender to static HTML.

## Who the site is for

Joumana Saad. American freelance journalist, editor, content specialist and
bilingual master of ceremonies, based in Dubai. Nineteen years: started at
Forbes in New York producing and reporting for their video network, moved to the
Gulf, now covers finance, business and technology. Reports and presents on Dubai
Eye 103.8, writes for Forbes Middle East, The Epoch Times, Arabian Business and
Dubai Chamber. Has interviewed Bill Clinton, Richard Branson, Christiane
Amanpour, George Soros. Also hosts corporate summits and awards ceremonies in
English and Arabic.

Her clients are corporates, government entities and publications in the Gulf.
They hire her because she is credible. That is the whole brand.

## Where things live

```
src/lib/content.ts        every word on the site, in one file
src/app/                  the five pages
src/app/globals.css       the whole design system
src/components/           header, footer, hero, the section mechanics, JSON-LD
public/images/            photography
scripts/                  hero image reframing script
```

**To change copy, edit `src/lib/content.ts`.** Nothing else needs touching.

## Brand

From a brand sheet the client supplied (four kits, kit 02 was chosen).

Exactly two colours. Everything else on the site is one mixed into the other,
using `color-mix`. There is no third hex anywhere and there should not be one.

```css
--brand: #48110c;   /* oxblood, the page background */
--paper: #e8e4db;   /* cream, the type */
```

The site runs dark: oxblood canvas, cream type. Two sections invert to a cream
background for contrast (the credibility band and the closing call to action).

Type is **Archivo**, self hosted via `next/font`. Headings are 800 weight,
uppercase, with leading tighter than the font size. Body is 500 weight. Nothing
on the site has a border radius.

### Logo

`src/components/logo.tsx`. A JS monogram with the name beneath it. The brand
sheet arrived as a flattened raster inside a PDF with no vector in it, so these
outlines were **traced** from the highest resolution frame using potrace. If the
original vector artwork ever turns up, replace the two `<symbol>` elements in
that file and nothing else changes.

Declared once as symbols in the root layout, referenced with `<use>` elsewhere.
Paints with `currentColor`. Two variants: `mark` (monogram only, used in the
header, because at header height the name underneath would be four pixels tall)
and `lockup` (the full thing, used in the footer).

## The section mechanics

The brief was that every section should feel different and carry very little
text. Each one runs on its own idea:

| Section | Mechanic |
|---|---|
| Hero | Three stills cross-dissolve with a slow push, display type at ~144px |
| Published with | Two kinetic marquees running opposite ways, on the cream band |
| Statement | One sentence, three figures that count up |
| Services | Hover a name and its photograph trails the cursor, the rest dim |
| Interview reel | Photograph pins, the names she has interviewed pass through |
| On air | Her real radio clips, drawn waveform, play affordance |
| Selected work | A horizontal rail you push sideways, not a vertical list |
| On stage | Full bleed four up grid, edge to edge, no gutters |

## Motion

- **Lenis** smooth scrolling (`smooth-scroll.tsx`). Touch pointers and reduced
  motion get native scrolling. Rendered as a sibling, not a wrapper, so the tree
  is not remounted when the media query resolves.
- **Intro curtain** on the first visit of a session. Server rendered and animated
  in CSS so it paints on the first frame and clears itself even without JS.
- **Page transitions** via `src/app/template.tsx`, suppressed on first paint so
  the hero is never hidden while the page is being measured.
- Film reveals on photography, parallax, count ups.

Every one of these has a reduced motion path.

### Two traps that already cost time here

1. **`ImageReveal` must observe an unclipped wrapper.** Watching the clipped
   element does not work: while the clip is closed its visible box has no area,
   so the browser never reports it on screen and the frame stays shut forever.
   This showed up as photographs that revealed on desktop and stayed blank on a
   phone.

2. **`last:` variants match `:last-child`.** If each `<a>` is the only child of
   its `<li>`, every one of them counts as last and all your separators switch
   off. The variant belongs on the `<li>`.

## SEO

- Unique title, meta description and canonical per page
- One H1 per page, each carrying a target phrase
- JSON-LD: `Person`, `WebSite`, `ProfessionalService` sitewide,
  `BreadcrumbList` on inner pages, `FAQPage` on contact
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and
  `robots.ts`
- Images served as AVIF and WebP through `next/image`

Set the real domain in `site.url` in `src/lib/content.ts` before launch.
Canonicals, sitemap and schema all read from that one value.

Current: page weight 304 KB, LCP 92ms locally.

## Photography, and the real constraint

**This is the biggest limitation on the site.** Only three usable portraits
survived from the old site, all centred studio shots on a cold grey backdrop,
plus four event photographs that are 460 pixels wide.

What was done about it:

- `scripts/prepare-hero-images.py` reframes the portraits into wide hero frames:
  it scales the subject, slides her right so the copy has room on the left, and
  rebuilds the studio backdrop either side from a sliver of empty backdrop in the
  same frame. Run it from the repo root after new photography arrives; edit the
  `JOBS` table at the top.
- A `.photo-tint` class lays the brand colour over photographs in `color` blend
  mode, which pulls the cold grey backdrop toward the oxblood canvas without
  flattening her into a silhouette. `.photo-bleed` dissolves the edges into the
  page.

**What would improve the site most, in order:**

1. A showreel video for the hero. She is an MC, she should have one.
2. Event and stage photography at full resolution.
3. Client logos, if licensing allows.
4. Real client testimonials with names and companies.

Nothing was invented to fill these gaps. No stock imagery presented as her work,
no fabricated quotes. She is a journalist, her whole value is that she is
trusted, and a fake testimonial on her own site would undo that.

## Contact form

`src/components/contact-form.tsx` composes a formatted email and hands it to the
visitor's mail client. That is a placeholder the client has not decided on yet.
To move it to a real endpoint, replace the body of `handleSubmit` with a POST to
Formspree, Getform or a Next.js route handler. The field names are already
shaped for that.

## Verify before launch

The copy was rewritten in 2026 from a CV last updated in 2019. These were
inferred and should be confirmed with Joumana:

- **Nineteen years.** Counted from the Forbes role starting 2007.
- **Current roles.** Arabian Radio Network, Dubai Chamber and the freelance
  contributor entries are all marked current, carried over from the old site.
- **Commercial terms.** Two revision rounds included, replies within one working
  day, fixed project fees, day rates for hosting, rate card on request. These
  read well and are normal for the market, but they were written here, not taken
  from the CV.
- **FAQ answers** on travel, Arabic hosting and ghost writing follow the same
  logic.
- **Email.** Still the gmail address from the old site. A domain address would
  look better on a site at this level.

## What was tried and rejected

Worth knowing so you do not walk back into it:

1. **Editorial serif direction.** Instrument Serif display type, warm off white
   background, mono labels, grain texture. Rejected: read as generic and
   over-designed.
2. **Clean light sans direction.** White background, Archivo, navy accent,
   modest 46px headings, bordered cards. Rejected: too plain, "simple si website
   nahi chahiye".
3. **Monochrome brand kit 01.** Rejected in favour of kit 02.
4. **Long form copy on the home page.** Nine paragraphs. Rejected: too much
   text, every section looked the same.

The current direction came from the client pointing at stevenbartlett.com as the
benchmark: dark canvas, display type set enormous with negative leading, one
strong colour, full bleed imagery, very little copy.

## Deploy

Push to a Git host and import into Vercel. No environment variables needed.
Point the domain at Vercel and set `site.url` to match.
