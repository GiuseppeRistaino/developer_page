---
name: Luminous Financial Intelligence
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001b'
  tertiary-container: '#ff516a'
  on-tertiary-container: '#5b0017'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  surface-card: rgba(30, 41, 59, 0.7)
  glass-stroke: rgba(255, 255, 255, 0.1)
  text-dim: '#94A3B8'
  vampire-warning: '#F59E0B'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-data:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  safe-area-bottom: 80px
---

## Brand & Style

The design system is built on a foundation of **Modern Corporate** aesthetics infused with **Glassmorphism** accents. It targets a tech-savvy audience that values financial clarity and proactive automation. The emotional response is one of "Informed Calm"—transforming the stress of recurring expenses into a structured, predictable, and visually rewarding experience.

The style utilizes deep, dark backgrounds to create a focused environment, where high-contrast typography and vibrant data visualizations guide the eye. Transparency and blur effects are used strategically to denote hierarchy and "surface" secondary information without breaking the user's flow.

**Key Stylistic Pillars:**
- **Clarity over Clutter:** Heavy use of negative space around critical financial KPIs.
- **Glassmorphism:** Frosted glass panels for cards and overlays to maintain a sense of depth.
- **Luminous Accents:** Use of glows and vibrant strokes to highlight active tracking states and positive financial trends.
- **High-End Utility:** Precision-engineered components that feel like a premium financial terminal.

## Colors

The palette is optimized for a **Dark Mode** first experience, utilizing a rich "Deep Navy" as the canvas. 

- **Primary (Vibrant Indigo):** Reserved for high-intent actions, primary buttons, and active sync states.
- **Secondary (Emerald):** Used exclusively for "Growth" metrics, savings, and successful automation logs.
- **Tertiary (Rose):** Dedicated to outflows, high-expense alerts, and cancellation actions.
- **Neutral (Deep Navy):** Provides the base layer and nested container levels.

**Glass Effect Application:**
For container surfaces, use `surface-card` with a backdrop blur of `12px` to create the glassmorphic effect. Use `glass-stroke` for 1px borders to define edges against the dark background.

## Typography

This design system uses **Inter** for all primary interfaces to maintain a systematic, utilitarian, and clean look. A secondary monospaced font (**JetBrains Mono**) is introduced specifically for transaction logs and raw data payloads in the Sync Center to emphasize technical precision.

**Hierarchy Rules:**
- **Display-LG:** Used for primary KPI cards (Total Monthly Spend).
- **Headline-XL:** Used for screen titles.
- **Label-Caps:** Used for section headers and "Vampire Alert" tags.
- **Mono-Data:** Used for currency values, card numbers, and the Activity Feed.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop/tablet and a **Fluid Fluid** model for mobile. 

- **Desktop:** 12-column grid, 1200px max-width, 24px gutters.
- **Mobile:** Single column, 24px side margins. 

**Rhythm:**
A strict 8px base unit drives all spacing. Elements are "stacked" using `stack-md` as the default vertical rhythm. High-level dashboard sections are separated by `stack-lg`. Components such as the FAB (Floating Action Button) must respect the `safe-area-bottom` to ensure visibility over bottom navigation bars.

## Elevation & Depth

Hierarchy is expressed through **Tonal Layers** combined with **Ambient Shadows**.

1.  **Level 0 (Base):** Deep Navy (`#0F172A`).
2.  **Level 1 (Cards):** `surface-card` (semi-transparent) with a 1px `glass-stroke`.
3.  **Level 2 (Modals/Active States):** Increased opacity cards with a deep, diffused shadow: `0px 20px 40px rgba(0, 0, 0, 0.4)`.

**Interaction Depth:**
When an element is hovered or focused (especially Subscription Cards), it should apply a subtle glow using the `primary_color` (Indigo) with 10% opacity as an outer shadow to simulate "electronic" activation.

## Shapes

The design language uses a consistent **Rounded** approach (Radius 2). 

- **Base Components:** 0.5rem (8px) for inputs and small chips.
- **Subscription Cards:** 1rem (16px) to create a friendly, tactile feel.
- **KPI Panels/Hero Cards:** 1.5rem (24px) to distinguish high-level summary information.
- **FAB & Avatars:** Always fully rounded (pill-shaped).

Borders on cards should be limited to the `glass-stroke` (1px) to maintain a refined, high-tech silhouette.

## Components

### Buttons
- **Primary:** Solid Indigo background, white text, 16px+ roundedness.
- **Secondary/Ghost:** `glass-stroke` border, Indigo text, backdrop-blur background.
- **Destructive:** Solid Rose background for "Unsubscribe" actions.

### Subscription Cards
- Feature a 48px brand logo on the left.
- Use `mono-data` for the price.
- Include a subtle "Tracking Source" badge (Email/Bank) in the top right using `body-sm` on a low-opacity background.

### Input Fields
- Dark backgrounds (`#1E293B`) with 1px `glass-stroke`.
- Focus state: Border color changes to Indigo with a 2px outer glow.

### Vampire Alert Cards
- Use a `vampire-warning` (Amber) left-accent border.
- Background uses a slight Amber tint (5% opacity) to distinguish from standard financial info.

### Progress Gauges (Outflow Pulse)
- Use a stroke width of 8px.
- The background track should be `glass-stroke`, and the active track should be a gradient from Indigo to Emerald.

### Activity Feed (Sync Center)
- Compact list items using `mono-data`.
- Each entry starts with a timestamp in `text-dim`.
- Status indicators (dots) use Emerald for success and Rose for failure.