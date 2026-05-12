# PROJECT_ARCHITECTURE.md — Cinematic Scroll-Based Frame Animation System

> **Master Blueprint Document**
> Reusable architecture reference for building cinematic scrollytelling websites using scroll-linked image-sequence animation on HTML5 Canvas.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Frame Animation System](#4-frame-animation-system)
5. [How to Create New 3D Scroll Websites](#5-how-to-create-new-3d-scroll-websites)
6. [Frame Requirements](#6-frame-requirements)
7. [Hero Canvas Logic](#7-hero-canvas-logic)
8. [UI/UX System](#8-uiux-system)
9. [Performance Optimization](#9-performance-optimization)
10. [How to Reuse for Future Projects](#10-how-to-reuse-for-future-projects)
11. [Common Issues & Fixes](#11-common-issues--fixes)
12. [Final Best Practices](#12-final-best-practices)

---

## 1. PROJECT OVERVIEW

### What Type of Website This Is

This is a **cinematic scrollytelling landing page** — a single-page website where scrolling drives a frame-by-frame animation rendered on an HTML5 Canvas element. The user's scroll position directly controls which frame of a pre-rendered image sequence is displayed, creating the illusion of a 3D camera fly-through or cinematic video that the user "scrubs" through by scrolling.

### How Cinematic Scrollytelling Works

1. **240 JPEG frames** are stored in `public/frames/` (named `frame_0001.jpg` through `frame_0240.jpg`).
2. On page load, every frame is preloaded into memory as `HTMLImageElement` objects.
3. A progress bar shows loading status (`loadedCount / TOTAL_FRAMES * 100`).
4. Once loaded, the user scrolls through a **500vh tall container**. A **sticky canvas** (pinned to the viewport via `position: sticky; top: 0`) fills the screen.
5. As the user scrolls, a `scroll` event listener calculates **scroll progress** (0.0 → 1.0) and maps it to a **frame index** (0 → 239).
6. The corresponding frame is drawn onto the canvas using `ctx.drawImage()` with **cover scaling** (like CSS `background-size: cover`).
7. **Text overlays** (hero chapters) animate in/out based on scroll progress ranges using Framer Motion's `AnimatePresence`.

### Technologies Used

- **Next.js 16** (App Router) — React framework with server components
- **React 19** — UI rendering
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/postcss`
- **Framer Motion v12** — Scroll-triggered animations, page transitions
- **HTML5 Canvas API** — Frame rendering
- **Lucide React** — Icon library (ChevronDown, X icons)

### How Sections Are Structured

The page is composed in `app/page.tsx` as a linear stack:

```
<main>
  <Navbar />          ← Fixed position, z-100, glassmorphism on scroll
  <HeroCanvas />      ← 500vh scroll container with sticky canvas
  <Features />        ← "Why Choose Us" cards grid
  <Experiences />     ← "Our Experiences" cards with images
  <Stats />           ← "By The Numbers" statistics row
  <Location />        ← "Visit Us" contact section
  <Footer />          ← Links, branding, social icons
  <BookingModal />    ← WhatsApp booking form (event-driven modal)
</main>
```

---

## 2. TECH STACK

### Next.js App Router (v16)

- **Why**: Server-side rendering, file-based routing, optimized image handling via `next/image`, Google Fonts integration via `next/font/google`.
- **Usage**: `app/layout.tsx` defines the root layout with Inter (body) and Orbitron (headings) fonts. `app/page.tsx` composes all sections. All interactive components use `'use client'` directive.

### TypeScript

- **Why**: Type safety for component props, event handlers, refs, and state. Prevents runtime errors in complex canvas logic.
- **Config**: `tsconfig.json` targets ES2017, uses bundler module resolution, includes Next.js plugin.

### Tailwind CSS v4

- **Why**: Rapid styling with utility classes. v4 uses `@tailwindcss/postcss` plugin and `@theme` directive for custom design tokens.
- **Custom tokens** (in `globals.css`):
  - `--color-brand-cyan: #00F5FF`
  - `--color-brand-purple: #8B00FF`
  - `--color-brand-magenta: #FF0080`
  - `--color-brand-dark: #030308`
  - `--font-sans: var(--font-inter)`
  - `--font-heading: var(--font-orbitron)`
- **Custom utilities**: `.text-glow-cyan`, `.border-glow-cyan`

### Framer Motion (v12)

- **Why**: Declarative animations for scroll-triggered reveals (`whileInView`), chapter text transitions (`AnimatePresence` with `mode="wait"`), modal animations, and dot indicator morphing.
- **Key usage**: Hero chapter text fades in/out with `initial/animate/exit` variants keyed by `chapterIndex`.

### HTML5 Canvas

- **Why**: Direct pixel-level control for rendering image frames. Unlike video elements, canvas allows frame-perfect scrubbing synchronized to scroll position without buffering or codec overhead.
- **Usage**: Two canvas layers — one for the frame sequence, one for the particle system background.

### Image Sequence Rendering

- **Why**: Pre-rendered 3D frames allow cinematic quality impossible with real-time WebGL while maintaining scroll-scrub responsiveness. Each frame is a static JPEG — no video decode latency.

### Scroll-Linked Animation

- **Why**: The scroll position is the single source of truth for animation progress. This creates an intuitive "cinematic control" feel where the user paces the story.

---

## 3. PROJECT STRUCTURE

```
e:\infinte vr\
├── app/
│   ├── components/
│   │   ├── HeroCanvas.tsx      ← Core: frame animation, canvas, chapters, particles
│   │   ├── Navbar.tsx           ← Fixed nav with glassmorphism, active section detection
│   │   ├── Features.tsx         ← "Why Choose Us" — 6 feature cards with hover effects
│   │   ├── Experiences.tsx      ← "Our Experiences" — 6 image cards with Next.js Image
│   │   ├── Stats.tsx            ← "By The Numbers" — 4 animated stat counters
│   │   ├── Location.tsx         ← "Visit Us" — address, contact, CTA
│   │   ├── Footer.tsx           ← Brand, quick links, social icons, copyright
│   │   └── BookingModal.tsx     ← WhatsApp booking form modal (CustomEvent driven)
│   ├── globals.css              ← Tailwind v4 import, @theme tokens, custom utilities
│   ├── layout.tsx               ← Root layout: fonts, metadata, SEO, body styles
│   └── page.tsx                 ← Home page: composes all sections linearly
├── public/
│   ├── frames/                  ← 240 JPEG frames (frame_0001.jpg → frame_0240.jpg)
│   │   ├── frame_0001.jpg       ← ~39KB (first frame)
│   │   ├── frame_0002.jpg       ← ~50KB
│   │   └── ... (240 total)      ← ~15-31KB each on average
│   ├── images/
│   │   └── experiences/         ← 6 experience card images (~750KB-1MB each)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── favicon-*.png
├── src/app/                     ← Legacy/unused scaffold (globals.css, layout.tsx, page.tsx)
├── package.json                 ← Dependencies: next 16, react 19, framer-motion 12
├── next.config.ts               ← Default Next.js config (no custom options)
├── tsconfig.json                ← TypeScript config
├── postcss.config.mjs           ← @tailwindcss/postcss plugin
└── eslint.config.mjs            ← ESLint config
```

### File Purposes

| File | Purpose |
|------|---------|
| `HeroCanvas.tsx` | **Heart of the system.** 487 lines. Handles frame preloading, scroll-to-frame mapping, canvas rendering with cover scaling, particle system, chapter text overlays, progress bar, dot indicators, loading screen. |
| `Navbar.tsx` | Fixed navigation bar. Transparent → glassmorphism on scroll (>80px). Active section detection by walking `getBoundingClientRect()`. Smooth scroll navigation. Gradient logo. "Book Now" CTA dispatches `open-booking` CustomEvent. |
| `Features.tsx` | 6 feature cards in responsive grid (1/2/3 cols). Hover lift + glow + border color. Framer Motion `whileInView` stagger. Data-driven via `FEATURES` array. |
| `Experiences.tsx` | 6 experience cards with `next/image` photos. Hover zoom, gradient overlays, shimmer lines. Click opens booking modal with pre-selected experience. Data-driven via `EXPERIENCES` array. |
| `Stats.tsx` | 4 statistics in a grid. Gradient text values, vertical dividers on desktop. Framer Motion stagger reveal. |
| `Location.tsx` | Contact section with address card, phone/email/directions links, WhatsApp CTA button. |
| `Footer.tsx` | 3-column layout: brand description, quick links (scroll-to-section), contact info + social icons. |
| `BookingModal.tsx` | Full booking form modal. Opens via `window.addEventListener('open-booking')` CustomEvent. Form validates, then builds WhatsApp message URL and opens in new tab. AnimatePresence for enter/exit. Mobile-first: full-screen on mobile, centered card on desktop. |
| `globals.css` | 26 lines. Imports Tailwind v4, defines brand color tokens and font aliases via `@theme`, sets body background, defines glow utility classes. |
| `layout.tsx` | Root layout. Loads Inter + Orbitron from Google Fonts. Sets comprehensive SEO metadata (title, description, keywords, OpenGraph, favicons). Body has dark background, antialiased text, custom text selection colors, hidden horizontal overflow. |
| `page.tsx` | 24 lines. Simply imports and stacks all 8 components in order. |

---

## 4. FRAME ANIMATION SYSTEM

> **This is the most critical section.** Understanding this system is the key to reusing the architecture.

### How Frames Are Stored

Frames live in `public/frames/` as static JPEG files. Next.js serves everything in `public/` at the root URL, so `public/frames/frame_0001.jpg` is accessible at `/frames/frame_0001.jpg`.

### Frame Naming Convention

```
frame_XXXX.jpg
```

- **Prefix**: `frame_` (configurable via `FRAME_PATH` constant)
- **Number**: 4-digit zero-padded (`0001`, `0002`, ..., `0240`)
- **Extension**: `.jpg`
- **Generated in code**: `String(i).padStart(4, '0')` where `i` goes from `1` to `TOTAL_FRAMES`

### Configuration Constants

```typescript
const TOTAL_FRAMES = 240;                    // Total number of frames
const FRAME_PATH = '/frames/frame_';         // Path prefix
const FPS = 30;                              // Used for autoplay (currently disabled)
```

### How Frames Are Preloaded

All 240 frames are preloaded eagerly on mount inside a `useEffect`:

```typescript
if (framesRef.current.length === 0) {
  let loaded = 0;
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const num = String(i).padStart(4, '0');
    img.src = `${FRAME_PATH}${num}.jpg`;
    img.onload = () => {
      loaded++;
      setLoadedCount(loaded);           // Updates loading bar UI
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);              // Triggers scroll activation
      }
    };
    img.onerror = () => {
      loaded++;                         // Count errors too to avoid stuck loader
      setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) setIsLoaded(true);
    };
    framesRef.current.push(img);        // Store in ref array (persists across renders)
  }
}
```

**Key details:**
- Uses `useRef<HTMLImageElement[]>([])` — NOT state — to avoid re-renders during loading.
- Both `onload` and `onerror` increment the counter to prevent the loader from getting stuck on broken frames.
- Loading bar shows `(loadedCount / TOTAL_FRAMES) * 100` percent.
- Guard `framesRef.current.length === 0` prevents duplicate preloading on React re-renders.

### How Frame Index Is Calculated

```typescript
const fraction = Math.max(0, Math.min(scrolledIntoContainer / maxScroll, 1));
const frameIndex = Math.floor(fraction * (TOTAL_FRAMES - 1));
```

1. `scrolledIntoContainer` = `window.scrollY - container.offsetTop` (how far user has scrolled INTO the hero)
2. `maxScroll` = `containerHeight - stickyHeight` = `500vh - 100vh` = `400vh` worth of scrollable distance
3. `fraction` = clamped ratio from 0.0 to 1.0
4. `frameIndex` = `Math.floor(fraction * 239)` → integer from 0 to 239

### How Scroll Progress Maps to Frames

| Scroll Progress | Frame Index | Frame File |
|----------------|-------------|------------|
| 0.00 | 0 | frame_0001.jpg |
| 0.25 | 59 | frame_0060.jpg |
| 0.50 | 119 | frame_0120.jpg |
| 0.75 | 179 | frame_0180.jpg |
| 1.00 | 239 | frame_0240.jpg |

**Note:** `framesRef.current` is 0-indexed, but filenames start at `0001`. Frame index 0 = `frame_0001.jpg`.

### How Canvas Rendering Works

```typescript
const drawFrame = (index: number) => {
  if (!framesRef.current[index]) return;
  const img = framesRef.current[index];

  // Cover mode — like CSS background-size: cover
  const scale = Math.max(
    canvas.width / img.naturalWidth,
    canvas.height / img.naturalHeight
  );
  const x = (canvas.width - img.naturalWidth * scale) / 2;
  const y = (canvas.height - img.naturalHeight * scale) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
};
```

### How Sticky Scrolling Works

```html
<!-- Outer: 500vh tall, creates scroll distance -->
<div style={{ height: '500vh' }} className="relative">
  <!-- Inner: sticky, stays pinned to viewport top -->
  <div className="sticky top-0 w-screen h-screen overflow-hidden">
    <canvas ... />   <!-- Full-screen canvas -->
    <!-- Text overlays, particles, etc. -->
  </div>
</div>
```

- **Outer container** (`500vh`): Creates the scrollable distance. The user scrolls through 500 viewport heights.
- **Sticky inner** (`sticky top-0, h-screen`): Stays pinned to the viewport as the user scrolls through the outer container. The canvas never leaves the screen.
- **Net effect**: 400vh of "scrubbing distance" (500vh - 100vh viewport) maps to 240 frames.

### Why 500vh?

`500vh` gives `400vh` of actual scroll distance (minus the viewport height). At 240 frames, that's ~1.67vh per frame — smooth enough to feel cinematic. Less height = frames skip too fast. More height = scroll feels sluggish.

### How Image Scaling Works (Cover Mode)

The cover scaling math ensures the frame always fills the canvas with no letterboxing:

```
scale = max(canvasWidth / imageWidth, canvasHeight / imageHeight)
```

- If the image is wider than the canvas ratio → scale by height → crop sides
- If the image is taller than the canvas ratio → scale by width → crop top/bottom
- Centering offset: `(canvas - image * scale) / 2` (negative = crop)

### Canvas Filter

The canvas has a CSS filter applied: `brightness(0.8) contrast(1.05)` — this slightly darkens and adds contrast for a cinematic look, making text overlays more readable.

---

## 5. HOW TO CREATE NEW 3D SCROLL WEBSITES

### Step-by-Step Workflow

#### Step 1: Generate Cinematic Images or Video

Create your 3D animation using any tool:
- **Blender** — Free, full 3D animation pipeline
- **After Effects** — Motion graphics and camera moves
- **Runway ML / Kling / Sora** — AI-generated cinematic videos
- **Unreal Engine** — Photorealistic real-time renders

Export as a video file (MP4/MOV) at your target resolution.

#### Step 2: Extract Frames from Video

Use FFmpeg to extract frames at your target frame rate:

```bash
# Extract at 10 FPS (recommended for ~240 frames from a 24s video)
ffmpeg -i input_video.mp4 -vf "fps=10" -q:v 2 frame_%04d.jpg

# Extract at 12 FPS
ffmpeg -i input_video.mp4 -vf "fps=12" -q:v 2 frame_%04d.jpg
```

The `-q:v 2` flag sets JPEG quality (1=best, 31=worst). Use 2-5 for good quality.

#### Step 3: Verify Frame Names

Ensure frames follow the pattern: `frame_0001.jpg`, `frame_0002.jpg`, etc. FFmpeg's `%04d` format handles this automatically.

#### Step 4: Place Frames in Project

Copy all frames to: `public/frames/`

#### Step 5: Update Frame Count

In `HeroCanvas.tsx`, update the constant:

```typescript
const TOTAL_FRAMES = 240;  // ← Change to your actual frame count
```

#### Step 6: Update Hero Chapters (Text Content)

Edit the `HERO_CHAPTERS` array to match your brand:

```typescript
const HERO_CHAPTERS = [
  {
    range: [0, 0.2],           // Scroll progress range (0-1)
    badge: "YOUR BADGE TEXT",
    headline1: "LINE ONE",
    headline2: "LINE TWO",
    tagline: "YOUR TAGLINE",
    body: "Your description paragraph.",
    showButtons: true,          // Show CTA buttons on this chapter?
  },
  // ... more chapters
];
```

#### Step 7: Update Branding & Colors

In `globals.css`, change the `@theme` tokens:

```css
@theme {
  --color-brand-cyan: #YOUR_PRIMARY;
  --color-brand-purple: #YOUR_SECONDARY;
  --color-brand-magenta: #YOUR_ACCENT;
  --color-brand-dark: #YOUR_BACKGROUND;
}
```

In `layout.tsx`, update fonts, metadata, and SEO.

#### Step 8: Update Remaining Sections

Modify `Features.tsx`, `Experiences.tsx`, `Stats.tsx`, `Location.tsx`, `Footer.tsx`, and `BookingModal.tsx` with your content. Each uses a data array pattern — just change the arrays.

#### Step 9: Run and Test

```bash
npm run dev     # Development server
npm run build   # Production build (verify no errors)
```

---

## 6. FRAME REQUIREMENTS

### Recommended Specifications

| Parameter | Recommended | Current Project |
|-----------|-------------|-----------------|
| Frame count | 200–400 | 240 |
| Extraction FPS | 10–12 | ~10 |
| Image format | JPEG | JPEG |
| Image quality | q:v 2-5 | ~2 |
| Resolution | 1920×1080 | ~1920×1080 |
| File size per frame | 15–50 KB | 14–50 KB |
| Total payload | 4–12 MB | ~5.6 MB |
| Naming format | `frame_XXXX.jpg` | `frame_XXXX.jpg` |

### Why 200–400 Frames Is Ideal

- **Under 150 frames**: Animation feels choppy, frames skip visibly during fast scrolling.
- **200–400 frames**: Sweet spot. Smooth scrubbing, manageable payload (~4-12 MB total), fast preload on broadband.
- **Over 500 frames**: Diminishing returns. Longer load times, more memory usage, no perceptible smoothness gain.

### Why 60 FPS Extraction Is Too Heavy

A 24-second video at 60 FPS = **1,440 frames**. At ~25 KB average = **36 MB payload**. This causes:
- Long initial load times (especially on mobile)
- High memory usage (1440 `Image` objects in RAM)
- Wasted bandwidth — the scroll speed rarely needs 60 FPS granularity

### Why 10–12 FPS Extraction Works

At 10 FPS, a 24s video yields **240 frames** — exactly what this project uses. The scroll distance (400vh) provides enough pixels-per-frame that transitions appear smooth to the human eye. Users cannot scroll fast enough to perceive the missing intermediate frames.

---

## 7. HERO CANVAS LOGIC

### Component Architecture

`HeroCanvas.tsx` (487 lines) is a `'use client'` component with the following structure:

```
Constants (TOTAL_FRAMES, FRAME_PATH, FPS)
HERO_CHAPTERS array (5 chapters with scroll ranges)
HeroCanvas component:
  ├── Refs: canvasRef, particleCanvasRef, heroContainerRef, framesRef, currentFrameRef
  ├── State: loadedCount, isLoaded, scrollProgress
  ├── useEffect #1: Particle system (independent animation loop)
  ├── useEffect #2: Frame sequence (preload, scroll handling, canvas rendering)
  └── JSX: Layered rendering (particles → canvas → vignette → loader → text → dots → progress → scroll indicator)
```

### Container Refs

| Ref | Type | Purpose |
|-----|------|---------|
| `canvasRef` | `HTMLCanvasElement` | Main frame-rendering canvas |
| `particleCanvasRef` | `HTMLCanvasElement` | Background particle animation canvas |
| `heroContainerRef` | `HTMLDivElement` | The 500vh outer container — used for scroll position calculations |
| `framesRef` | `HTMLImageElement[]` | Array of all preloaded frame images (persists across renders) |
| `currentFrameRef` | `number` | Current frame index (avoids state re-renders during scrubbing) |

### Scroll Listener Logic

```typescript
const handleScroll = () => {
  if (!isLoaded || !heroContainerRef.current) return;

  const container = heroContainerRef.current;
  const containerTop = container.offsetTop;       // Where hero starts in the page
  const containerHeight = container.offsetHeight; // 500vh in pixels
  const stickyHeight = window.innerHeight;        // 100vh in pixels
  const scrollTop = window.scrollY;               // Current scroll position

  const scrolledIntoContainer = scrollTop - containerTop;
  const maxScroll = containerHeight - stickyHeight;  // 400vh of usable scroll

  // ABOVE hero → show frame 0
  if (scrolledIntoContainer < 0) {
    drawFrame(0);
    setScrollProgress(0);
    return;
  }

  // PAST hero → hold last frame
  if (scrolledIntoContainer >= maxScroll) {
    drawFrame(TOTAL_FRAMES - 1);
    setScrollProgress(1);
    return;
  }

  // WITHIN hero → calculate frame from scroll fraction
  const fraction = Math.max(0, Math.min(scrolledIntoContainer / maxScroll, 1));
  const frameIndex = Math.floor(fraction * (TOTAL_FRAMES - 1));
  currentFrameRef.current = frameIndex;
  drawFrame(frameIndex);
  setScrollProgress(fraction);
};
```

**Critical**: The scroll listener uses `{ passive: true }` for performance — it never calls `preventDefault()`.

### Canvas Resizing

```typescript
const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (isLoaded) {
    drawFrame(currentFrameRef.current);  // Redraw current frame at new size
  }
};
```

Attached to `window.resize`. Canvas dimensions match the full viewport.

### Cover Scaling Math (Detailed)

The goal: fill the canvas completely (no black bars), crop excess, and center the image.

```
Given:
  canvasW, canvasH     = viewport dimensions
  imgW, imgH           = image natural dimensions

Step 1: Find the scale factor
  scaleX = canvasW / imgW     (scale needed to match width)
  scaleY = canvasH / imgH     (scale needed to match height)
  scale  = max(scaleX, scaleY) (use the larger to ensure full coverage)

Step 2: Calculate draw dimensions
  drawW = imgW * scale
  drawH = imgH * scale

Step 3: Center the image (crop excess equally from both sides)
  x = (canvasW - drawW) / 2   (negative = left-side crop)
  y = (canvasH - drawH) / 2   (negative = top-side crop)

Step 4: Draw
  ctx.drawImage(img, x, y, drawW, drawH)
```

### Particle System

A separate canvas layer (z-index: 0) renders 120 floating particles with connecting lines:

- **120 particles** with random positions, slow velocities (±0.25 px/frame)
- **Colors**: cyan `rgba(0, 245, 255, 0.3)` and purple `rgba(139, 0, 255, 0.2)`
- **Connections**: Lines drawn between particles within 120px distance, opacity fading with distance
- **Wrapping**: Particles wrap around screen edges
- **Independent loop**: Uses its own `requestAnimationFrame` — runs continuously regardless of scroll

### Layer Stack (Z-Index Order)

| Z-Index | Layer | Description |
|---------|-------|-------------|
| 0 | Particle canvas | Background ambient particles |
| 1 | Frame canvas | Main image sequence (brightness: 0.8, contrast: 1.05) |
| 2 | Vignette overlay | Top/bottom gradient fade (cinematic darkening) |
| 50 | Loading screen | Full-screen dark overlay with progress bar (hidden after load) |
| 3 | Text overlay | Chapter badge, headline, tagline, body, CTA buttons |
| 4 | Chapter dot indicators | Right-side vertical dots showing active chapter |
| 5 | Progress bar | Bottom gradient bar showing scroll completion |
| 6 | Scroll indicator | "Scroll to Explore" text + animated line (chapter 0 only) |

### Hero Chapters System

5 chapters divide the scroll range into equal 20% segments:

| Chapter | Range | Badge | Headlines |
|---------|-------|-------|-----------|
| 0 | 0.0–0.2 | INDIA'S FIRST FREE ROAM VR ARCADE | IN5NITE / VR |
| 1 | 0.2–0.4 | FREE ROAM TECHNOLOGY | MOVE / FREELY |
| 2 | 0.4–0.6 | FULL BODY TRACKING | YOUR BODY / IN THE GAME |
| 3 | 0.6–0.8 | MULTIPLAYER VR | PLAY / TOGETHER |
| 4 | 0.8–1.0 | SURAT, GUJARAT | READY TO / ENTER? |

Chapters 0 and 4 show CTA buttons (`showButtons: true`).

Text transitions use Framer Motion `AnimatePresence mode="wait"`:
- **Enter**: `opacity: 0, y: 40` → `opacity: 1, y: 0`
- **Exit**: `opacity: 1, y: 0` → `opacity: 0, y: -30`
- **Duration**: 0.6s with custom easing `[0.25, 0.46, 0.45, 0.94]`

---

## 8. UI/UX SYSTEM

### Design Philosophy

The entire UI follows **luxury digital product design** principles inspired by Apple, Tesla, and high-end automotive brands:
- **Dark-first**: Background is `#030308` (near-black with subtle blue tint)
- **Neon accents**: Cyan (`#00F5FF`), Purple (`#8B00FF`), Magenta (`#FF0080`)
- **Minimal clutter**: Generous whitespace, sparse text, cinematic pacing
- **Gradient branding**: All key headings use `linear-gradient(90deg, #22d3ee, #a855f7, #ec4899)` with `-webkit-background-clip: text`

### Spacing System

| Pattern | Value | Usage |
|---------|-------|-------|
| Section vertical padding | `py-16` to `py-24` | Breathing room between sections |
| Content max-width | `max-w-7xl` (80rem) | Constrains content width |
| Horizontal padding | `px-6 sm:px-8 lg:px-12` | Responsive side margins |
| Card gap | `gap-6` | Consistent grid spacing |
| Header to content | `mb-16` | Section header to card grid |
| Badge to heading | `mb-4` to `mb-8` | Label-to-title spacing |

### Typography System

| Element | Font | Weight | Size | Style |
|---------|------|--------|------|-------|
| Headings (h1, h2) | Orbitron | 900 (Black) | `clamp(2.5rem, 6-8vw, 5-7rem)` | Gradient text, uppercase tracking |
| Body text | Inter | 300 (Light) | `text-sm` / `text-base` | White/50-70% opacity |
| Badges/Labels | Inter | 500-600 | `text-xs` | Uppercase, `tracking-[0.2-0.3em]` |
| Card titles | Orbitron | 700 | `1rem` / `1.1rem` | White, `tracking-[0.04-0.05em]` |
| CTAs/Buttons | Orbitron | 700 | `text-sm` / `text-xs` | Uppercase, `tracking-widest` |
| Stats values | Orbitron | 900 | `text-5xl md:text-6xl` | Gradient text |

### Cinematic Overlays

The hero section uses a multi-layer overlay stack:
1. **Vignette** (z-2): Top-to-bottom gradient fading the edges into the dark background:
   ```css
   linear-gradient(to bottom,
     rgba(3,3,8,0.5) 0%,     /* Top fade */
     rgba(3,3,8,0.0) 20%,    /* Clear */
     rgba(3,3,8,0.0) 70%,    /* Clear */
     rgba(3,3,8,0.8) 100%    /* Bottom fade */
   )
   ```
2. **Canvas filter**: `brightness(0.8) contrast(1.05)` — cinematic color grading
3. **Text shadows**: Heavy multi-layer shadows for readability over dynamic frames:
   ```css
   text-shadow: 0 0 60px rgba(0,0,0,1), 0 0 120px rgba(0,0,0,0.9), 2px 2px 0px rgba(0,0,0,0.8)
   ```

### Navbar Behavior

- **Default state**: Fully transparent, no blur, transparent bottom border
- **Scrolled state** (>80px): `rgba(3,3,8,0.85)` background, `blur(20px)` backdrop filter, `rgba(0,245,255,0.08)` border
- **Active section detection**: Walks section IDs backwards, first section with `getBoundingClientRect().top <= 120` wins
- **Active link**: Cyan color (`#22d3ee`), 500 weight, gradient underline
- **Hover**: Inactive links brighten to `rgba(255,255,255,0.9)`
- **Height**: Fixed 70px
- **Z-index**: 100 (above everything except modals at 200)

### Section Transitions

Each section uses subtle gradient backgrounds to create depth:
```css
background: linear-gradient(180deg, #030308 0%, #07070F 60%, #030308 100%)
```
Sections also include:
- **Dot grid backgrounds**: `radial-gradient(circle, #00F5FF 1px, transparent 1px)` at 2.5-3% opacity
- **Glow orbs**: Large blurred radial gradients (cyan/purple) positioned at corners
- **Neon divider lines**: Centered gradient `h-px` lines at section tops

### Card Interactions

All cards follow a consistent hover pattern:
1. **Lift**: `translateY(-8px)` on hover
2. **Border glow**: Border color transitions from `rgba(255,255,255,0.06)` to accent color
3. **Background shift**: Subtle radial gradient appears on hover
4. **Shadow**: Large blurred accent-colored box shadow
5. **Top shimmer**: 1px gradient line appears at card top
6. **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` with 400ms duration

### Booking Modal Communication

The modal uses a **CustomEvent pattern** for decoupled communication:
```typescript
// Any component can open the modal:
window.dispatchEvent(new CustomEvent('open-booking', { detail: { experience: 'VR Gaming' } }));

// BookingModal listens:
window.addEventListener('open-booking', (e) => {
  setFormData(prev => ({ ...prev, experience: e.detail?.experience }));
  setIsOpen(true);
});
```

---

## 9. PERFORMANCE OPTIMIZATION

### Image Preloading Strategy

- **Eager full preload**: All 240 frames load immediately on mount. This ensures zero frame-loading lag during scroll scrubbing.
- **Ref-based storage**: `framesRef` (useRef) stores images — avoids re-renders during loading.
- **Error tolerance**: `onerror` handlers still increment the loaded counter, preventing infinite loading states.
- **Guard against duplicates**: `if (framesRef.current.length === 0)` prevents re-preloading on component re-renders.

### Avoiding Re-renders

- **`currentFrameRef`** (useRef): Stores current frame index without triggering renders. Only `scrollProgress` state updates (needed for chapter text transitions and progress bar).
- **`framesRef`** (useRef): Image array never triggers renders.
- **Single state update per scroll tick**: Only `setScrollProgress()` fires during scroll.

### Passive Scroll Listeners

```typescript
window.addEventListener('scroll', handleScroll, { passive: true });
```
The `{ passive: true }` option tells the browser the handler won't call `preventDefault()`, allowing the browser to scroll smoothly without waiting for JavaScript execution. This is critical for 60fps scrolling on mobile.

### Canvas Optimization

- **`ctx.clearRect()` before every draw**: Prevents ghosting from previous frames.
- **Cover scaling calculated per-draw**: Adapts to any canvas/image aspect ratio combination.
- **Canvas dimensions = viewport**: `canvas.width = window.innerWidth; canvas.height = window.innerHeight` — pixel-perfect, no CSS scaling blur.

### Particle System Optimization

- **120 particles** — balanced count for visual density without GPU strain.
- **Connection distance threshold**: Only draws lines between particles within 120px, avoiding O(n²) full-mesh rendering.
- **Independent `requestAnimationFrame`**: Particle animation runs on its own loop, separate from scroll-driven frame rendering.
- **Canvas wrapping**: Particles wrap at edges instead of respawning — no GC pressure.

### Mobile Optimization

- **`overflow-x-hidden`** on body: Prevents horizontal scroll caused by full-width elements.
- **Passive scroll listeners**: Essential for mobile scroll performance.
- **Responsive canvas**: Resizes with viewport on orientation change.
- **Booking modal**: Full-screen on mobile (`h-full w-full`), card on desktop (`max-w-2xl rounded-2xl`).

---

## 10. HOW TO REUSE FOR FUTURE PROJECTS

### The Reuse Principle

This architecture is designed as a **template**. To create a new cinematic scroll website, you change only **content and configuration** — never the core scroll/canvas/animation logic.

### What to Change

| What | Where | How |
|------|-------|-----|
| **Frame images** | `public/frames/` | Replace all JPEGs with new sequence |
| **Frame count** | `HeroCanvas.tsx` line 6 | Change `TOTAL_FRAMES = 240` |
| **Hero text** | `HeroCanvas.tsx` lines 11-57 | Edit `HERO_CHAPTERS` array |
| **Brand colors** | `globals.css` lines 3-11 | Change `@theme` CSS variables |
| **Fonts** | `layout.tsx` lines 2, 5-6 | Change Google Font imports |
| **SEO metadata** | `layout.tsx` lines 8-36 | Update title, description, keywords, OpenGraph |
| **Features** | `Features.tsx` lines 5-54 | Edit `FEATURES` array |
| **Experiences** | `Experiences.tsx` lines 6-61 | Edit `EXPERIENCES` array + replace images in `public/images/` |
| **Stats** | `Stats.tsx` lines 4-9 | Edit `STATS` array |
| **Contact info** | `Location.tsx` | Change address, phone, email, WhatsApp number |
| **Footer content** | `Footer.tsx` | Change brand text, links, social URLs |
| **Booking form** | `BookingModal.tsx` line 77 | Change WhatsApp number, experience options |
| **Scroll height** | `HeroCanvas.tsx` line 287 | Change `500vh` to adjust scroll pacing |
| **Particle colors** | `HeroCanvas.tsx` line 78 | Change particle RGB values |
| **Canvas filter** | `HeroCanvas.tsx` line 303 | Change brightness/contrast values |

### What NOT to Change

- `drawFrame()` function logic
- `handleScroll()` function logic
- `setCanvasSize()` function logic
- Cover scaling math
- Preloading loop structure
- Sticky container + canvas architecture
- `useRef` pattern for frames and currentFrame
- Passive scroll listener attachment

### Example Use Cases

#### Luxury Car Website
- **Frames**: 3D car rotating / camera flying around the car
- **Chapters**: "Design" → "Performance" → "Interior" → "Safety" → "Configure"
- **Colors**: `--brand-primary: #C9A94E` (gold), `--brand-dark: #0A0A0A`

#### Headphone Product Site
- **Frames**: Headphone assembly / exploded view animation
- **Chapters**: "Sound" → "Comfort" → "Design" → "Battery" → "Buy Now"
- **Colors**: `--brand-primary: #FF6B35` (orange), `--brand-dark: #1A1A2E`

#### VR Gaming Site (Current)
- **Frames**: VR environment fly-through
- **Chapters**: "Welcome" → "Free Roam" → "Body Tracking" → "Multiplayer" → "Visit Us"
- **Colors**: Cyan/Purple/Magenta neon palette

#### Perfume Brand
- **Frames**: Bottle rotation with particle effects
- **Chapters**: "Essence" → "Notes" → "Craftsmanship" → "Collection" → "Shop"
- **Colors**: `--brand-primary: #D4AF37` (gold), `--brand-dark: #0D0D0D`

#### Luxury Watch
- **Frames**: Watch mechanism zoom-in / rotation
- **Chapters**: "Heritage" → "Movement" → "Materials" → "Precision" → "Acquire"
- **Colors**: `--brand-primary: #B8860B` (dark gold), `--brand-dark: #050505`

#### Restaurant / Fine Dining
- **Frames**: Kitchen to table cinematic sequence
- **Chapters**: "Philosophy" → "Ingredients" → "Chef" → "Ambiance" → "Reserve"
- **Colors**: `--brand-primary: #C41E3A` (wine red), `--brand-dark: #0A0505`

---

## 11. COMMON ISSUES & FIXES

### Black Canvas Area

**Symptom**: Black bars or black regions visible around the frame image on canvas.

**Cause**: Cover scaling not working correctly, or canvas dimensions not matching viewport.

**Fix**: Ensure `setCanvasSize()` sets `canvas.width = window.innerWidth` and `canvas.height = window.innerHeight` (NOT CSS dimensions — actual canvas pixel dimensions). Verify `drawFrame()` uses `Math.max()` for the scale factor.

### Wrong Scaling / Stretched Images

**Symptom**: Frames appear stretched or squished.

**Cause**: Using `Math.min()` instead of `Math.max()` in scale calculation, or setting canvas dimensions via CSS instead of direct property assignment.

**Fix**: Cover mode requires `Math.max()`. Canvas `width`/`height` properties must be set directly (not via CSS `width`/`height`). CSS dimensions scale the canvas element, but don't change the drawing surface resolution.

### Frame Flicker

**Symptom**: Canvas flickers or shows blank frames during fast scrolling.

**Cause**: Frames not fully preloaded, or `clearRect` without immediate `drawImage`.

**Fix**: Ensure `setIsLoaded(true)` only fires after ALL frames loaded. The `handleScroll` guard `if (!isLoaded) return` prevents scrubbing before preload completes. Verify no async gap between `clearRect` and `drawImage`.

### Scroll Lag / Jank

**Symptom**: Scrolling feels stuttery, especially on mobile.

**Cause**: Non-passive scroll listener, heavy computations in scroll handler, or too many state updates.

**Fix**: Always use `{ passive: true }` on scroll listeners. Minimize state updates — use `useRef` for frame index. Avoid DOM reads (`getBoundingClientRect`) in hot scroll paths — use `offsetTop`/`offsetHeight` instead.

### Incorrect Scroll Mapping

**Symptom**: Frames don't start at the beginning or end too early/late.

**Cause**: `containerTop` calculation wrong (e.g., navbar offset not accounted for), or `maxScroll` calculation incorrect.

**Fix**: The current implementation uses `container.offsetTop` which accounts for all elements above the hero. Verify no CSS transforms on parent elements (transforms break `offsetTop`). Check that `containerHeight - stickyHeight` correctly represents the scrollable distance.

### Mobile Horizontal Overflow

**Symptom**: Page scrolls horizontally on mobile, or content extends beyond viewport.

**Cause**: `w-screen` on the sticky container can cause overflow when scrollbar is present.

**Fix**: The body has `overflow-x-hidden` applied in `layout.tsx`. If issues persist, use `w-full` instead of `w-screen`, or add `max-w-screen` with `overflow-x-hidden`.

### Navbar Spacing Issues

**Symptom**: Content hidden behind the fixed navbar, or navbar overlapping interactive elements.

**Cause**: Fixed navbar at `z-100` with 70px height doesn't push page content down.

**Fix**: The hero section starts at the very top (navbar overlays it, which is intentional for the cinematic hero). For non-hero sections, use `scroll-mt-28` (as done in `Experiences.tsx`) to offset scroll-to targets below the navbar.

### Broken Sticky Behavior

**Symptom**: Canvas scrolls away instead of staying pinned, or gets stuck.

**Cause**: Parent element has `overflow: hidden` or `overflow: auto`, which breaks `position: sticky`. Or incorrect `height` on the outer container.

**Fix**: Ensure no ancestor between the sticky element and the scroll container has `overflow` set to anything other than `visible`. The outer container MUST have a defined height (e.g., `500vh`). The sticky child must have `top: 0` and `height: 100vh`.

### Loading Screen Stuck

**Symptom**: Loading bar stays at 100% but content never appears.

**Cause**: Frame path incorrect (404 errors), but `onerror` not incrementing counter, or `isLoaded` state not triggering re-render.

**Fix**: The current implementation handles this — both `onload` and `onerror` increment the counter. Check browser DevTools Network tab for 404s on frame URLs. Verify `FRAME_PATH` matches actual file locations.

### Particle Canvas Not Visible

**Symptom**: No particle animation visible behind frames.

**Cause**: Canvas z-index wrong, or particles rendering behind the opaque frame canvas.

**Fix**: Particle canvas is at z-index 0, frame canvas at z-index 1. The frame canvas brightness filter (`0.8`) and vignette make particles partially visible at edges. If you need particles more visible, reduce frame canvas opacity or increase particle opacity/count.

---

## 12. FINAL BEST PRACTICES

### Maintaining Premium Quality

1. **Color discipline**: Use only your defined brand palette. Avoid raw CSS color names. Always reference `var(--color-brand-*)` tokens.
2. **Typography hierarchy**: Headings in Orbitron (or your display font), body in Inter (or your reading font). Never mix casually.
3. **Opacity as a system**: Use consistent opacity levels: `0.95` (primary text), `0.70` (secondary), `0.50` (tertiary), `0.25-0.35` (labels/dividers), `0.05-0.08` (borders/backgrounds).
4. **Consistent hover patterns**: All interactive elements should lift, glow, and transition with the same easing curve.

### Avoiding Clutter

1. **One CTA per section**: Each section has exactly one primary action.
2. **Sparse copy**: Body text is 1-2 sentences max. Let the visuals tell the story.
3. **Generous spacing**: `mb-16` between header and content, `py-20+` section padding.
4. **No decorative elements without purpose**: Every glow orb, dot grid, and neon line serves to guide the eye or establish depth.

### Keeping the Cinematic Feel

1. **Vignette is mandatory**: The top/bottom gradient fade grounds the frame sequence and creates a "screen" effect.
2. **Canvas filter**: Slight `brightness(0.8)` darkening ensures text readability and mood.
3. **Chapter pacing**: 5 chapters over 500vh = ~400px of scroll per chapter on a 1080p screen. This gives readers time to absorb each message.
4. **AnimatePresence transitions**: Smooth text transitions between chapters maintain the "presentation" feel.
5. **Scroll indicator**: The "Scroll to Explore" prompt on chapter 0 teaches users the interaction model.

### Structuring Sections

1. **Hero first, always**: The frame animation hero is the hook. It MUST be the first thing users see.
2. **Value proposition second**: Features/benefits section immediately after hero while attention is high.
3. **Social proof third**: Stats, testimonials, or case studies.
4. **Product/service details fourth**: Experiences, portfolio, or catalog.
5. **CTA last**: Contact/booking section with clear next action.
6. **Footer**: Navigation links, legal, social media.

### Optimizing Storytelling

1. **Each chapter = one idea**: Don't cram multiple messages into one scroll range.
2. **Progressive revelation**: Start broad (brand name) → get specific (features) → end with action (visit/buy).
3. **Visual-text sync**: Ideally, the frame animation content should visually relate to the chapter text it accompanies.
4. **Badge labels**: The small uppercase badge above each headline sets context before the reader hits the big text.
5. **Gradient headlines**: The two-line headline pattern (white line 1 + gradient line 2) creates visual rhythm and brand emphasis.

---

## APPENDIX: Quick Reference Card

### To Launch a New Project

```bash
# 1. Clone or copy the template
cp -r "infinte vr" my-new-project

# 2. Install dependencies
cd my-new-project && npm install

# 3. Replace frames
rm -rf public/frames/*
cp /path/to/new/frames/* public/frames/

# 4. Update TOTAL_FRAMES in HeroCanvas.tsx
# 5. Update HERO_CHAPTERS in HeroCanvas.tsx
# 6. Update @theme in globals.css
# 7. Update metadata in layout.tsx
# 8. Update all section components with new content

# 9. Run
npm run dev
```

### File Edit Checklist

- [ ] `public/frames/` — New frame sequence
- [ ] `public/images/experiences/` — New section images
- [ ] `HeroCanvas.tsx` — TOTAL_FRAMES, HERO_CHAPTERS, particle colors
- [ ] `globals.css` — Brand colors, fonts
- [ ] `layout.tsx` — Fonts, metadata, SEO
- [ ] `Navbar.tsx` — Logo text, nav links
- [ ] `Features.tsx` — FEATURES array
- [ ] `Experiences.tsx` — EXPERIENCES array
- [ ] `Stats.tsx` — STATS array
- [ ] `Location.tsx` — Address, phone, email, maps link
- [ ] `Footer.tsx` — Brand description, links, social URLs
- [ ] `BookingModal.tsx` — WhatsApp number, experience options
- [ ] Favicons — Replace all favicon files in `public/`

---

> **Document generated from actual project source code analysis.**
> **Project**: In5nite VR — India's First Free Roam VR Arcade
> **Stack**: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion 12 · HTML5 Canvas
> **Frames**: 240 JPEGs · ~5.6 MB total · 500vh scroll container
