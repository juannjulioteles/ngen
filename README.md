# Ivy League Entrepreneurship Conference

The website for ILEC, presented by NGEN (NextGen Entrepreneurship Network, a 501(c)(3)).

Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Six static pages
(Home, About, Speakers, Team, Sponsors, Contact). Deploys to Vercel with no configuration.

## Design

Stone and ink, after the restraint of decade.com, with forest green kept for one place: the hero
panel where the vine grows. Libre Caslon Display for headlines, Hanken Grotesk for text and UI.

- **Hero:** a split that fits one screen. Name and actions on stone; the green panel with the vine
  and an admission ticket (date, venue, apply) that leans toward the cursor.
- **Nav:** full lockup and a frosted link tray at the top; on scroll the bar lifts into a floating
  frosted pill and the lockup folds to the vine.
- **Strip:** firms behind past speakers and alumni, plus a news pill.
- **Mission:** the three audiences (student founders, influential leaders, sponsors) as a three-circle
  diagram, face to face where all three meet, and what each gets.
- **Press release (`/press`):** the launch announcement set as a letter, Decade-style, with NGEN
  founders' press coverage below. Copy and date live in `pages.press` (date is **TBD**).
- **Footer:** brand and invite button, then Pages, Social (LinkedIn, Press release) and Contact.
- **Request an invite (`/invite`):** the event is invite-only; the form writes the request as an
  email to the team (no backend), and every "Request an invite" button points here.
- **Journey:** the story as a pinned scroll, with progress ticks; shared with the About page.
- **Startups:** NGEN's featured startups (raised, one-liner, press link), in `startups`.
- **Speakers:** portrait cards with each speaker's Ivy affiliation; a dialog holds the bio.
- **NGEN hover card:** every "NGEN" in running text explains itself (`components/brand/Ngen.tsx`).
- **Launch sequence (home, once per session):** letterbox, three cuts whose figures count up
  (3 / 18 / $30M), a montage of the firms behind past speakers and alumni, "Now, a bigger stage."
  over New York City, then the lights come up on the real hero. Sound is on by default: where the
  browser holds audio until the first interaction, the bar says "Click for sound" and the first click
  starts the score in sync; a visitor who turns it off is remembered. About 7.5s, skippable, ends by
  scrolling, replayable ("Watch the launch, with sound"). The score is synthesised live with Web
  Audio (`components/launch/score.ts`). Timings live in `components/launch/timeline.ts`, shared by
  the CSS and the score. Reduced motion, anchor links and repeat visits start on the finished page.
- **No stranded words:** all copy uses `text-wrap: balance`; keep blocks short enough to balance.

Inner page copy (and the team list) lives in `pages` in `content/site.ts`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
npm run lint
npm run typecheck
```

## Filling in the TBDs

Everything that is still to be decided lives in **`content/site.ts`**, marked `TBD`. Components
never hardcode copy, so editing that file updates the whole page.

| Item | Where in `content/site.ts` | Until it is set |
| --- | --- | --- |
| Event date and time | `event.startsAt` (ISO with offset, e.g. `"2027-04-16T09:00:00-04:00"`) | "TBA"; once set, "In N days" appears under it |
| Venue | `event.venue` (city is set: New York City) | Location shows the city |
| Apply link | `links.apply` | `#` |
| Event photos | `pages.about.photos[n].image` | Photo block hidden |
| Speaker headshots | `speakers.items[n].headshot` | Monogram |
| Team | `pages.team.members` | "The organizing team will be introduced here soon." |
| Partner and sponsor logos | `partner.logos` | Logo row hidden |
| Partnership formats | `pages.sponsors.formats` | Draft copy, **for review** |
| The three audiences (diagram) | `mission.audiences` | Draft copy, **for review** |
| Firm logos in the strip | `strip.firms[n].logo` | Names shown as text |
| Production domain | `url` | Vercel's production URL |

Once both a date and a venue are set, the page also emits Event structured data for search.

Images go in `public/` (or come from ngennetwork.org, allowed in `next.config.ts`) and are
referenced as `{ src, alt, width, height }`; they are served as AVIF/WebP through `next/image`.

## Structure

```
app/                 layout (fonts, metadata, sprite), page, loading mark, 404, icons, OG image
content/site.ts      all copy and event details (typed)
lib/                 event date helpers, shared 1s clock, site URL
components/
  brand/             Wordmark (official lockup), IvyVine (animated vine), IvySprite, geometry
  motion/            MotionProvider (mobile menu), InView (scroll-in trigger)
  layout/            SiteNav (+ mobile menu), SiteFooter, PageHero, PageSection
  launch/            timeline, score (Web Audio), LaunchControls (skip, sound, replay)
  sections/          Hero, Ticket, Strip, Mission, Journey, Speakers, AttendPartner, DaysAway
  ui/                PageLink
assets/, reference/  the original design kit
```

