# Portfolio Rebuild — Master Plan

> **2026-10-31 — reference changed to https://www.poulo.site/** (branch `feat/poulo-redesign`, stacked on `feat/readability`).
> The Sonar design (§0, §0.1, Phases 2–4 below) is superseded; security, CI, content model and `/work/[slug]` carry over.
> See §0.2 for what was taken from poulo.


Reference: https://www.sonarmusic.com.au/ · Stack stays: Next.js 16 (App Router) · React 19 · Tailwind v4 · GSAP · Lenis · Resend · zod · pnpm.
Tick boxes as you go. Each phase ships on its own branch + PR, so you can stop anywhere and the site still works.

---

## 0. What we're taking from Sonar (and what we're not)

**Take:**
- **Bento media grid.** Rounded cards in mixed sizes with a full-bleed image or video, a label in the bottom-left corner (`TITLE / category`) and an ↗ in the bottom-right.
- **Type pairing.** Heavy condensed uppercase display (`SOUND`, `SONAR MUSIC`) set against small italic serif connectors (`the`, `of`, `and`). You already have Instrument Serif for the italics. Swap Space Grotesk for a condensed display face.
- **Numbered category tiles.** A `FILM (12) 01` style tile that interrupts the grid. For you: `AI/ML 01`, `WEB 02`, `IoT 03`.
- **Giant marquee band.** `WORK-WORK-WORK-` scrolls horizontally on scroll as a section divider.
- **Editorial intro card.** Eyebrow, display headline, centered paragraph, small CTA.
- **News/updates cards** with a blurred glow behind the type. Use them for achievements and press.
- **Footer as a spec sheet.** Dotted-leader rows (`ROLE ........ AI/ML ENGINEER`).
- **Short page loader** plus a hero with a full-bleed image or video and the title overlaid at the bottom.

**Don't take:**
- Webflow plus about 15 CDN scripts (jQuery, Howler, Plyr, Lottie, split-type…). We do it with gsap + lenis only.
- The "Rotate your device" screen. We build properly responsive instead.
- The mixtape/audio feature. It's out of scope.
- Hover-only info. Everything has to work on touch and keyboard.

### 0.1 Sonar motion inventory (decoded from their GSAP scripts, 2026-10-28)
Sonar's wow factor comes from **choreographed transitions and hover**, not scroll-scrub. There's almost no pin/scrub. Every effect below is free GSAP (all plugins incl. SplitText, CustomEase, Draggable, Inertia have been free since 3.13).

| # | Effect | How Sonar does it | Our version |
|---|---|---|---|
| M1 | **Intro loader** | Lenis stopped → logo pieces fade in (stagger from center) → logo splits apart (`xPercent` ±200–290) → a **hero card rotated −20° grows to 100vw×100vh** while rotating to 0 and the bg counter-rotates → overlay fades → hero text fades up (stagger .05) → `lenis.start()`. Custom ease `"0.46,0.03,0,1"`, ~5 s. | Same, using your name/monogram, cut to ~2.5 s. Once per session; skipped entirely under reduced motion. |
| M2 | **Page transition** ("equalizer curtain") | Vertical bars rise from random 100–125vh to 0 (`power4.out`, stagger `from:"random"`), page scales to .92, then navigation; on the new page the bars drop away and the page scales back to 1. Ease `"M0,0 C0.64,0.05 0.35,1 1,1"`. | `<TransitionLink>` client component: play the timeline, then `router.push()`; the new page's layout effect plays the exit. Only needed once `/work/[slug]` exists. |
| M3 | **Menu open** | The same bar curtain, plus page `scale .92`, hamburger lines rotate ±45° into an X, menu headings slide up out of a mask (`y:100%→0`, stagger .05), meta links fade up. Reverse on close. | Same. Shares the bar component with M2. Adds a focus trap and `Esc`. |
| M4 | **Marquee band** | Infinite `xPercent:-100` over 40 s, linear, played only while in view. On first enter (`top 85%`) the chars (split) **fly in from `x:300%`** with stagger .05 and the bg panels scale 1.05. | Same, using SplitText. Under reduced motion: static text, no fly-in. |
| M5 | **Card hover-expand + video preview** | On hover the card grows (`scaleX 1.4, scaleY 1.15`, raised z-index) while the info block **counter-scales** (`.714/.869`) so the text doesn't distort; the cover image fades out and a muted video plays. `expo.out` .8 s. | Same idea. Desktop (`hover:hover`) only. On touch, the video autoplays while in view. Also fires on keyboard focus, not just mouse. |
| M6 | **Full-bleed hover** | The gradient fades, an ↗ icon rotates in from −90°/scale 0, and a video plays. | Same, on the featured project card. |
| M7 | **"Sound lines"** | Decorative bars that drift on random `x` with random duration and loop forever (`power3.inOut`). | Re-themed as "signal/token bars" for an AI identity. Paused when off-screen and under reduced motion. |
| M8 | **Nav theme switch** | A ScrollTrigger per section (`top top+=5%`) toggles the nav between dark and light. | Same: `data-nav-theme` on each section. |
| M9 | **Footer link hover** | Siblings dim to .3 opacity. | Pure CSS `:has()`, no JS. |
| M10 | **Mobile sliders** | Draggable + Inertia on horizontal rows. | Native CSS `scroll-snap` first (accessible and free). Add Draggable only if that feels flat. |
| M11 | Webflow IX2 (48 elements) | Generic fade/scroll reveals. | Our existing `Reveal`, ported to `useGSAP`. |

