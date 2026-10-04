# DESIGN.md

Locked design system for the Agentic Workflow guide site. Theme: **Lumen, Night Foundry drop** (Hallmark catalog). Genre: atmospheric. Macrostructure: Narrative Workflow.

## Color (OKLCH)

Paper band is dark, cool-violet. One molten-brass accent. Coral chord for the verb landmark only.

| Token | Value | Use |
|-------|-------|-----|
| `--color-paper` | `oklch(13% 0.014 265)` | page canvas, late-night violet |
| `--color-paper-2` | `oklch(17% 0.016 265)` | raised surfaces / cards |
| `--color-paper-3` | `oklch(21% 0.018 265)` | hover states |
| `--color-ink` | `oklch(96% 0.006 262)` | headlines |
| `--color-ink-2` | `oklch(86% 0.008 262)` | body text |
| `--color-muted` | `oklch(66% 0.01 262)` | secondary text |
| `--color-accent` | `oklch(76% 0.17 50)` | molten brass, small surfaces, focus rings |
| `--color-accent-2` | `oklch(68% 0.16 18)` | coral chord, verb landmark only |
| `--color-glow` | `oklch(80% 0.16 50 / 0.42)` | apparatus halo |
| `--color-paper-emit` | `oklch(76% 0.17 50 / 0.04)` | canvas wash |
| `--color-rule` | `oklch(96% 0.006 262 / 0.10)` | hairlines |
| `--color-rule-2` | `oklch(96% 0.006 262 / 0.16)` | stronger hairlines |
| `--rule-blueprint` | `oklch(96% 0.006 262 / 0.04)` | blueprint grid |
| `--color-shadow-soft` | `oklch(0% 0 0 / 0.18)` | nav-pill drop shadow |
| `--color-shadow-inner` | `oklch(0% 0 0 / 0.4)` | chamber inner shade |
| `--color-shadow-toast` | `oklch(0% 0 0 / 0.5)` | toast drop shadow |
| `--color-chamber-bg` | `oklch(17% 0.016 265 / 0.8)` | chamber glass |
| `--color-filament-tip` | `oklch(96% 0.05 50)` | filament gradient ends |
| `--color-filament-core` | `oklch(80% 0.17 50)` | filament gradient core |
| `--color-filament-halo` | `oklch(80% 0.16 50 / 0.22)` | filament outer halo |

Strategy: **Committed**. The molten brass does load-bearing work on the apparatus and CTAs; the dark violet is the surface.

## Typography

Three families, three weights max.

- **Display:** Instrument Serif 400. Lowercase, upright (no italics anywhere). Hero headline, section numbers, footer statement.
- **Body:** Geist 400/500/600. Prose, buttons, links.
- **Label:** JetBrains Mono 400/500. UPPERCASE eyebrows, callouts, meter labels, copy buttons, code.

Two-register rule (Lumen): all prose lowercase (CSS `text-transform: lowercase` on body, HTML written normally for a11y); mono labels UPPERCASE. No italic anywhere.

Scale (fluid `clamp()`, ≥1.25 ratio):

| Step | Value |
|------|-------|
| display | `clamp(2.75rem, 6vw + 1rem, 6rem)` |
| h2 | `clamp(1.75rem, 3vw + 0.5rem, 3rem)` |
| h3 | `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)` |
| body | `clamp(1rem, 0.5vw + 0.9rem, 1.125rem)` |

Body line-height 1.65 (add 0.1 on dark). Measure: 65-75ch.

## Elevation

No drop-shadow cards. Hairline borders + inner radial accent glow at 4-6% (12% on hover) + 4px lift on hover. Cards feel lit from within, not dropped.

## Motion

Exponential ease-out (quart/quint/expo). No bounce, no elastic, no layout-property animation. Durations: 600ms section reveals (60ms stagger), 320ms verb underline draw, 220ms hover, 4s apparatus pulse (3% intensity oscillation).

Reveal discipline: only the journey flow strip and phase 0 animate on scroll; remaining phases render statically. Scroll progress bar animates `transform: scaleX` (compositor-only, no layout writes).

`prefers-reduced-motion: reduce` collapses all animation to instant final state.

## Components

- **Nav:** N5 Floating pill. Fixed, centered, `backdrop-filter: blur(14px)`, rounded-full, detached from edges.
- **Footer:** Ft5 Statement. One large display sentence, wordmark + muted meta below.
- **Apparatus:** hand-built filament chamber (pure CSS, no img), hero-right, leader-line mono callouts with real values.
- **Meter strip:** full-bleed band of 60-80 procedurally-varied ticks (sine envelope), mono labels at both ends.
- **Copy buttons:** 8-state discipline, mono UPPERCASE, success state flips to a check.
- **Prompt blocks:** hairline cards with inner emission, copy button top-right.
