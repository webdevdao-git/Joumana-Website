# Joumana Saad Media

Rebuild of joumanasaad.com. Next.js 16 App Router, React 19, TypeScript, Tailwind v4.
No backend, no CMS, no database. Every page is prerendered as static HTML at build time.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where things live

```
src/lib/content.ts        every word on the site, in one file
src/app/page.tsx          home
src/app/about/page.tsx    about
src/app/services/page.tsx services
src/app/work/page.tsx     work
src/app/contact/page.tsx  contact
src/app/globals.css       colours, type scale, shared classes
src/components/           header, footer, hero slider, motion helpers, JSON-LD
public/images/            photography
```

**To change copy, edit `src/lib/content.ts`.** Nothing else needs touching. Services,
career history, published work, hosting credits, stats and FAQ all read from there.

## Colours

White, near black, and one accent. That is the whole palette, and it lives at the
top of `src/app/globals.css`.

```css
--ink: #14181d;      /* text */
--white: #ffffff;    /* page */
--wash: #f4f5f7;     /* alternating section background */
--accent: #173f6b;   /* deep blue, the only colour on the site */
--accent-hover: #0f2c4d;
```

Changing `--accent` and `--accent-hover` restyles every button, link, kicker,
marker and the credibility band. Nothing else hardcodes a colour, so picking the
final brand colour later is a two line edit.

## Identity

Brand kit 01 from the supplied brand sheet, the monochrome one.

`src/components/logo.tsx` holds the JS monogram with the name beneath it. The
sheet arrived as a flattened raster inside a PDF, with no vector artwork in it,
so the outlines here were traced from the highest resolution frame in that file.
They hold at every size the site uses. If the original vector artwork turns up,
replace the two symbols in that file and nothing else has to change.

The paths are declared once as `<symbol>` elements by `LogoSprite` in the root
layout and pulled in with `<use>` everywhere else, so they are not repeated in
the markup on each page. Everything paints with `currentColor`, which is how the
logo is white over the hero photograph and black everywhere else.

Two variants. `mark` is the monogram alone and is what the header uses, because
at header height the name under the monogram would be about four pixels tall.
`lockup` is the full thing and is used in the footer where it has room.

## Colours

Straight from the brand sheet. Four values, no accent colour in the usual sense.

```css
--ink: #000000;      /* headings, the CTA band, the hero scrim */
--accent: #2d2d2d;   /* charcoal: buttons, kickers, the credibility band */
--wash: #f2f2f2;     /* alternating section background */
--white: #ffffff;
```

The two greys in between, `--ink-soft` and `--ink-faint`, are derived for body
copy and meta text.

Because the palette is monochrome, a filled button disappears on the dark
surfaces. Those use `.btn-light`, which is white with black text, rather than
`.btn-primary`. The hero and the closing call to action both do this.

The other three kits from the sheet, for reference, if this one is ever
reconsidered: oxblood `#48110C`, teal `#3E5251`, and sand `#D8D0BD`. The
monochrome kit was chosen partly because she wears a strong royal blue in two of
the three hero photographs, and every other kit fights it.

## Typography## Typography

Archivo throughout, at weights 400, 500, 600 and 700. It is a newsroom sans, which
suits the subject, and it is self hosted through `next/font` so there is no render
blocking request to Google and no layout shift.

Sizes are deliberately restrained. The largest heading tops out at 46px on desktop
and body copy sits at 17px. The type scale is defined once as `.t-h1`, `.t-h2`,
`.t-h3`, `.t-lede` and `.t-kicker` in `globals.css`.

## SEO

* Unique title, meta description and canonical on every page
* One H1 per page, each carrying a target phrase
* JSON-LD: `Person`, `WebSite` and `ProfessionalService` sitewide, `BreadcrumbList`
  on inner pages, `FAQPage` on contact