**Not copied:** `history.scrollRestoration = "manual"` + forcing scroll to the top on every load. It breaks the back button.

**Where we can beat Sonar:** they almost never scrub. Add **one** signature scroll moment, which is where your "I like the scroll stuff" lives. Pick in Phase 4:
- (a) Hero media scales down into the first bento card as you scroll (ScrollTrigger `scrub` + Flip). This is the M1 grow-to-fullscreen move run in reverse and tied to scroll. **Rec.**
- (b) A pinned horizontal scroll through featured projects.
- (c) The marquee speeds up and slows down with scroll velocity (`ScrollTrigger.getVelocity()`).

---

### 0.2 Poulo inventory (current reference)
| Poulo element | Our version |
|---|---|
| White canvas, soft gray rounded panels, TikTok Sans | Same: TikTok Sans + IBM Plex Mono via `next/font`, `.panel` / `.pill` tokens, light + dark |
| Floating glass pill nav (icons, active state, theme toggle, CTA) | `Nav.tsx`: icon links with tooltips + `aria-label`, `useActiveSection`, `useSyncExternalStore` theme, mailto CTA |
| Left section rail (dashes, active one long) | `SectionRail.tsx`, ≥1280px only |
| Hero: rotating title with blur letters, avatar centre, intro right, drizzle | `RoleRotator` (GSAP, per-letter blur), "GA" monogram, `Rain` canvas (pauses off-screen / hidden tab) |
| Blur-in reveal on scroll | `Reveal` → `filter: blur(12px)` + rise, once |
| Works: filter pills, showcase (media + story panel), 4 highlight cards | `Work.tsx` with `hook` / `role` / `highlights` in `content/projects.ts` |
| Experiments row | `Models.tsx` (3 cards) |
| About me statement + bio | `About.tsx` + experience timeline + honours + certifications |
| Stack icon wall + skill graph | `Stack.tsx` chip groups (graph skipped: heavy canvas, low info) |
| Footer link columns + giant faded wordmark | `Footer.tsx`, wordmark as decorative SVG |
| Top fade under nav | gradient strip in `Nav.tsx` |

**Skipped on purpose:** cookie banner + GA (no analytics yet), Calendly "Book a Call" (mailto instead), chat bubble, skill-graph canvas, metal/gooey SVG filters.

**Verified 2026-10-31 (prod build, Playwright):** axe 0 violations light + dark on `/` and `/work/*`; reduced motion → first role static, no Lenis, nothing hidden; filter, theme toggle + persistence, anchor nav + active state; 375px no overflow; 0 page errors.

**Open for poulo phase**
- [ ] Real avatar/illustration to replace the "GA" monogram
- [ ] Screenshots for Puskesmas + Chili Hub (gradient placeholder now)
- [ ] Optional: Calendly link if you want "Book a Call"

## 1. Decisions (resolved 2026-10-28: all recommendations accepted)
D1 = light-first off-white + lime accent · D2 = Anton · D3 = you gather media · D4 = `/work/[slug]` yes.

