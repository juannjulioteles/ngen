# Prompt for Claude Code: ILEC website

Paste everything below the line into Claude Code, run from a folder that contains this kit (`assets/`, `reference/`).

---

Build the production website for the **Ivy League Entrepreneurship Conference (ILEC)**, presented by NGEN (NextGen Entrepreneurship Network, a 501(c)(3)).

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion for animation
- Single landing page for now, structured as components so we can add pages later
- Deploy-ready for Vercel. Fully responsive (mobile first). Lighthouse 90+ on all categories.

## Inputs in this folder
- `reference/design-reference.html`: the approved design. Match its layout, copy, colors, type and motion. It uses a custom templating runtime (`<x-dc>`, `{{holes}}`, a `Component` class). Ignore that runtime and rebuild it as clean React components.
- `assets/ivy-vine-cream.png`: main logo (ivy vine), cream, for dark backgrounds
- `assets/ivy-vine-green.png`: same vine, green, for light backgrounds
- `assets/ilec-wordmark.png`: full wordmark lockup
- `assets/grain-texture.png`: tiling paper grain overlay (256px tile)

## Research first
1. Study https://www.brazilconference.org/ closely. What we take from it:
   - Urgency in the hero: live countdown, date, city, two clear CTAs
   - Programs shown as cards (the org is bigger than one event)
   - Moving proof: photo gallery and partner logo carousel
   - Sponsors framed as a reason to attend, not a footnote
2. Study https://america.gov/ for modern, dynamic patterns: scroll-driven motion, bold type, section transitions. Pull 3 to 5 concrete techniques and apply them.
3. Before coding, write a short list of the insights you are applying and where.

## Brand
- Colors: forest `#1C3A2A`, deep green text `#1F3D2B`, cream `#F3EFE6`, paper `#FAFAF7`, muted sage `#C9CEC3`, body grey-green `#4A5C51`, card greens `#24432F` `#2B4A37`
- Type: Cormorant Garamond (display, often italic) + Libre Franklin (body), via `next/font/google`
- Signature details: grain texture on dark sections, thin double-line frame (1px border + inset outline) around hero and footer, 1px square-ish buttons
- Tone: prestigious, Ivy, but modern. No emoji, no gradient washes.

## Logo motion (most important)
Recreate the ivy vine as an **inline SVG** traced from `ivy-vine-cream.png` (a curved stem with 4 ivy leaves). Animate it:
1. Stem draws itself from the base to the tip (stroke-dashoffset, ~1.5s)
2. Each leaf unfurls in sequence as the stem reaches it (scale from its base + slight rotate, springy ease)
3. Title, tagline, countdown and buttons fade up after the vine finishes
4. Leaves then sway gently and continuously, each at a different speed
5. Make it a reusable `<IvyVine animate />` component. Also use a small version in the nav and as a loading or page-transition mark.
6. Respect `prefers-reduced-motion`: show the final state, no motion.

## Page sections, in order
1. **Sticky nav**: transparent over the hero, turns solid forest and compacts on scroll. Links: About, Programs, Speakers, Partner. CTA: Apply to attend. Mobile: hamburger menu.
2. **Hero**: "NGEN presents the inaugural" / animated vine / "Ivy League" + italic "Entrepreneurship Conference" / tagline "Connecting world-class student entrepreneurs with today's most influential leaders." / date + venue / countdown (days, hours, min, sec) / buttons: Apply to attend, Partner with us.
3. **Stats band**: numbers count up on scroll into view: 18 (conferences, founder treks and pitch competitions), $20M+ (raised by alumni of the conference), 3 (years building the Ivy League founder network).
4. **About**: copy from the reference, plus a photo grid (placeholders for now).
5. **NGEN programs**: 3 cards (The Conference, Founder Treks, Pitch Competitions) with hover lift and leaf micro-motion.
6. **Alumni**: large serif statement: backing from Y Combinator, a16z, Techstars; $20M+ raised; acquisitions.
7. **Past speakers**: Geoff Ralston (President Emeritus, Y Combinator), Howard Morgan (Co-Founder, B Capital; Founding President, Renaissance Technologies), Tom Gardner (Co-Founder & CEO, The Motley Fool), Seema Hingorani (Founder, Girls Who Invest). Headshot placeholders, hover motion.
8. **Marquee**: infinite scrolling strip, "Speakers and alumni backers from": Y Combinator, a16z, Techstars, B Capital, Renaissance Technologies, The Motley Fool, Girls Who Invest. Pause on hover. Build it to accept partner logos later.
9. **Attend + Partner**: date, location, countdown in days, Apply button; partner block with info@ngennetwork.org.
10. **Footer**: vine logo, "Presented by NGEN, the NextGen Entrepreneurship Network, a 501(c)(3) nonprofit.", ngennetwork.org, email, © NGEN.

## Motion system
- Scroll reveals on every section (fade + 18px rise, staggered children), triggered once
- Count-up stats, hover lifts, arrow nudge on buttons
- Add 1 or 2 scroll-driven moments inspired by america.gov (for example a parallax hero exit or a section that pins briefly). Keep it tasteful.
- All motion off under `prefers-reduced-motion`

## TBD: leave as clearly marked placeholders, do not invent
Put all of these in one config file (`content/site.ts`) so we can fill them in later:
- Event date and time: **TBD**. Show "Date TBD" and hide or show "Coming soon" in the countdown until a date is set.
- Venue and city: **TBD**
- Apply to attend link: **TBD** (use `#`)
- Speaker headshots: **TBD** (styled placeholders)
- Event photos: **TBD** (styled placeholders)
- Partner / sponsor logos: **TBD**
- Program card descriptions: draft copy is in the reference, mark as **TBD for review**

## Quality bar
- Semantic HTML, real buttons and links, alt text, visible focus states, 4.5:1 contrast
- No layout shift from fonts or images
- Clean component structure, typed content config, no hardcoded copy scattered in components
- When done: run the dev server, check desktop and mobile widths, and give me a short summary of what you built and what is still TBD.