* `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and `robots.ts`
* Open Graph and Twitter card images
* Images served as AVIF and WebP through `next/image` at the right size per breakpoint

Target phrases per page:

| Page | Primary phrase |
|---|---|
| `/` | freelance journalist Dubai |
| `/about` | bilingual journalist and editor Dubai |
| `/services` | content writer Dubai, PR consultant Dubai |
| `/work` | published work, MC presenter Dubai |
| `/contact` | hire freelance journalist Dubai |

Before going live, set the real domain in `site.url` inside `src/lib/content.ts`.
Everything canonical, sitemap and schema related reads from that one value.

## Contact form

`src/components/contact-form.tsx` composes a formatted email and hands it to the
visitor's mail client. That is a placeholder. To move it to a real endpoint, replace
the body of `handleSubmit` with a POST to Formspree, Getform or a Next.js route
handler. The field names are already shaped for that.

## Photography

Only three usable portraits survived from the old site and all three are centred
studio shots, which does not suit a hero that needs empty space on the left for
the copy. `scripts/prepare-hero-images.py` re-frames them: it scales each subject,
slides her to the right, and rebuilds the studio backdrop either side from a sliver
of empty backdrop in the same frame. The output is `public/images/hero-1.jpg`
through `hero-3.jpg`.

To regenerate after new photography arrives, edit the `JOBS` table at the top of
that script and run it from the repo root:

```bash
python3 scripts/prepare-hero-images.py
```

Each entry gives the source file, the output name, how tall the subject should be
in the 2400 by 1350 frame, roughly where her face sits across the source, how far
down to place it, and how wide a backdrop sliver is safe to sample.

The event photographs are only 460 pixels wide, which is why they are shown small
and desaturated. Useful replacements, in order of impact:

1. Hero photography, landscape, with space on one side
2. Event and stage photography at full resolution
3. A portrait for the about page, at least 1600 pixels tall

## Verify before launch

The copy was rewritten in 2026 from a CV last updated in 2019. These points were
inferred and should be confirmed with Joumana:

* **Nineteen years of experience.** Counted from the Forbes role starting 2007.
* **Current roles.** The Arabian Radio Network, Dubai Chamber and freelance
  contributor entries are all marked current, carried over from the old site.
* **Commercial terms.** Two revision rounds included, replies within one working day,
  fixed project fees and day rates for hosting, rate card on request. These read well
  and are normal for the market, but they were written here, not taken from the CV.
* **FAQ answers** on travel, Arabic hosting and ghost writing follow the same logic.
* **Email address.** Still the gmail address from the old site. A domain address
  would look better on a site at this level.

## The motion layer

The site is quiet by default and moves in a small number of deliberate places.

* **Smooth scrolling** via Lenis (`src/components/smooth-scroll.tsx`). Everything
  else in the list reads as one continuous piece because of it. Touch pointers
  and reduced motion get native scrolling.
* **Intro curtain** on the first visit of a session (`intro-curtain.tsx`). Server
  rendered and animated in CSS, so it paints with the first frame and clears
  itself even if JavaScript never runs. The inline script only decides whether
  to skip it on a repeat visit.
* **Page transitions** (`src/app/template.tsx`). Next remounts the template on
  every navigation, which gives an entrance without needing exit animations. It
  is suppressed on the very first paint so the hero is never hidden behind a
  panel while the page is being measured.
* **Pinned interview reel** (`interview-reel.tsx`). The one moment on the site
  that holds you still. The portrait pins and pushes in while the names she has
  interviewed pass through the frame. All eight names stay in the markup.
* **Film reveals on photography** (`ImageReveal` in `reveal.tsx`). The frame
  opens from the bottom while the picture settles back from an overscale.
* **Counters, parallax and marquees** for the stats, the portraits and the
  credibility band.

Every one of these has a reduced motion path. Turn the setting on and the site
becomes completely still without losing any content.

### One thing to know if you touch ImageReveal

The observed element is the outer wrapper, which is never clipped. Watching the
clipped element itself does not work: while the clip is closed its visible box
has no area, so the browser never reports it on screen and the frame stays shut
forever. This showed up as photographs that revealed on a desktop and stayed
blank on a phone.

## Hero slider

`src/components/hero.tsx` crossfades three photographs on a six and a half second
cycle with a slow scale, and the dots under the copy jump between them. Anyone with
reduced motion turned on gets the first frame and no movement at all.

On phones the photograph becomes a band at the top and the copy sits underneath it
on the dark panel, because overlaying text on a portrait at that width always ends
up on somebody's face.

## Deploy

Push to a Git host and import into Vercel. No environment variables are needed.
Point the domain at Vercel and set `site.url` to match.

## Deploying

The site is a static export. `npm run build` writes plain HTML, CSS, JS and
artwork into `out/`, and that folder is the whole website.

### Automatic, on every push

`.github/workflows/deploy.yml` builds on GitHub and uploads `out/` to Hostinger
over FTP whenever `main` moves. Push, wait about two minutes, and the live site
has the change. The workflow file carries the one time setup at the top: three
secrets for the FTP account and two variables for the site URL.

Hostinger's own Git integration deliberately is not used. It copies a repository
into `public_html` without running a build, and shared hosting has no Node
process to build with, so it would serve the TypeScript source rather than a
website.

### By hand

If the FTP account is ever unavailable:

```bash
npm run build            # or npm run build:preview while on the temp subdomain
cd out && zip -rq ../site.zip .
```

Then upload `site.zip` in hPanel, File Manager, into `public_html`, and extract
it there. `.htaccess` is a hidden file, so turn on "Show hidden files" in the
File Manager settings to confirm it arrived.

### Moving to the real domain

`site.url` reads `NEXT_PUBLIC_SITE_URL`, and `robots.ts` shuts the site to
crawlers while `NEXT_PUBLIC_NOINDEX` is set. On the temporary
`hostingersite.com` subdomain both are set, so nothing gets indexed on an
address that will not last. Once `joumanasaad.com` points at the hosting, set
the `SITE_URL` variable to `https://www.joumanasaad.com`, delete the `NOINDEX`
variable, and push. No code changes.