## 1.1 Original decision table

| # | Decision | Options | My rec |
|---|---|---|---|
| D1 | Palette | (a) Sonar warm off-white `#E9E7E2` + near-black ink, (b) keep full black + lime, (c) both via theme toggle | **(a) light-first, keep lime as the single accent on dark tiles.** Sonar's look depends on the light canvas, and black-on-off-white gives you safe contrast. A toggle (c) doubles the QA work, so add it only if you miss dark mode. |
| D2 | Display font | Anton · Bebas Neue · Oswald · "Big Shoulders Display" (all Google, free) | **Anton**: closest to Sonar's condensed heavy face, single weight, small file. |
| D3 | Media | You need real assets: project screenshots, short muted loop videos (≤3 MB, webm + mp4), headshot | Budget about one evening for capturing them. The bento grid looks empty without them. |
| D4 | Project detail pages | single-page only vs `/work/[slug]` | **`/work/[slug]`** (static, `generateStaticParams`). Better for SEO and gives the "View Project" CTA a destination. |

> Color-vision note: no state may be conveyed by red/green alone. Every status needs a text label or icon, and focus rings use a high-contrast outline.

---

## 2. Phase checklist

### Phase 1: Hygiene & security baseline (no visual change) ✅ do first
- [x] Branch `chore/security-baseline`
- [x] `next.config.ts`: `poweredByHeader: false`, `output: "standalone"`, `headers()` with:
  - [x] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - [x] `X-Content-Type-Options: nosniff`
  - [x] `Referrer-Policy: strict-origin-when-cross-origin`
  - [x] `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
  - [x] `Content-Security-Policy`, static version: `default-src 'self'; img-src 'self' data: blob:; media-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests`
  - Tradeoff: a nonce CSP (via `proxy.ts`, per the Next 16 docs) forces **dynamic rendering of every page**, which loses static/CDN caching on a site with no user content. A static CSP with `'unsafe-inline'` scripts is the pragmatic choice here. Upgrade path: try `experimental.sri` (hash-based) once it's stable, or go to a nonce proxy if you ever render user content.
- [x] Contact server action hardening. Server actions are public POST endpoints, so anyone can script them.
  - [x] Honeypot field (`company`, visually hidden, `tabIndex={-1}`, `autoComplete="off"`). If it's filled, return a fake success.
  - [x] Minimum fill time: a hidden timestamp field; reject submissions under 3 s.
  - [ ] (deferred) Rate limit per IP. Recommended: **Vercel BotID** or **Cloudflare Turnstile**. Alternative: Upstash ratelimit, 3 per 10 min. An in-memory Map does nothing on serverless.
  - [x] Strip `\r\n` from `name` before it goes into `subject` (defense in depth against header injection).
  - [x] Keep the existing zod `.max()` limits and HTML escaping (both already good).
- [x] Dockerfile: use `output: "standalone"`, copy only `.next/standalone` + `.next/static` + `public`, run as non-root `USER node`, `CMD ["node","server.js"]`. Also check `.dockerignore` excludes `.env*`, `.git` and `node_modules`.
- [x] Delete Next boilerplate SVGs in `public/` (file/globe/next/vercel/window).
- [x] `.gitignore`: add `.playwright-mcp/`, `linkedin-experience.md` (or commit it intentionally), `tsconfig.tsbuildinfo`.
- [x] `Preference.md` is stale (still says Postgres/blog). Update it or fold it into this file.
- [x] Add `"typecheck": "tsc --noEmit"` to `package.json`.
- [x] GitHub Actions: `pnpm install --frozen-lockfile` → lint → typecheck → test → build on every PR.
- [x] Dependabot config committed
- [ ] **You:** turn on secret scanning + push protection (repo Settings → Code security)
- [x] Run `pnpm audit --prod`. Fix highs. (34 → 0: next 16.4.3, react 19.3.1, zod 4.6.7 + pnpm overrides for browserslist / baseline-browser-mapping / source-map-js. Drop the overrides once next ships patched deps.)
- [ ] **After deploy:** verify at https://securityheaders.com → aim for A.

### Phase 2: Design system foundation
- [x] Branch `feat/sonar-rebuild` (phases 2–5 combined; stacked on `chore/security-baseline`)
- [x] Resolve D1/D2.
- [x] `globals.css`: new tokens `--bg`, `--surface` (card), `--ink`, `--ink-muted`, `--line`, `--accent`, `--radius-card` (Sonar ≈ 10–12px). Use semantic names only, no raw hex in components.
- [x] Fonts via `next/font`: display (Anton), serif italic (Instrument Serif, keep), mono (Geist Mono, keep). Drop Space Grotesk for a neutral body face (Inter or Geist).
- [x] Type scale: `--text-mega` (marquee, `clamp(6rem,22vw,22rem)`), display, h1–h3, body 16px / 1.5, label 11px uppercase tracked. Label is the only text below 12px, and it must pass 4.5:1 contrast.
- [x] `<DisplayHeading>` primitive that renders `the *SOUND* of` patterns. It takes `[{ text, serif?: boolean }]`, which keeps the markup semantic: one `<h2>`, with `<em>` for the serif words.
- [x] Spacing: an 8px grid and a single `gap` value shared across the bento.
- [x] Contrast check every token pair (WebAIM). Record the ratios in a comment next to the tokens.

### Phase 3: Code revamp (best practices, from the Context7 docs)
- [x] `pnpm add @gsap/react`. Replace the custom `useIsomorphicLayoutEffect` + `gsap.context` with `useGSAP({ scope })`, which handles cleanup and SSR. Then delete `src/hooks/useIsomorphicLayoutEffect.ts`.
- [x] Use `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` in place of the manual `prefersReducedMotion()` checks. It reverts automatically when the setting changes.
- [x] SplitText is free since GSAP 3.13. Use it for the headline char/line reveals, with `autoSplit` + `aria` handling so screen readers get the full string.
- [x] Lenis: switch to `ReactLenis root options={{ autoRaf: false }}` + drive it from `gsap.ticker` (documented pattern). That removes `src/lib/lenis.ts` global state, and `useLenis()` replaces `setLenis`.
- [x] Keep sections as **Server Components**. Only small leaf islands get `"use client"` (Reveal, Marquee, Nav, ContactForm, Loader).
- [x] Images: `next/image` with explicit `sizes`, WebP + blur placeholder. Project screenshots captured from the live sites into `src/content/media/`.
- [ ] **You (D3):** Videos: `<video muted playsInline loop preload="none" poster>`, played only when in view (IntersectionObserver) and never autoplayed under reduced motion.
- [x] Content stays typed in `src/content/*.ts`, with `satisfies` so typos fail at build time.
- [x] One test file: `src/lib/validation.test.ts` via `node --test` (no framework) covering the contact schema, honeypot and CRLF stripping.

### Phase 4: Build the sections (Sonar layout → your content)
Mobile-first. Each bento collapses to one or two columns under 768px. Motion items M1–M11 are in §0.1. Build the shared bar curtain (M2/M3) once.
- [x] Motion primitives: eases in `lib/gsap.ts`, `lib/curtain.ts` + `<BarCurtain>`/`<TransitionLink>`/`<PageEnter>`, `<Marquee>`, `<MediaCard>` (M5/M6), `<SignalBars>` (M7), `<SplitHeading>`, `<Loader>` (M1)
- [x] Signature scroll moments: **(a)** hero shrinks into a card on scroll (scrub) **and (c)** marquee speed follows scroll velocity
- [x] **Loader**: about 1.2 s, name counter 0→100, skipped on repeat visits (`sessionStorage`, in try/catch) and under reduced motion.
- [x] **Nav**: small wordmark top-left, menu top-right, full-screen overlay menu with focus trap + `Esc` + returns focus.
- [x] **Hero**: full-bleed media, overlaid `the *AI* of / GARJITA ADICANDRA` + eyebrow `AN AI/ML & FULL-STACK ENGINEER`, current-project label bottom-left, scroll cue bottom-right.
- [x] **Category strip + featured bento**: `AI/ML · WEB · IoT · RESEARCH · LEADERSHIP` tiles → big featured project card + 2 tall cards.
- [x] **Intro card**: `the *CRAFT* of / AI & SOFTWARE` + bio paragraph + "Contact me" CTA, next to "OUT NOW" style tile (latest model on HuggingFace).
- [x] **Marquee band**: `WORK—WORK—` horizontal scrub on scroll (ScrollTrigger, `scrub: true`). Static under reduced motion.
- [x] **Work grid**: numbered category tiles `01/02/03` interleaved with project cards + a "SELECTS" curated card.
- [x] **Models**: HF model cards (same card component, mono metadata rows).
- [x] **Experience / leadership**: person-card style (like Sonar's Jono Ma card) for 180DC, NESCO, AITF.
- [x] **Achievements / news**: 2×2 glow cards, ↗ external links with `rel="noopener noreferrer"`.
- [x] **Contact**: keep `useActionState` form. Labels must be visible, errors sit under each field with `aria-describedby`, and the status message is in an `aria-live` region.
- [x] **Footer spec sheet**: dotted-leader rows (NAME / BASED IN / FOCUS / STACK) + socials + ©.
- [x] `/work/[slug]` pages if D4 = yes: `generateStaticParams`, `generateMetadata`, per-page OG image.

### Phase 5: Accessibility & performance QA
- [x] Keyboard: tab through everything, check visible focus, add a skip link.
- [x] `prefers-reduced-motion`: no marquee, no scrub, no loader, no Lenis.
- [x] Every interactive target ≥44×44px. No hover-only content.
- [x] Alt text on every image. Decorative media gets `alt=""` / `aria-hidden`.
- [ ] **After deploy:** Lighthouse mobile: Perf ≥90, A11y 100, BP 100, SEO 100. LCP < 2.5 s, CLS < 0.1.
- [x] Test at 375 / 768 / 1024 / 1440. No horizontal scroll (watch the marquee).
- [ ] **You:** test in a color-blindness simulator (Chrome DevTools → Rendering → Emulate vision deficiencies).


**Phase 5 verified 2026-10-28 (local prod build):** axe-core: 0 violations on `/`; `/work/*` flags only the nav wordmark contrast, which is a false positive (`mix-blend-difference` renders it dark on light; axe can't evaluate blend modes). Reduced motion (Playwright): no loader, no Lenis, all content visible, 0 console errors. 375px: no horizontal scroll. Menu: Esc closes, focus returns to trigger. Curtain transition `/` → `/work/[slug]` works.

**Known follow-ups**
- Add real screenshots for Puskesmas + Chili Hub (`image` in `src/content/projects.ts`) — they show a gradient placeholder now.
- Muted loop videos in MediaCard (M5 full version) once you have clips.
- M10 mobile Draggable: native scroll-snap used on the category strip; revisit only if it feels flat.

### Phase 6: SEO & ship
- [x] Update sitemap with `/work/*`. Add JSON-LD `Person` schema in the layout.
- [ ] Custom domain → update `SITE_URL` in `src/lib/site.ts` + Resend verified sender domain (`CONTACT_FROM`). Without that, mail only reaches the Resend account owner.
- [ ] Re-check securityheaders.com + Lighthouse on prod.
- [ ] Tag release `v2.0.0`.

---

## 3. Current-state audit (2026-10-28)

| Area | Finding | Phase |
|---|---|---|
| Security | No security headers / CSP; `X-Powered-By` exposed | 1 |
| Security | Contact action has no rate limit / bot protection → spam + Resend quota burn | 1 |
| Security | Docker runs as root, ships full `node_modules` + source | 1 |
| Code | Custom isomorphic-layout-effect + `gsap.context`, which `@gsap/react` `useGSAP` replaces | 3 |
| Code | Lenis kept in a module-global (`lib/lenis.ts`); `lenis/react` provides context | 3 |
| Code | No typecheck script, no CI, no tests | 1, 3 |
| Content | No images/video anywhere, and the Sonar look depends on media | D3 |
| Repo | Boilerplate SVGs, stale `Preference.md`, untracked scratch files | 1 |
| Good already | zod validation with limits, HTML-escaped email body, `replyTo` set, server-only API key, reduced-motion checks, metadata/OG/robots/sitemap | — |

---

## 4. Resume protocol
1. Open this file and find the first unchecked box.
2. Make sure `git status` is clean and you're on `main`, then branch per phase.
3. Before using any library API, check the docs via Context7. Libraries touched here: `/vercel/next.js`, `/darkroomengineering/lenis`, `/greensock/react`, `/websites/gsap`.
4. Ship each phase as its own PR. Vercel preview, then merge.