## The vine

`<IvyVine />` is the logo as inline SVG, traced from `assets/ivy-vine-cream.png`. Colour follows
`currentColor` and size follows the element's height.

```tsx
<IvyVine animate className="h-52" />          // hero: draw, unfurl, sway
<IvyVine className="h-[38px]" />               // static mark (nav, footer, cards)
<IvyVine animate delay={0.3} label="ILEC" />   // with an accessible name
```

With `animate`, the stem draws from base to tip (1.5s). Each leaf unfurls from its base at the
moment the stem reaches it: the attachment points sit at 18%, 48%, 75% and 100% of the stem's
length, mapped through the stem's easing curve. The leaves then sway, each at its own speed.
All of this is CSS, so it starts at first paint, before React hydrates, and stops entirely under
`prefers-reduced-motion`.

Leaf outlines are defined once per page in `<IvySprite />` and referenced with `<use>`, so the
path data is not repeated for every instance.

## Motion

- **Hero sequence**: vine, then title, tagline, and date / countdown / CTAs rise in turn.
- **Scroll reveals**: every section fades up 18px with staggered children, once.
- **Count-up stats**, hover lifts on cards and speakers, arrow nudge on buttons.
- **Scroll-driven moments**: the hero content sinks and fades as it leaves, and the Alumni
  statement pins while each word inks in.
- **Marquee**: pauses on hover, on keyboard focus, and with a pause button.
- **Reduced motion**: every final state is shown immediately, with no pinning and no movement.
  This is enforced in CSS, so it holds before hydration and without JavaScript.

## Research applied

From **brazilconference.org**
1. Urgency in the hero: date, place, live countdown and two clear CTAs.
2. Their persistent bottom ticket bar became a **mobile event bar** (date, venue, Apply). It shows
   after the hero and hides at the Attend section, because below 900px the nav CTA folds into
   the menu.
3. Their logo-building loader became the vine drawing itself in `app/loading.tsx`, used for
   route transitions without delaying the first paint.
4. Sponsors framed as a reason to attend: the marquee reads "Speakers and alumni backers from",
   and the partner block pitches visibility to Ivy founders.

From **america.gov**
1. A **pinned, scroll-scrubbed statement**: the Alumni sentence holds while each word inks from
   sage to deep green. Un-inked words still meet 3:1 contrast for large text.
2. A **hero exit**: content sinks and fades as the hero scrolls away, while the frame stays.
3. A **docked action bar** that persists while scrolling (merged with item 2 above).
4. **Pause controls on auto-moving content**, as on their carousel, which WCAG 2.2.2 requires.
5. **Large serif display type** as the main voice of the page.

## Quality

Lighthouse (production build, measured locally):

- **Desktop:** 99 to 100 in every category.
- **Mobile:** Accessibility, Best Practices and SEO were 100 in every run. Performance ranged
  from 86 to 99 depending on machine load (the median was about 90). TBT and CLS stayed low, and
  the swing comes from LCP. Lighthouse's simulated LCP charges every request started before the
  LCP: about 200 KB of framework JS and 105 KB of brand fonts. Re-check on PageSpeed
  Insights after deploying. If mobile sits under 90 there, the next lever is self-hosting
  subsetted fonts with `next/font/local`.

The hero kicker ("NGEN presents the inaugural") is painted immediately rather than faded in.
Chrome never counts text that fades in from `opacity: 0` as the Largest Contentful Paint, so
without it the page would report no LCP element at all.

- The nav compacts with transforms and an opacity-faded background (no padding change), so
  scrolling never shifts layout.
- Fonts come from `next/font` with metric-matched fallbacks, so there is no layout shift on
  load.
- The grain texture is a 24 KB lossless WebP (alpha quantized to 5 levels; at most 1/255 of
  difference from the original PNG).
- Framer Motion's animation features load after hydration (`LazyMotion`, async).
- Semantic landmarks, a skip link, visible focus states, a mobile menu with focus management
  and `inert` background, and 4.5:1 text contrast.

## Brand assets

- `public/brand/`: the original PNG marks and wordmark.
- `public/textures/grain.webp`: the paper grain (256px tile).
- `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.jpg`: generated from the marks.

If the logo changes, retrace `components/brand/vine-geometry.ts`. Fit the stem as one
cubic-Bezier path along the PNG's centreline. Segment each leaf (a morphological opening
isolates the leaf bodies), trace each with potrace, and keep the four `origin` points where
leaves meet the stem.
